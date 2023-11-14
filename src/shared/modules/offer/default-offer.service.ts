import {DocumentType, types} from '@typegoose/typegoose';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';
import {Types} from 'mongoose';

import {Logger} from '../../libs/logger/index.js';
import {HttpError} from '../../libs/rest/index.js';
import {Cities, Components, SortType} from '../../types/index.js';
import {UserEntity} from '../user/index.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {getOfferDetailPipeline} from './offer.aggregation.js';
import {OFFER_CONSTANT_VALUES} from './offer.constant.js';
import {OfferEntity} from './offer.entity.js';
import {OfferService} from './offer-service.interface.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
    @inject(Components.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Components.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async exists(documentId: string): Promise<boolean> {
    return !!this.offerModel.exists({_id: documentId});
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);

    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async find(count?: number, authorId?: string): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? OFFER_CONSTANT_VALUES.DEFAULT_OFFER_COUNT;
    const user = await this.userModel.findById(authorId);
    const favoriteOffers = user?.favoriteOffers.map((offer) => offer.toString());

    return this.offerModel
      .aggregate([
        ...getOfferDetailPipeline(favoriteOffers),
        { $limit: limit },
        { $sort: { createdAt: SortType.Down } },
      ])
      .exec();
  }

  public async findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null> {
    const user = await this.userModel.findById(userId);
    const favoriteOffers = user?.favoriteOffers.map((offer) => offer.toString());

    const [offer] = await this.offerModel
      .aggregate([
        { $match: { _id: new Types.ObjectId(offerId) } },
        ...getOfferDetailPipeline(favoriteOffers)
      ])
      .exec();
    return offer;
  }

  public async findPremiumByCity(city: Cities, userId?: string): Promise<DocumentType<OfferEntity>[]> {
    const user = await this.userModel.findById(userId);
    const favoriteOffers = user?.favoriteOffers.map((offer) => offer.toString());

    return await this.offerModel.aggregate([
      { $match: { city: city, isPremium: true } },
      ...getOfferDetailPipeline(favoriteOffers),
      { $limit: OFFER_CONSTANT_VALUES.PREMIUM_OFFERS_COUNT },
      { $sort: { createdAt: SortType.Down } },
    ])
      .exec();
  }

  public async findFavorites(authorId: string) {
    const offers = await this.find(undefined, authorId);
    return offers.filter((offer) => offer.isFavorite);
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    if(dto.authorId){
      const author = await this.userModel.findById(dto.authorId);

      if(!author){
        throw new HttpError(
          StatusCodes.BAD_REQUEST,
          `Author with id «${dto.authorId}» not exists`,
          'DefaultOfferService'
        );
      }
    }

    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('authorId')
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentsCount: 1,
      }}).exec();
  }

  public async isAuthor(userId: string, documentId: string) {
    const offer = await this.offerModel.findById(documentId);
    return offer?.authorId.toString() === userId;
  }
}

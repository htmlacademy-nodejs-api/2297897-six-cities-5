import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';

import {fillDTO} from '../../helpers/index.js';
import {Logger} from '../../libs/logger/index.js';
import {
  BaseController, DocumentExistsMiddleware,
  HttpMethods, PrivateRouteMiddleware, ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {ValidateDtoMiddleware} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {OfferService} from '../offer/index.js';
import {ParamOfferId} from '../offer/types/param-offerid.type.js';
import {CommentService} from './comment-service.interface.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {CommentRdo} from './rdo/comment.rdo.js';
import {CreateCommentRequest} from './types/create-comment-request.type.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Components.Logger) protected readonly logger: Logger,
    @inject(Components.CommentService) protected readonly commentService: CommentService,
    @inject(Components.OfferService) protected readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethods.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethods.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async create(
    {body, tokenPayload}: CreateCommentRequest,
    res: Response
  ): Promise<void> {
    const comment = await this.commentService.create({...body, authorId: tokenPayload.id});
    await this.offerService.incCommentCount(body.offerId);

    this.created(res, fillDTO(CommentRdo, comment));
  }

  public async getComments({params}: Request<ParamOfferId>, res: Response) {
    const {offerId} = params;
    const comments = await this.commentService.findByOfferId(offerId);

    this.ok(res, fillDTO(CommentRdo, comments));
  }
}

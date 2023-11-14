import {Type} from 'class-transformer';
import {
  ArrayMaxSize, ArrayMinSize, ArrayNotEmpty,
  IsArray, IsBoolean, IsEnum,
  IsInt, IsOptional, Length, Max, MaxLength, Min,
  ValidateNested
} from 'class-validator';

import {Cities, Conveniences, PlacesTypes} from '../../../types/index.js';
import {OFFER_CONSTANT_VALUES} from '../offer.constant.js';
import {CREATE_OFFER_VALIDATION_MESSAGES} from './create-offer.messages.js';
import {OfferCoordinatesDto} from './offer-coordinates.dto.js';

export class UpdateOfferDto {
  @IsOptional()
  @Length(OFFER_CONSTANT_VALUES.NAME.MIN_LENGTH, OFFER_CONSTANT_VALUES.NAME.MAX_LENGTH, {message: CREATE_OFFER_VALIDATION_MESSAGES.NAME.LENGTH_FIELD})
  public name?: string;

  @IsOptional()
  @Length(OFFER_CONSTANT_VALUES.DESCRIPTION.MIN_LENGTH, OFFER_CONSTANT_VALUES.DESCRIPTION.MAX_LENGTH, {message: CREATE_OFFER_VALIDATION_MESSAGES.DESCRIPTION.LENGTH_FIELD})
  public description?: string;

  @IsOptional()
  @IsEnum(Cities, {message: CREATE_OFFER_VALIDATION_MESSAGES.CITY.INVALID})
  public city?: Cities;

  @IsOptional()
  @MaxLength(OFFER_CONSTANT_VALUES.PREVIEW_IMAGE.MAX_LENGTH, {message: CREATE_OFFER_VALIDATION_MESSAGES.PREVIEW_IMAGE.MAX_LENGTH})
  public previewImage?: string;

  @IsOptional()
  @ArrayMaxSize(OFFER_CONSTANT_VALUES.PLACE_IMAGES.IMAGES_COUNT, {message: CREATE_OFFER_VALIDATION_MESSAGES.PLACE_IMAGES.INVALID_COUNT})
  @ArrayMinSize(OFFER_CONSTANT_VALUES.PLACE_IMAGES.IMAGES_COUNT, {message: CREATE_OFFER_VALIDATION_MESSAGES.PLACE_IMAGES.INVALID_COUNT})
  public placeImages?: string[];

  @IsOptional()
  @IsBoolean({message: CREATE_OFFER_VALIDATION_MESSAGES.IS_PREMIUM.INVALID_FORMAT})
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({message: CREATE_OFFER_VALIDATION_MESSAGES.IS_FAVORITE.INVALID_FORMAT})
  public isFavorite?: boolean;

  @IsOptional()
  @IsInt({message: CREATE_OFFER_VALIDATION_MESSAGES.RATING.INVALID_FORMAT})
  @Min(OFFER_CONSTANT_VALUES.RATING.MIN_VALUE, {message: CREATE_OFFER_VALIDATION_MESSAGES.RATING.MIN_VALUE})
  @Max(OFFER_CONSTANT_VALUES.RATING.MAX_VALUE, {message: CREATE_OFFER_VALIDATION_MESSAGES.RATING.MAX_VALUE})
  public rating?: number;

  @IsOptional()
  @IsEnum(PlacesTypes, {message: CREATE_OFFER_VALIDATION_MESSAGES.TYPE.INVALID})
  public type?: PlacesTypes;

  @IsOptional()
  @IsInt({message: CREATE_OFFER_VALIDATION_MESSAGES.ROOMS_AMOUNT.INVALID_FORMAT})
  @Min(OFFER_CONSTANT_VALUES.ROOMS_AMOUNT.MIN_VALUE, {message: CREATE_OFFER_VALIDATION_MESSAGES.ROOMS_AMOUNT.MIN_VALUE})
  @Max(OFFER_CONSTANT_VALUES.ROOMS_AMOUNT.MAX_VALUE, {message: CREATE_OFFER_VALIDATION_MESSAGES.ROOMS_AMOUNT.MAX_VALUE})
  public roomsAmount?: number;

  @IsOptional()
  @IsInt({message: CREATE_OFFER_VALIDATION_MESSAGES.GUESTS_AMOUNT.INVALID_FORMAT})
  @Min(OFFER_CONSTANT_VALUES.GUESTS_AMOUNT.MIN_VALUE, {message: CREATE_OFFER_VALIDATION_MESSAGES.GUESTS_AMOUNT.MIN_VALUE})
  @Max(OFFER_CONSTANT_VALUES.GUESTS_AMOUNT.MAX_VALUE, {message: CREATE_OFFER_VALIDATION_MESSAGES.GUESTS_AMOUNT.MAX_VALUE})
  public guestsAmount?: number;

  @IsOptional()
  @IsInt({message: CREATE_OFFER_VALIDATION_MESSAGES.PRICE.INVALID_FORMAT})
  @Min(OFFER_CONSTANT_VALUES.PRICE.MIN_VALUE, {message: CREATE_OFFER_VALIDATION_MESSAGES.PRICE.MIN_VALUE})
  @Max(OFFER_CONSTANT_VALUES.PRICE.MAX_VALUE, {message: CREATE_OFFER_VALIDATION_MESSAGES.PRICE.MAX_VALUE})
  public price?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Conveniences, {each: true, message: CREATE_OFFER_VALIDATION_MESSAGES.CONVENIENCES.INVALID})
  public conveniences?: Conveniences[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OfferCoordinatesDto)
  public location?: OfferCoordinatesDto;

  @IsOptional()
  public authorId?: string;
}

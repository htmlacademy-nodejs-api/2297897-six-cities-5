import {Type} from 'class-transformer';
import {
  ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsArray,
  IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, Length,
  Max, MaxLength, Min, ValidateNested
} from 'class-validator';

import {Cities, Conveniences, PlacesTypes} from '../../../types/index.js';
import {CreateOfferValidationMessage} from './create-offer.messages.js';
import {OfferCoordinatesDto} from './offer-coordinates.dto.js';

export class CreateOfferDto {
  @Length(10, 100, {message: CreateOfferValidationMessage.name.lengthField})
  public name: string;

  @Length(20, 1024, {message: CreateOfferValidationMessage.description.lengthField})
  public description: string;

  @IsDateString({}, {message: CreateOfferValidationMessage.postDate.invalidFormat})
  public postDate: string;

  @IsEnum(Cities, {message: CreateOfferValidationMessage.city.invalid})
  public city: Cities;

  @MaxLength(256, {message: CreateOfferValidationMessage.previewImage.maxLength})
  public previewImage: string;

  @ArrayMaxSize(6, {message: CreateOfferValidationMessage.placeImages.invalidCount})
  @ArrayMinSize(6, {message: CreateOfferValidationMessage.placeImages.invalidCount})
  public placeImages: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite: boolean;

  @IsInt({message: CreateOfferValidationMessage.rating.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.rating.minValue})
  @Max(5, {message: CreateOfferValidationMessage.rating.maxValue})
  public rating: number;

  @IsEnum(PlacesTypes, {message: CreateOfferValidationMessage.type.invalid})
  public type: PlacesTypes;

  @IsInt({message: CreateOfferValidationMessage.roomsAmount.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.roomsAmount.minValue})
  @Max(8, {message: CreateOfferValidationMessage.roomsAmount.maxValue})
  public roomsAmount: number;

  @IsInt({message: CreateOfferValidationMessage.guestsAmount.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.guestsAmount.minValue})
  @Max(10, {message: CreateOfferValidationMessage.guestsAmount.maxValue})
  public guestsAmount: number;

  @IsInt({message: CreateOfferValidationMessage.price.invalidFormat})
  @Min(100, {message: CreateOfferValidationMessage.price.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.price.maxValue})
  public price: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Conveniences, {each: true, message: CreateOfferValidationMessage.conveniences.invalid})
  public conveniences: Conveniences[];

  @ValidateNested()
  @Type(() => OfferCoordinatesDto)
  public location: OfferCoordinatesDto;

  @IsMongoId({message: CreateOfferValidationMessage.authorId.invalidFormat})
  public authorId: string;
}

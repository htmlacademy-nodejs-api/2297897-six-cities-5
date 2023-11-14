import {IsArray, IsEmail, IsEnum, IsOptional, IsString, Length, MaxLength} from 'class-validator';

import {UserTypes} from '../../../types/index.js';
import {USER_CONSTANT_VALUES} from '../user.constant.js';
import {CREATE_USER_VALIDATION_MESSAGES} from './create-user.messages.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString({message: CREATE_USER_VALIDATION_MESSAGES.NAME.INVALID_FORMAT})
  @Length(USER_CONSTANT_VALUES.NAME.MIN_LENGTH, USER_CONSTANT_VALUES.NAME.MAX_LENGTH, {message: CREATE_USER_VALIDATION_MESSAGES.NAME.LENGTH_FIELD})
  public name?: string;

  @IsOptional()
  @IsEmail({}, {message: CREATE_USER_VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT})
  public email?: string;

  @MaxLength(USER_CONSTANT_VALUES.AVATAR_URL.MAX_LENGTH, {message: CREATE_USER_VALIDATION_MESSAGES.AVATAR_URL.MAX_LENGTH})
  @IsOptional()
  public avatarUrl?: string;

  @IsOptional()
  @IsEnum(UserTypes, {message: CREATE_USER_VALIDATION_MESSAGES.TYPE.INVALID_FORMAT})
  public type?: UserTypes;

  @IsOptional()
  @IsString({message: CREATE_USER_VALIDATION_MESSAGES.PASSWORD.INVALID_FORMAT})
  @Length(USER_CONSTANT_VALUES.PASSWORD.MIN_LENGTH, USER_CONSTANT_VALUES.PASSWORD.MAX_LENGTH, {message: CREATE_USER_VALIDATION_MESSAGES.PASSWORD.LENGTH_FIELD})
  public password?: string;

  @IsOptional()
  @IsArray({message: CREATE_USER_VALIDATION_MESSAGES.FAVORITE_OFFERS.INVALID_FORMAT})
  public favoriteOffers?: string[];
}

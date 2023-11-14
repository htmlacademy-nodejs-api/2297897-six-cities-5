import {IsBoolean} from 'class-validator';

import {FAVORITE_OFFER_VALIDATION_MESSAGES} from './favorite-offer.messages.js';

export class FavoriteOfferDto {
  @IsBoolean({message: FAVORITE_OFFER_VALIDATION_MESSAGES.IS_PREMIUM.INVALID_FORMAT})
  public isFavorite: boolean;
}

import {Cities, Conveniences, PlacesTypes} from '../../../types/index.js';

export const CREATE_OFFER_VALIDATION_MESSAGES = {
  NAME: {
    LENGTH_FIELD: 'Min title length is 10, max is 100',
  },
  DESCRIPTION: {
    LENGTH_FIELD: 'Min description length is 20 chars, max is 1024',
  },
  POST_DATE: {
    INVALID_FORMAT: 'postDate must be a valid ISO8601 date'
  },
  CITY: {
    INVALID: `City must be ${Object.values(Cities).join(' | ')}}`
  },
  PREVIEW_IMAGE: {
    MAX_LENGTH: 'Too long for field «previewImage»'
  },
  PLACE_IMAGES: {
    INVALID_COUNT: 'Field «placeImages» must contain 6 images'
  },
  IS_PREMIUM: {
    INVALID_FORMAT: 'isPremium must be a boolean'
  },
  IS_FAVORITE: {
    INVALID_FORMAT: 'isFavorite must be a boolean'
  },
  RATING: {
    INVALID_FORMAT: 'Rating must be an integer',
    MIN_VALUE: 'Min rating is 1',
    MAX_VALUE: 'Max rating is 5'
  },
  TYPE: {
    INVALID: `type must be ${Object.values(PlacesTypes).join(' | ')}`,
  },
  ROOMS_AMOUNT: {
    INVALID_FORMAT: 'Rooms amount must be an integer',
    MIN_VALUE: 'Min rooms is 1',
    MAX_VALUE: 'Max rooms is 10'
  },
  GUESTS_AMOUNT: {
    INVALID_FORMAT: 'Guests amount must be an integer',
    MIN_VALUE: 'Min quests is 1',
    MAX_VALUE: 'Max quests is 10'
  },
  PRICE: {
    INVALID_FORMAT: 'Price must be an integer',
    MIN_VALUE: 'Min price is 100',
    MAX_VALUE: 'Max price is 100000'
  },
  CONVENIENCES:{
    INVALID: `Conveniences must be ${Object.values(Conveniences).join(' | ')}`
  },
  LOCATION: {
    INVALID_FORMAT: 'Location must be in: {latitude: number, longitude: number}'
  },
  AUTHOR_ID: {
    INVALID_FORMAT: 'authorId must be a valid id'
  }
} as const;

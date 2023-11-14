import {UserTypes} from '../../../types/index.js';

export const CREATE_USER_VALIDATION_MESSAGES = {
  NAME: {
    INVALID_FORMAT: 'name is required',
    LENGTH_FIELD: 'min length is 1, max is 15',
  },
  EMAIL: {
    INVALID_FORMAT: 'email must be a valid address'
  },
  AVATAR_URL: {
    MAX_LENGTH: 'Too long for field «avatarUrl»'
  },
  TYPE: {
    INVALID_FORMAT: `type must be ${Object.values(UserTypes).join(' | ')}`,
  },
  PASSWORD: {
    INVALID_FORMAT: 'password is required',
    LENGTH_FIELD: 'min length for password is 6, max is 12'
  },
  FAVORITE_OFFERS: {
    INVALID_FORMAT: 'favorite offers field must be an array'
  }
} as const;

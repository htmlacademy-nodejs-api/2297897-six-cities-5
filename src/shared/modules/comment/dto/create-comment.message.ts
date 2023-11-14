export const CREATE_COMMENT_VALIDATION_MESSAGES = {
  DESCRIPTION: {
    LENGTH_FIELD: 'Min description is 5 chars, max is 1024',
    INVALID_FORMAT: 'description is required'
  },
  RATING: {
    INVALID_FORMAT: 'Rating must be an integer',
    MIN_VALUE: 'Min rating is 1',
    MAX_VALUE: 'Max rating is 5'
  },
  AUTHOR_ID: {
    INVALID_FORMAT: 'authorId must be a valid id'
  },
  OFFER_ID: {
    INVALID_FORMAT: 'offerId must be a valid id'
  },
} as const;

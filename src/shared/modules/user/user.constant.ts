export const USER_CONSTANT_VALUES = {
  NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 15,
  },
  AVATAR_URL: {
    MAX_LENGTH: 256,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 12,
  },
  DEFAULT_AVATAR_FILE_NAME: 'default-avatar.svg',
} as const;


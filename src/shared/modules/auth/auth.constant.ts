export const JWT_CONFIG = {
  ALGORITHM: 'HS256',
  EXPIRATION: '2d',
} as const;

export const ALLOWED_IMAGE_EXTENSIONS = [
  'image/png',
  'image/jpg',
  'image/jpeg'
];

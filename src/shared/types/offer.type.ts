import {Cities, Coordinates} from './cities.enum.js';
import {PlacesTypes} from './places-types.enum.js';
import {Conveniences} from './conveniences.enum.js';
import {User} from './user.type.js';

export type Offer = {
  name: string;
  description: string;
  date: string;
  city: Cities;
  previewImage: string;
  placeImages: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: PlacesTypes;
  roomsAmount: number;
  guestsAmount: number;
  price: number;
  conveniences: Conveniences[];
  author: User;
  //commentsAmount: number;
  cityCoordinates: Coordinates;
};
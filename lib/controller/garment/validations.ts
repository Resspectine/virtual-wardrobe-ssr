import { CreateRequestGarment } from './types';

export const validateGarment = (garment: CreateRequestGarment): boolean =>
  !!garment.description && !!garment.price && !!garment.title;

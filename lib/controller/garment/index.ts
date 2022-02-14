import { appFetch } from '..';

import { CreateRequestGarment, LoadGarmentsQueryParams, UpdateRequestGarment } from './types';
import { validateGarment } from './validations';

import { createQueryParams } from '@/lib/helpers/queryParams';
import { Garment } from 'types/garment';

export const loadGarments = async (params: LoadGarmentsQueryParams): Promise<Garment[]> => {
  const queryParams = createQueryParams(params);

  return appFetch(`garment?${queryParams}`, {
    method: 'GET',
  });
};

export const wearGarment = (garmentId: string): Promise<Response> =>
  appFetch(`garment/wear/${garmentId}`, {
    method: 'PATCH',
  });

export const triggerFavorite = async (garmentId: string): Promise<void> =>
  appFetch(`garment/favorite/${garmentId}`, {
    method: 'PATCH',
  });

export const removeGarment = async (garmentId: string): Promise<void> =>
  appFetch(`garment/${garmentId}`, {
    method: 'DELETE',
  });

export const createGarment = async (garment: CreateRequestGarment): Promise<void> => {
  if (!validateGarment(garment)) {
    return new Promise((_, reject) => {
      reject();
    });
  }

  return appFetch('garment', {
    method: 'POST',
    body: garment,
  });
};

export const getGarmentById = async (id: string | undefined): Promise<Garment | void> => {
  if (!id) {
    return undefined;
  }

  return appFetch(`garment/${id}`, {
    method: 'GET',
  });
};

export const editGarment = async (garment: Partial<UpdateRequestGarment>): Promise<void> => {
  await appFetch(`garment/${garment.id}`, {
    body: garment,
    method: 'PATCH',
  });
};

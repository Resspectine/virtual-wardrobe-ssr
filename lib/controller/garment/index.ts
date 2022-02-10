import { appFetch } from '..';

import { LoadGarmentsQueryParams } from './types';

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

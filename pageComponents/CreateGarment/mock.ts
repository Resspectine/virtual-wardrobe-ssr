import { appFetch } from 'lib/controller';
import { Garment } from 'types/garment';
import { Tag } from 'types/tag';

export type CreateRequestGarment = Omit<Garment, 'id' | 'tags'> & { tags: Omit<Tag, 'id'>[] };

export type UpdateRequestGarment = Omit<Garment, 'tags'> & { tags: (Omit<Tag, 'id'> & { id?: string })[] };

const validateGarment = (garment: CreateRequestGarment): boolean =>
  !!garment.description && !!garment.price && !!garment.title;

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

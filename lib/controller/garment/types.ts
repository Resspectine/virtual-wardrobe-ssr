import { Garment } from '@/types/garment';
import { Tag } from '@/types/tag';

export interface LoadGarmentsQueryParams {
  filter?: string;
  orderBy?: string;
  orderDirection?: string;
}

export type CreateRequestGarment = Omit<Garment, 'id' | 'tags'> & { tags: Omit<Tag, 'id'>[] };

export type UpdateRequestGarment = Omit<Garment, 'tags'> & { tags: (Omit<Tag, 'id'> & { id?: string })[] };

import { appFetch } from '..';

import { Tag } from '@/types/tag';

export const loadTags = async (): Promise<Tag[]> =>
  appFetch('tag', {
    method: 'GET',
  });

export const removeTag = async (tagId: string): Promise<Tag[]> =>
  appFetch(`tag/${tagId}`, {
    method: 'DELETE',
  });

export const createNewTag = async (tag: Omit<Tag, 'id'>): Promise<void> =>
  appFetch('tag', {
    method: 'POST',
    body: tag,
  });

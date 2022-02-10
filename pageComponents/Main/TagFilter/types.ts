import { Dispatch, SetStateAction } from 'react';

import { Tag } from '@/types/tag';

export interface TagFilterProps {
  tags: Tag[];
  setValue: Dispatch<SetStateAction<string[]>>;
  value: string[];
}

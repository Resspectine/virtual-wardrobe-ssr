import { createFilterOptions } from '@mui/material/Autocomplete';

import { AnyTag, CustomTag } from './types';

export const filter = createFilterOptions<AnyTag>();

export const isCustomTag = (tag: AnyTag): tag is CustomTag => !!(tag as CustomTag).inputValue;

export const isNoStringsInArray = (tags: (AnyTag | string)[]): tags is AnyTag[] =>
  tags.every(tag => typeof tag !== 'string');

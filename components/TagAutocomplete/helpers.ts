import { createFilterOptions } from '@mui/material/Autocomplete';

import { AnyTag, CustomTag } from './types';

export const filter = createFilterOptions<AnyTag>();

export const isCustomTag = (tag: AnyTag): tag is CustomTag => !!(tag as CustomTag).inputValue;

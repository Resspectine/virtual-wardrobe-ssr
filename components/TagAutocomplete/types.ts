import { AutocompleteProps } from '@mui/material';

import { Tag } from 'types/tag';

export type CustomTag = { inputValue: string } & Omit<Tag, 'id'>;

export type AnyTag = Tag | CustomTag;

export type TagAutocompleteProps = AutocompleteProps<AnyTag, true, undefined, false>;

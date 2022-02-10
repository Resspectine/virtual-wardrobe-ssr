import { SelectChangeEvent } from '@mui/material';

import { TagFilterProps } from './types';

export const useTagFilter = ({ setValue, value }: Pick<TagFilterProps, 'value' | 'setValue'>) => {
  const handleChange = (event: SelectChangeEvent<typeof value>): void => {
    const {
      target: { value: newValue },
    } = event;

    if (typeof newValue === 'string') {
      return;
    }

    setValue(newValue);
  };

  return { handleChange };
};

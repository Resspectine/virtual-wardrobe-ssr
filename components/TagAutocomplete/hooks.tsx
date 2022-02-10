import TextField from '@mui/material/TextField';

import { filter, isCustomTag, isNoStringsInArray } from './helpers';
import { TagAutocompleteProps } from './types';

import { TagAutocompleteProps as ComponentTagAutocompleteProps } from '.';

type UseTagAutocomplete = Pick<ComponentTagAutocompleteProps, 'value' | 'setValue'>;

export const useTagAutocomplete = ({ setValue, value }: UseTagAutocomplete) => {
  const onChange: TagAutocompleteProps['onChange'] = (_, newValue) => {
    if (!isNoStringsInArray(newValue)) {
      return;
    }

    setValue(newValue);
  };

  const filterOptions: TagAutocompleteProps['filterOptions'] = (options, params) => {
    const filtered = filter(options, params);

    const { inputValue } = params;
    const isExisting = options.some(option => inputValue === option.title);

    if (inputValue !== '' && !isExisting) {
      return [
        ...filtered,
        {
          inputValue,
          title: `Add "${inputValue}"`,
        },
      ];
    }

    return filtered;
  };

  const getOptionLabel: TagAutocompleteProps['getOptionLabel'] = option => {
    if (isCustomTag(option)) {
      return option.inputValue;
    }

    return option.title;
  };

  const renderOption: TagAutocompleteProps['renderOption'] = (props, option) => <li {...props}>{option.title}</li>;

  const renderInput: TagAutocompleteProps['renderInput'] = params => (
    <TextField
      {...params}
      sx={{
        padding: 0,
      }}
      InputLabelProps={{
        sx: {
          transform: (!value.length && 'translate(14px, 10px) scale(1)') || undefined,
          '&.Mui-focused': {
            transform: (!value.length && 'translate(14px, -9px) scale(0.75)') || undefined,
          },
        },
      }}
      InputProps={{
        ...params.InputProps,
        sx: {
          '&.MuiOutlinedInput-root': {
            padding: 0.5,
          },
        },
      }}
      label="Add tags"
    />
  );

  return {
    onChange,
    filterOptions,
    getOptionLabel,
    renderOption,
    renderInput,
  };
};

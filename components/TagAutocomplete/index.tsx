import isEqual from 'lodash/isEqual';
import { Dispatch, FC, SetStateAction } from 'react';

import { useTagAutocomplete } from './hooks';
import { TagAutocompleteStyled } from './styled';
import { AnyTag } from './types';

export interface TagAutocompleteProps {
  autocompleteOptions: AnyTag[];
  value: AnyTag[];
  setValue: Dispatch<SetStateAction<AnyTag[]>>;
}

const TagAutocomplete: FC<TagAutocompleteProps> = ({ autocompleteOptions, setValue, value }) => {
  const { filterOptions, getOptionLabel, onChange, renderInput, renderOption } = useTagAutocomplete({
    setValue,
    value,
  });

  return (
    <TagAutocompleteStyled
      value={value}
      multiple
      onChange={onChange}
      filterOptions={filterOptions}
      selectOnFocus
      handleHomeEndKeys
      isOptionEqualToValue={isEqual}
      options={autocompleteOptions}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      renderInput={renderInput}
    />
  );
};

export default TagAutocomplete;

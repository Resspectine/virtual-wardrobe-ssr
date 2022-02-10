import { InputLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { FC } from 'react';

import { useTagFilter } from './hooks';
import { TagFilterWrapper } from './styled';
import { TagFilterProps } from './types';

const TagFilter: FC<TagFilterProps> = ({ tags, setValue, value }) => {
  const { handleChange } = useTagFilter({
    value,
    setValue,
  });

  return (
    <TagFilterWrapper>
      <InputLabel id="tag-filter-label">Tag</InputLabel>
      <Select
        labelId="tag-filter-label"
        id="tag-filter"
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected): string => selected.map(id => tags.find(tag => tag.id === id)?.title || '').join(', ')}
      >
        {tags.map(tag => (
          <MenuItem key={tag.id} value={tag.id}>
            <Checkbox checked={!!value.find(id => tag.id === id)} />
            <ListItemText primary={tag.title} />
          </MenuItem>
        ))}
      </Select>
    </TagFilterWrapper>
  );
};

export default TagFilter;

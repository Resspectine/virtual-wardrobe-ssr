import Box from '@mui/material/Box';
import { FC, MouseEventHandler } from 'react';

import { TagCancel, TagItemTitle, TagItemWrapper } from './styled';

import { Tag } from '@/types/tag';

interface TagsItemProps {
  tag: Tag;
  onDelete?: (id: string) => MouseEventHandler<HTMLDivElement>;
}

const TagItem: FC<TagsItemProps> = ({ tag, onDelete }) => (
  <TagItemWrapper>
    <TagItemTitle>{tag.title}</TagItemTitle>
    {onDelete && (
      <Box display="flex" onClick={onDelete(tag.id)}>
        <TagCancel />
      </Box>
    )}
  </TagItemWrapper>
);

export default TagItem;

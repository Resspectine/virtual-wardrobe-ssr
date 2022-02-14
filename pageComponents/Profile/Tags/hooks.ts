import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { loadTags, removeTag } from '@/lib/controller/tag';

export const useTags = () => {
  const queryClient = useQueryClient();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { data: loadTagsData } = useQuery('tags', loadTags);
  const { mutate: removeTagMutate } = useMutation(removeTag);

  const onDelete = (id: string) => () =>
    removeTagMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('tags');
      },
    });

  return {
    onDelete,
    loadTagsData,
    isModalOpened,
    setIsModalOpened,
  };
};

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { loadTags, removeTag } from '@/lib/controller/tag';

export const useTags = () => {
  const queryClient = useQueryClient();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { data } = useQuery('tags', loadTags);
  const { mutate } = useMutation(removeTag);

  const onDelete = (id: string) => () =>
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('tags');
      },
    });

  return {
    data,
    onDelete,
    isModalOpened,
    setIsModalOpened,
  };
};

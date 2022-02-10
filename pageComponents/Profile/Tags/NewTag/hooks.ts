import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { NewTag, NewTagValues } from '.';

import { createNewTag } from '@/lib/controller/tag';
import { useAppNotification } from '@/store/appNotification';

export const useNewTag = ({ closeModal }: NewTag) => {
  const queryClient = useQueryClient();
  const addNotification = useAppNotification(state => state.addNotification);
  const { mutate } = useMutation(createNewTag);

  const { control, handleSubmit, reset, register } = useForm<NewTagValues>({
    defaultValues: {
      title: '',
      addMore: false,
    },
  });

  const onSubmit = handleSubmit(values => {
    const { addMore, ...restValues } = values;

    mutate(restValues, {
      onSuccess: () => {
        addNotification({ message: 'Tag created successfully', type: 'success' });
        queryClient.invalidateQueries('tags');
        reset();

        if (!addMore) {
          closeModal();
        }
      },
    });
  });

  return {
    control,
    register,
    onSubmit,
  };
};

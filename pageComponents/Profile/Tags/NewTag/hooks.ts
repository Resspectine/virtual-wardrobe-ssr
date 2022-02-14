import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { NewTag, NewTagValues } from '.';

import { createNewTag } from '@/lib/controller/tag';
import { useAppNotification } from '@/store/appNotification';

export const useNewTag = ({ closeModal }: NewTag) => {
  const queryClient = useQueryClient();
  const addNotification = useAppNotification(state => state.addNotification);
  const { mutate: createNewTagMutate } = useMutation(createNewTag);

  const { control, handleSubmit, register, resetField } = useForm<NewTagValues>({
    defaultValues: {
      title: '',
      addMore: false,
    },
  });

  const onSubmit = handleSubmit(values => {
    const { addMore, ...restValues } = values;

    createNewTagMutate(restValues, {
      onSuccess: () => {
        addNotification({ message: 'Tag created successfully', type: 'success' });
        queryClient.invalidateQueries('tags');
        resetField('title');

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

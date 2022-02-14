import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MutateOptions, useMutation, useQuery } from 'react-query';

import { createGarment, CreateRequestGarment, editGarment, getGarmentById, UpdateRequestGarment } from './mock';
import { CreateGarmentValues } from './types';

import { isCustomTag } from '@/components/TagAutocomplete/helpers';
import { AnyTag } from '@/components/TagAutocomplete/types';
import { fileFetch } from '@/lib/controller/file';
import { loadTags } from '@/lib/controller/tag';
import { getFileFromStream } from '@/lib/helpers/files';
import { ROUTE_PATHS } from '@/routes/constants';
import { useAppNotification } from '@/store/appNotification';
import { File as PictureFile } from '@/types/file';

interface SendGarment {
  values: CreateGarmentValues;
  file?: PictureFile;
}

export const useCreateClothes = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const addNotification = useAppNotification(state => state.addNotification);
  const { data: tags } = useQuery('tags', loadTags);
  const { mutate: editGarmentMutate, isLoading: editGarmentIsLoading } = useMutation<
    void,
    Error,
    Partial<UpdateRequestGarment>,
    unknown
  >(editGarment, {
    onMutate: () => {
      addNotification({
        message: 'Editing garment',
        type: 'notification',
      });
    },
  });
  const { mutate: createGarmentMutate, isLoading: createGarmentIsLoading } = useMutation<
    void,
    Error,
    CreateRequestGarment,
    unknown
  >(createGarment, {
    onMutate: () => {
      addNotification({
        message: 'Creating garment',
        type: 'notification',
      });
    },
  });
  const { data } = useQuery(['garments', id], () => getGarmentById(id));
  const [autocompleteValue, setAutocompleteValue] = useState<AnyTag[]>([]);

  const {
    control,
    handleSubmit,
    watch,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateGarmentValues>({
    defaultValues: {
      description: '',
      price: '',
      title: '',
      image: [],
    },
    mode: 'onChange',
  });

  useEffect(() => {
    const setPicture = async (): Promise<void> => {
      if (data?.picture) {
        const file = await getFileFromStream(data.picture, data.picture.filename);
        setValue('image', [file]);
      }
    };

    if (data) {
      setValue('description', data.description);
      setValue('price', data.price);
      setValue('title', data.title);

      if (data.tags) {
        setAutocompleteValue(data.tags);
      }

      setPicture();
    }
  }, [data]);

  const mutateGarment = (
    values: CreateRequestGarment & Partial<UpdateRequestGarment>,
    options: MutateOptions<void, Error, CreateRequestGarment, unknown> &
      MutateOptions<void, Error, Partial<UpdateRequestGarment>, unknown>
  ): void => (!data ? createGarmentMutate(values, options) : editGarmentMutate(values, options));

  const sendGarment = ({ values: { image: _, ...values }, file }: SendGarment): void => {
    mutateGarment(
      {
        ...values,
        id: data?.id,
        picture: file || data?.picture,
        isFavorite: data?.isFavorite || false,
        wearingAmount: data?.wearingAmount || 0,
        tags: autocompleteValue.map(tag =>
          isCustomTag(tag)
            ? {
                title: tag.inputValue,
              }
            : tag
        ),
      },
      {
        onSuccess: () => {
          addNotification({ message: 'Garment created successfully', type: 'success' });
          router.push(ROUTE_PATHS.main);
        },
      }
    );
  };

  const onSubmit = handleSubmit(async values => {
    if (watch('image')[0].name === data?.picture?.filename) {
      sendGarment({
        values,
      });

      return;
    }

    const file = await (await fileFetch(values.image[0])).json();

    sendGarment({
      values,
      file,
    });
  });

  return {
    tags,
    watch,
    errors,
    control,
    isValid: isValid && !(editGarmentIsLoading || createGarmentIsLoading),
    onSubmit,
    register,
    setValue,
    autocompleteValue,
    setAutocompleteValue,
  };
};

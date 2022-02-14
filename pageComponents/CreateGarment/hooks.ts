import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MutateOptions, useMutation, useQuery } from 'react-query';

import { CreateGarmentValues } from './types';

import { isCustomTag } from '@/components/TagAutocomplete/helpers';
import { AnyTag } from '@/components/TagAutocomplete/types';
import { fileFetch } from '@/lib/controller/file';
import { createGarment, editGarment, getGarmentById } from '@/lib/controller/garment';
import { CreateRequestGarment, UpdateRequestGarment } from '@/lib/controller/garment/types';
import { loadTags } from '@/lib/controller/tag';
import { getFileFromStream } from '@/lib/helpers/files';
import { ROUTE_PATHS } from '@/routes/constants';
import { useAppNotification } from '@/store/appNotification';
import { File as PictureFile } from '@/types/file';

interface SendGarment {
  values: CreateGarmentValues;
  file?: PictureFile;
}

export const useCreateGarment = () => {
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
  const { data: garmentsData } = useQuery(['garments', id], () => getGarmentById(id));
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
      if (garmentsData?.picture) {
        const file = await getFileFromStream(garmentsData.picture, garmentsData.picture.filename);
        setValue('image', [file]);
      }
    };

    if (garmentsData) {
      setValue('description', garmentsData.description);
      setValue('price', garmentsData.price);
      setValue('title', garmentsData.title);

      if (garmentsData.tags) {
        setAutocompleteValue(garmentsData.tags);
      }

      setPicture();
    }
  }, [garmentsData]);

  const mutateGarment = (
    values: CreateRequestGarment & Partial<UpdateRequestGarment>,
    options: MutateOptions<void, Error, CreateRequestGarment, unknown> &
      MutateOptions<void, Error, Partial<UpdateRequestGarment>, unknown>
  ): void => (!garmentsData ? createGarmentMutate(values, options) : editGarmentMutate(values, options));

  const sendGarment = ({ values: { image: _, ...values }, file }: SendGarment): void => {
    mutateGarment(
      {
        ...values,
        id: garmentsData?.id,
        picture: file || garmentsData?.picture,
        isFavorite: garmentsData?.isFavorite || false,
        wearingAmount: garmentsData?.wearingAmount || 0,
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
    if (watch('image')[0].name === garmentsData?.picture?.filename) {
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

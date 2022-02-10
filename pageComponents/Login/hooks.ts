import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { login } from '@/lib/controller/authentication';
import { LoginUser } from '@/lib/controller/authentication/types';
import { ROUTE_PATHS } from '@/routes/constants';
import { useAppNotification } from '@/store/appNotification';
import { useUser } from '@/store/user';

export type LoginValue = LoginUser;

export const useCreateClothes = () => {
  const router = useRouter();
  const setUser = useUser(state => state.setUser);
  const addNotification = useAppNotification(state => state.addNotification);
  const { mutate } = useMutation(login);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<LoginValue>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(values => {
    mutate(values, {
      onSuccess: user => {
        setUser(user);

        addNotification({ message: 'Login success', type: 'success' });

        router.push(ROUTE_PATHS.main);
      },
      onError: () => {
        addNotification({
          message: 'Error ocurred, try again please',
          type: 'error',
        });

        setValue('password', '');
      },
    });
  });

  return {
    control,
    isValid,
    onSubmit,
  };
};

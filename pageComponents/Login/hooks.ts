import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { login } from '@/lib/controller/authentication';
import { LoginUser } from '@/lib/controller/authentication/types';
import { ROUTE_PATHS } from '@/routes/constants';
import { useAppNotification } from '@/store/appNotification';
import { StoreUser, useUser } from '@/store/user';

export type LoginValue = LoginUser;

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useUser(state => state.setUser);
  const addNotification = useAppNotification(state => state.addNotification);
  const { mutate: loginMutate } = useMutation<StoreUser, Error, LoginValue, unknown>(login);

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
    loginMutate(values, {
      onSuccess: async user => {
        await queryClient.invalidateQueries('authentication');
        setUser(user);

        addNotification({ message: 'Login success', type: 'success' });

        router.push(ROUTE_PATHS.main);
      },
      onError: error => {
        addNotification({
          message: error.message,
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

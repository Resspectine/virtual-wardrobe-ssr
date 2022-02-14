import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { register } from '@/lib/controller/authentication';
import { RegisterUser } from '@/lib/controller/authentication/types';
import { ROUTE_PATHS } from '@/routes/constants';
import { useAppNotification } from '@/store/appNotification';

export type RegisterValue = RegisterUser & {
  confirmPassword: string;
};

export const useRegister = () => {
  const router = useRouter();
  const addNotification = useAppNotification(state => state.addNotification);
  const { mutate: registerMutate } = useMutation<void, Error, RegisterValue>(register);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
    resetField,
  } = useForm<RegisterValue>({
    defaultValues: { email: '', password: '', confirmPassword: '', name: '' },
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(values => {
    registerMutate(values, {
      onSuccess: () => {
        addNotification({ message: 'Register success', type: 'success' });
        router.push(ROUTE_PATHS.login);
      },
      onError: error => {
        addNotification({ message: error.message, type: 'error' });
        resetField('confirmPassword');
      },
    });
  });

  return {
    watch,
    control,
    isValid,
    onSubmit,
  };
};

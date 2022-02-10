import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { fileFetch } from '@/lib/controller/file';
import { usePictureLoad } from '@/lib/hooks/usePictureLoad';
import { useUser } from '@/store/user';

export const useNamePicture = () => {
  const user = useUser(state => state.user);
  const userProfileUrl = usePictureLoad({ file: user?.avatar });
  const updateUserAvatar = useUser(state => state.updateUserAvatar);
  const { register, watch, handleSubmit } = useForm<{ profilePicture: File[] }>({
    defaultValues: { profilePicture: [] },
  });

  useEffect(() => {
    if (watch('profilePicture').length) {
      handleSubmit(async values => {
        const file = await (await fileFetch(values.profilePicture[0], 'user/avatar')).json();

        updateUserAvatar(file);
      })();
    }
  }, [watch('profilePicture')]);

  return {
    userName: user?.name,
    userProfileUrl,
    register,
  };
};

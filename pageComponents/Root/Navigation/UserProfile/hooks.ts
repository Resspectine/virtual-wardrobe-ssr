import { useRouter } from 'next/router';
import { useState, MouseEventHandler } from 'react';
import { useMutation } from 'react-query';

import { placeholderImageUrl } from './constants';

import { appFetch } from '@/lib/controller';
import { usePictureLoad } from '@/lib/hooks/usePictureLoad';
import { ROUTE_PATHS } from '@/routes/constants';
import { useAppState } from '@/store/appState';
import { useUser } from '@/store/user';

export const useUserProfile = () => {
  const router = useRouter();
  const user = useUser(state => state.user);
  const removeUser = useUser(state => state.removeUser);
  const userProfileUrl = usePictureLoad({ file: user?.avatar });
  const toggleThemeMode = useAppState(state => state.toggleThemeMode);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);

  const { mutate: logOutMutate } = useMutation(() => appFetch('authentication/log-out', { method: 'POST' }), {
    onMutate: () => {
      removeUser();
    },
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;

  const menuItems = [
    {
      text: 'Profile',
      onClick: (): void => {
        handleClose();

        router.push(ROUTE_PATHS.profile);
      },
    },
    {
      text: 'Toggle theme',
      onClick: (): void => {
        handleClose();
        toggleThemeMode();
      },
    },
    {
      text: 'Logout',
      onClick: (): void => {
        logOutMutate();
        handleClose();
      },
    },
  ];

  return {
    open,
    anchorEl,
    menuItems,
    handleClick,
    handleClose,
    userProfileUrl: userProfileUrl || placeholderImageUrl,
  };
};

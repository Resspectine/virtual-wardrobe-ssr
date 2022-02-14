import { Box } from '@mui/material';
import { FC } from 'react';

import { useAuthentication } from './hooks';

import { Loading } from '@/components/Loading';

export const AuthenticationProvider: FC = ({ children }) => {
  const { isLoading, isUnauthorizedPage } = useAuthentication();

  if ((!children || isLoading) && !isUnauthorizedPage) {
    return <Loading />;
  }

  return <Box>{children}</Box>;
};

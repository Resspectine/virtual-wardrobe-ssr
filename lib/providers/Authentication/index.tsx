import { Box } from '@mui/material';
import { FC } from 'react';

import { useAuthentication } from './hooks';

import { Loading } from '@/components/Loading';

export const AuthenticationProvider: FC = ({ children }) => {
  const { isLoading } = useAuthentication();

  if (!children || isLoading) {
    return <Loading />;
  }

  return <Box>{children}</Box>;
};

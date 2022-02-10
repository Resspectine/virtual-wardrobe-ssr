import { CssBaseline } from '@mui/material';
import { FC } from 'react';

import { useRoot } from './hooks';
import Navigation from './Navigation';
import { RootWrapper, RoutesWrapper } from './styled';

import { AppNotification } from '@/components/AppNotification';

const Root: FC = ({ children }) => {
  const { isLoggedIn } = useRoot();

  return (
    <RootWrapper isLoggedIn={isLoggedIn}>
      <AppNotification />
      <CssBaseline />
      {isLoggedIn && <Navigation />}
      <RoutesWrapper>{children}</RoutesWrapper>
    </RootWrapper>
  );
};

export default Root;

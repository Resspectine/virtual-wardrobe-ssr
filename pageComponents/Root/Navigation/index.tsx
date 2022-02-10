import Box from '@mui/material/Box';
import omit from 'lodash/omit';
import { FC } from 'react';

import { useNavigationControl } from './hooks';
import { NavigationLink, NavigationWrapper } from './styled';
import UserProfile from './UserProfile';

import { camelToSentenceCase } from '@/lib/helpers/textTransformations';
import { KEYS_TO_OMIT, ROUTE_PATHS, TypesToOmit } from '@/routes/constants';

const routes = omit(ROUTE_PATHS, KEYS_TO_OMIT) as Omit<typeof ROUTE_PATHS, TypesToOmit>;

const Navigation: FC = () => {
  const { goTo, isCurrentPage } = useNavigationControl();

  return (
    <NavigationWrapper>
      {Object.entries(routes).map(([linkName, link], index) => (
        <Box key={index} onClick={(): void => goTo(link)}>
          <NavigationLink isCurrentPage={isCurrentPage(link)}>{camelToSentenceCase(linkName)}</NavigationLink>
        </Box>
      ))}
      <UserProfile />
    </NavigationWrapper>
  );
};

export default Navigation;

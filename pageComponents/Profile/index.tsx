import Box from '@mui/material/Box';
import { FC } from 'react';

import NamePicture from './NamePicture';
import { ProfileDivider } from './styled';
import Tags from './Tags';

const Profile: FC = () => (
  <Box display="flex">
    <Box flex="1">
      <Tags />
    </Box>
    <ProfileDivider />
    <NamePicture />
  </Box>
);

export default Profile;

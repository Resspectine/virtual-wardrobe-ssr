import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';

import { useNamePicture } from './hooks';
import { NamePictureAvatar, NamePictureAvatarWrapper, NamePictureLabel, NamePictureText } from './styled';

const NamePicture: FC = () => {
  const { register, userName, userProfileUrl } = useNamePicture();

  return (
    <Box>
      <NamePictureLabel>Name: </NamePictureLabel>
      <NamePictureText>{userName}</NamePictureText>
      <NamePictureAvatarWrapper>
        <NamePictureAvatar src={userProfileUrl} alt="avatar" />
        <Button variant="outlined" component="label">
          Update image
          <input type="file" hidden {...register('profilePicture')} />
        </Button>
      </NamePictureAvatarWrapper>
    </Box>
  );
};

export default NamePicture;

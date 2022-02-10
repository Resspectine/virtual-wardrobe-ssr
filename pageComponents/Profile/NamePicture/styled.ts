import { Avatar, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const NamePictureAvatarWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const NamePictureAvatar = styled(Avatar)({
  width: 160,
  height: 160,
  marginBottom: 20,
});

export const NamePictureLabel = styled(Typography)({
  fontSize: 20,
});

export const NamePictureText = styled(Typography)({
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 20,
});

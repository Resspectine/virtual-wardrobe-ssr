import { Button } from '@mui/material';
import { Box, styled } from '@mui/system';

export const UserProfileWrapper = styled(Box)(() => ({
  position: 'absolute',
  right: 20,
}));

export const UserProfileButton = styled(Button)(() => ({
  padding: 0,
  minWidth: 'unset',
}));

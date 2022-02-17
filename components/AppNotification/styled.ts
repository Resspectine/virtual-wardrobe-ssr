import { Box, styled } from '@mui/system';

export const AppNotificationRoot = styled(Box)({
  position: 'fixed',
  top: 40,
  left: 20,
  zIndex: 3000,
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: 350,
});

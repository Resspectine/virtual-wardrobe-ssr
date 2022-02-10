import { Box, styled } from '@mui/material';

export const Image = styled(Box)<{ src: string; alt: string }>({
  maxWidth: 300,
  height: 'auto',
});

export const CloseIcon = styled(Box)({
  position: 'absolute',
  top: 5,
  right: 5,
  backgroundColor: '#fff',
  display: 'flex',
  borderRadius: 8,
});

import { Box, styled } from '@mui/system';

export const GarmentImageDivider = styled(Box)({
  height: '1px',
  width: '90%',
  borderRadius: 1,
  backgroundColor: '#e8e8e8',
  margin: '10px auto',
});

export const GarmentImage = styled(Box)<{ src: string; alt: string }>({
  width: '100%',
  height: 'auto',
});

import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const GarmentWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: 10,
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  cursor: 'pointer',
  userSelect: 'none',
  boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);',
}));

export const GarmentStarButton = styled(Box, {
  shouldForwardProp: propName => propName !== 'isFavorite',
})<{ isFavorite: boolean }>(({ theme, isFavorite }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: isFavorite ? theme.palette.text.secondary : theme.palette.common.white,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 5,
  borderRadius: 8,
}));

export const GarmentDataTitle = styled(Typography)({
  fontSize: 20,
  lineHeight: '20px',
  marginBottom: 16,
  fontWeight: 500,
});

export const GarmentDataDescription = styled(Typography)({
  fontSize: 16,
  lineHeight: '16px',
  marginBottom: 16,
});

export const GarmentWearingAmount = styled(Typography)({
  fontSize: 18,
  lineHeight: '18px',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
});

export const GarmentPrice = styled(Typography)({
  fontSize: 18,
  lineHeight: '18px',
  fontWeight: 500,
});

import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const NavigationWrapper = styled(Box)(({ theme }) => ({
  padding: '20px',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  gap: 20,
  justifyContent: 'center',
  position: 'relative',
  alignItems: 'center',
}));

export const NavigationLink = styled(Typography, {
  shouldForwardProp: propName => propName !== 'isCurrentPage',
})<{ isCurrentPage: boolean }>(({ theme, isCurrentPage }) => ({
  textDecoration: 'none',
  color: isCurrentPage ? theme.palette.text.secondary : theme.palette.text.primary,
  fontSize: 18,
  cursor: 'pointer',
}));

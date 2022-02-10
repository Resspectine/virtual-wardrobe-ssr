import { Cancel } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';

export const TagItemWrapper = styled(Box)(({ theme }) => ({
  maxHeight: 40,
  padding: theme.spacing(0.625, 2),
  backgroundColor: '#f5f5f5',
  borderRadius: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'default',
  margin: theme.spacing(0, 0.625),
  marginBottom: theme.spacing(1.25),
}));

export const TagItemTitle = styled(Typography)({
  fontSize: 14,
  lineHeight: '14px',
});

export const TagCancel = styled(Cancel)(({ theme }) => ({
  fontSize: 20,
  color: theme.palette.text.secondary,
  marginLeft: 5,
  cursor: 'pointer',
  '&:hover': {
    color: '#595959',
  },
}));

import { Button } from '@mui/material';
import { Box, styled } from '@mui/system';
import Link from 'next/link';

import TextField, { ControlledTextFieldType } from '@/components/ControlledTextField';

export const LoginForm = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const LoginTextField = styled(TextField)({
  '&.MuiTextField-root': {
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
  },
}) as ControlledTextFieldType;

export const LoginSubmit = styled(Button)({
  marginTop: 10,
  color: '#fff',
});

export const LoginLink = styled(Link)(() => ({
  color: '#000',
  textTransform: 'initial',
}));

export const LoginNavigation = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

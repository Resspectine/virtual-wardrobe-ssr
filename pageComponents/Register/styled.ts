import { Button } from '@mui/material';
import { Box, styled } from '@mui/system';
import Link from 'next/link';

import TextField, { ControlledTextFieldType } from '@/components/ControlledTextField';

export const RegisterForm = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const RegisterTextField = styled(TextField)({
  '&.MuiTextField-root': {
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
  },
}) as ControlledTextFieldType;

export const RegisterSubmit = styled(Button)({
  marginTop: 10,
  color: '#fff',
});

export const RegisterLink = styled(Link)(() => ({
  color: '#000',
  textTransform: 'initial',
}));

export const RegisterNavigation = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

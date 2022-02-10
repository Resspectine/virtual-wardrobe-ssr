import { Button } from '@mui/material';
import { Box, styled } from '@mui/system';

import ControlledTextField, { ControlledTextFieldType } from 'components/ControlledTextField';

export const CreateGarmentForm = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const CreateGarmentTextField = styled(ControlledTextField)({
  '&.MuiTextField-root': {
    marginBottom: 10,
    marginTop: 10,
    width: '50%',
  },
}) as ControlledTextFieldType;

export const CreateGarmentSubmit = styled(Button)({
  marginTop: 10,
  color: '#fff',
});

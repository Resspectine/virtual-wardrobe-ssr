import { Box, styled } from '@mui/system';

import TextField, { ControlledTextFieldType } from '@/components/ControlledTextField';

export const NewTagWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 4, 3),
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 8,
}));

export const NewTagForm = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const NewTagActionsWrapper = styled(Box)({
  marginTop: 10,
  width: '100%',
  justifyContent: 'space-between',
  display: 'flex',
});

export const NewTagTextField = styled(TextField)({
  '&.MuiTextField-root': {
    marginBottom: 1.25,
    width: '100%',
  },
}) as ControlledTextFieldType;

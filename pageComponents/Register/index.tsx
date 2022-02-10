import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

import { getFormFieldConfigurations } from './helpers';
import { useRegister } from './hooks';
import { RegisterForm, RegisterLink, RegisterNavigation, RegisterSubmit, RegisterTextField } from './styled';

import { ROUTE_PATHS } from '@/routes/constants';

const Register: FC = () => {
  const { control, onSubmit, isValid, watch } = useRegister();

  return (
    <Box>
      <RegisterNavigation>
        <Typography>Register</Typography>
        <Button>
          <RegisterLink href={ROUTE_PATHS.login}>To login page</RegisterLink>
        </Button>
      </RegisterNavigation>
      <RegisterForm component="form" onSubmit={onSubmit}>
        {getFormFieldConfigurations(control, watch).map((props, index) => (
          <RegisterTextField {...props} key={index} />
        ))}
        <RegisterSubmit type="submit" variant="contained" color="primary" disabled={!isValid}>
          Submit
        </RegisterSubmit>
      </RegisterForm>
    </Box>
  );
};

export default Register;

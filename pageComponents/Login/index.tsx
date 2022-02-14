import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

import { getFormFieldConfigurations } from './helpers';
import { useLogin } from './hooks';
import { LoginForm, LoginLink, LoginNavigation, LoginSubmit, LoginTextField } from './styled';

import { ROUTE_PATHS } from '@/routes/constants';

const Login: FC = () => {
  const { control, onSubmit, isValid } = useLogin();

  return (
    <Box>
      <LoginNavigation>
        <Typography>Log in</Typography>
        <Button>
          <LoginLink href={ROUTE_PATHS.register}>To registration page</LoginLink>
        </Button>
      </LoginNavigation>
      <LoginForm component="form" onSubmit={onSubmit}>
        {getFormFieldConfigurations(control).map((props, index) => (
          <LoginTextField {...props} key={index} />
        ))}
        <LoginSubmit type="submit" variant="contained" color="primary" disabled={!isValid}>
          Submit
        </LoginSubmit>
      </LoginForm>
    </Box>
  );
};

export default Login;

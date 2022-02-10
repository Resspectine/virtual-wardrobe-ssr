import { Box, styled } from '@mui/system';

export const RootWrapper = styled(Box)<{ isLoggedIn: boolean }>(({ theme, isLoggedIn }) => ({
  ...((isLoggedIn && {
    [theme.breakpoints.up('xs')]: {
      maxWidth: '100%',
      marginRight: 20,
      marginLeft: 20,
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 560,
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 720,
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 1160,
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: 1500,
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    marginBottom: 20,
  }) || { maxWidth: 'min(100%, 400px)', margin: '0 auto' }),
}));

export const RoutesWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '20px',
  marginTop: 30,
  borderRadius: 10,
  flex: 1,
}));

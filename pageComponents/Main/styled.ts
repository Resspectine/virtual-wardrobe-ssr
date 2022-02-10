import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const MainWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  flexWrap: 'wrap',
  rowGap: 30,
  columnGap: 45,
  [theme.breakpoints.up('xs')]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
}));

export const MainListItem = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  fontSize: 16,
  padding: '0px 10px',
  margin: '0 -5px 5px',
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
  '&:last-child': {
    marginBottom: 0,
  },
}));

export const MainListFilterWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 30,
}));

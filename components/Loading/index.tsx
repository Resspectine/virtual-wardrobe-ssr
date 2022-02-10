import CircularProgress from '@mui/material/CircularProgress';
import { SxProps, Theme } from '@mui/system';
import { FC } from 'react';

import { LoadingWrapper } from './styled';

interface LoadingProps {
  sxs?: { root?: SxProps<Theme>; icon?: SxProps<Theme> };
}

export const Loading: FC<LoadingProps> = ({ sxs }) => (
  <LoadingWrapper
    sx={{
      ...sxs?.root,
    }}
  >
    <CircularProgress
      sx={{
        ...sxs?.icon,
      }}
    />
  </LoadingWrapper>
);

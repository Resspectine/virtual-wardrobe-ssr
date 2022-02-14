import { FormControlLabel, FormGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popover from '@mui/material/Popover';
import { Dispatch, FC, SetStateAction } from 'react';

import { MainListItem } from './styled';

export interface PopoverList {
  onClick: () => void;
  children: string;
}

interface FavoriteFirst {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
}

export const FavoriteFirst: FC<FavoriteFirst> = ({ setValue, value }) => (
  <FormGroup>
    <FormControlLabel
      control={<Checkbox checked={value} onChange={(_, checked): void => setValue(checked)} />}
      label="Favorite first"
    />
  </FormGroup>
);

interface MainListPopover {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  popoverList: PopoverList[];
  anchorPosition: {
    top: number;
    left: number;
  };
}

export const MainListPopover: FC<MainListPopover> = ({ anchorPosition, isOpened, popoverList, setIsOpened }) => (
  <Popover anchorReference="anchorPosition" anchorPosition={anchorPosition} open={isOpened}>
    <ClickAwayListener onClickAway={(): void => setIsOpened(false)} touchEvent="onTouchStart" mouseEvent="onMouseDown">
      <Box p={0.625}>
        {popoverList.map((listItem, index) => (
          <MainListItem key={index} {...listItem} />
        ))}
      </Box>
    </ClickAwayListener>
  </Popover>
);

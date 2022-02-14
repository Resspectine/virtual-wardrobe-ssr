import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popover from '@mui/material/Popover';
import { FC } from 'react';

import { FavoriteFirst } from './Components';
import Garment from './Garment';
import { useMain } from './hooks';
import { MainListFilterWrapper, MainListItem, MainWrapper } from './styled';
import TagFilter from './TagFilter';

const Main: FC = () => {
  const {
    hold,
    onClick,
    isOpened,
    tagsData,
    setIsOpened,
    popoverList,
    garmentsData,
    selectedTags,
    anchorPosition,
    toggleFavorite,
    setSelectedTags,
    isFavoriteFirst,
    setFavoriteFirst,
  } = useMain();

  return (
    <div>
      <MainListFilterWrapper>
        {tagsData && <TagFilter setValue={setSelectedTags} value={selectedTags} tags={tagsData} />}
        <FavoriteFirst setValue={setFavoriteFirst} value={isFavoriteFirst} />
      </MainListFilterWrapper>
      <MainWrapper>
        <Popover anchorReference="anchorPosition" anchorPosition={anchorPosition} open={isOpened}>
          <ClickAwayListener
            onClickAway={(): void => setIsOpened(false)}
            touchEvent="onTouchStart"
            mouseEvent="onMouseDown"
          >
            <Box p={0.625}>
              {popoverList.map((listItem, index) => (
                <MainListItem key={index} {...listItem} />
              ))}
            </Box>
          </ClickAwayListener>
        </Popover>
        {garmentsData?.map(garment => (
          <Garment
            key={garment.id}
            garment={garment}
            onClick={(): void => onClick(garment.id)}
            toggleFavorite={toggleFavorite}
            {...hold(garment.id)}
          />
        ))}
      </MainWrapper>
    </div>
  );
};

export default Main;

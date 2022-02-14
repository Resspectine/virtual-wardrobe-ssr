import { FC } from 'react';

import { FavoriteFirst, MainListPopover } from './Components';
import Garment from './Garment';
import { useMain } from './hooks';
import { MainListFilterWrapper, MainWrapper } from './styled';
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
        <MainListPopover
          anchorPosition={anchorPosition}
          isOpened={isOpened}
          popoverList={popoverList}
          setIsOpened={setIsOpened}
        />
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

import { Box } from '@mui/system';
import { FC } from 'react';

import { useImageSection } from './hooks';
import { GarmentImage, GarmentImageDivider } from './styled';

import { File as PublicFile } from '@/types/file';

export interface ImageSectionProps {
  image: PublicFile | null;
}

export const ImageSection: FC<ImageSectionProps> = ({ image }) => {
  const { imageUrl } = useImageSection({ image });

  return (
    (imageUrl && (
      <>
        <Box>
          <GarmentImage component="img" src={imageUrl} alt="Something went wrong" />
        </Box>
        <GarmentImageDivider />
      </>
    )) ||
    null
  );
};

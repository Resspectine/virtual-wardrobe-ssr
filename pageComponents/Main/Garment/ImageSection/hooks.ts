import { useCallback, useEffect, useState } from 'react';

import { ImageSectionProps } from '.';

import { getDataStringFromFile, getFileFromStream } from 'lib/helpers/files';

export const useImageSection = ({ image }: ImageSectionProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const loadPictureFile = useCallback(async (): Promise<void> => {
    const file = await getFileFromStream(image);

    getDataStringFromFile(file, setImageUrl);
  }, [image]);

  useEffect(() => {
    loadPictureFile();
  }, [image]);

  return {
    imageUrl,
  };
};

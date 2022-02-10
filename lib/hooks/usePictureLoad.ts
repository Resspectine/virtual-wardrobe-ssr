import { useEffect, useState } from 'react';

import { getDataStringFromFile, getFileFromStream } from '@/lib/helpers/files';
import { File } from '@/types/file';

interface UsePictureLoadParams {
  file: File | undefined;
}

export const usePictureLoad = ({ file }: UsePictureLoadParams): string | null => {
  const [userProfileUrl, setUserProfileUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadAvatar = async (): Promise<void> => {
      getDataStringFromFile(await getFileFromStream(file || null), setUserProfileUrl);
    };

    loadAvatar();
  }, [file]);

  return userProfileUrl;
};

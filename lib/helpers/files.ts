import { appFetch } from '@/lib/controller';
import { File as PublicFile } from '@/types/file';

export const getDataStringFromFile = (file: File, setFileUrl: (file: string) => void): void => {
  const reader = new FileReader();

  reader.onloadend = (): void => {
    setFileUrl(reader.result?.toString() || '');
  };

  reader.readAsDataURL(new File([file], 'temp'));
};

export const getFileFromStream = async (image: PublicFile | null, name = 'temp'): Promise<File> => {
  if (!image) {
    return new File([], 'temp');
  }

  const blob = await appFetch(
    `files/${image.id}`,
    {
      method: 'GET',
    },
    true
  );

  return new File([blob], name);
};

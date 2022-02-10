import { useEffect, useState } from 'react';

import { FileUploadProps } from './types';

import { getDataStringFromFile } from 'lib/helpers/files';

type UseFileUploadControl = Pick<FileUploadProps, 'setValue' | 'name' | 'file' | 'errors'>;

export const useFileUploadControl = ({ setValue, name, file, errors }: UseFileUploadControl) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      getDataStringFromFile(file, setFileUrl);
    }
  }, [file]);

  const onCloseCLick = () => {
    setFileUrl(null);
    setValue(name, []);
  };

  const error = errors?.[name];

  return { fileUrl, onCloseCLick, error };
};

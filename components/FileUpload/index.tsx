import Close from '@mui/icons-material/Close';
import { FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FC } from 'react';

import { useFileUploadControl } from './hooks';
import { CloseIcon, Image } from './styled';
import { FileUploadProps } from './types';

const FileUpload: FC<FileUploadProps> = ({ register, name, file, setValue, disabled, errors }) => {
  const { fileUrl, onCloseCLick, error } = useFileUploadControl({
    file,
    name,
    setValue,
    errors,
  });

  return fileUrl ? (
    <Box position="relative">
      <Image component="img" src={fileUrl} alt="Something went wrong" />
      <CloseIcon onClick={onCloseCLick}>
        <Close />
      </CloseIcon>
    </Box>
  ) : (
    <>
      <Button variant="outlined" component="label" disabled={disabled}>
        Upload File
        <input
          type="file"
          hidden
          {...register(name, {
            required: 'Image is required',
          })}
        />
      </Button>
      {error && (
        <FormHelperText error>
          {Array.isArray(error) ? error.map(errorMessage => errorMessage?.message).join(', ') : error.message}
        </FormHelperText>
      )}
    </>
  );
};

export default FileUpload;

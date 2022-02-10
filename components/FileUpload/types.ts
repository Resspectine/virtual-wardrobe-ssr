import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { CreateGarmentValues } from '@/pageComponents/CreateGarment/types';

export interface FileUploadProps {
  register: UseFormRegister<CreateGarmentValues>;
  name: keyof CreateGarmentValues;
  file: File;
  setValue: UseFormSetValue<CreateGarmentValues>;
  disabled?: boolean;
  errors: FieldErrors<CreateGarmentValues>;
}

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

import { getFormFieldConfigurations } from './helpers';
import { useCreateGarment } from './hooks';
import { CreateGarmentForm, CreateGarmentSubmit, CreateGarmentTextField } from './styled';

import FileUpload from '@/components/FileUpload';
import Autocomplete from '@/components/TagAutocomplete';

const CreateGarment: FC = () => {
  const {
    tags,
    watch,
    errors,
    control,
    isValid,
    onSubmit,
    register,
    setValue,
    autocompleteValue,
    setAutocompleteValue,
  } = useCreateGarment();

  return (
    <Box>
      <Typography>Create garment</Typography>
      <CreateGarmentForm component="form" onSubmit={onSubmit}>
        {getFormFieldConfigurations(control).map((props, index) => (
          <CreateGarmentTextField {...props} key={index} />
        ))}
        {tags && <Autocomplete autocompleteOptions={tags} setValue={setAutocompleteValue} value={autocompleteValue} />}
        <FileUpload register={register} name="image" file={watch('image')[0]} setValue={setValue} errors={errors} />
        <CreateGarmentSubmit type="submit" variant="contained" color="primary" disabled={!isValid}>
          Submit
        </CreateGarmentSubmit>
      </CreateGarmentForm>
    </Box>
  );
};

export default CreateGarment;

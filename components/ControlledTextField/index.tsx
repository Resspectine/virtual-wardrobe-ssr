import TextField, { TextFieldProps } from '@mui/material/TextField';
import { SxProps, Theme } from '@mui/system';
import { ReactElement } from 'react';
import { UseControllerProps, useController, FieldValues } from 'react-hook-form';

export interface ControlledTextField<T> {
  textFieldProps: TextFieldProps;
  controlProps: UseControllerProps<T>;
  sx?: SxProps<Theme>;
  className?: string;
}

export interface ControlledTextFieldType {
  <T extends FieldValues>(props: ControlledTextField<T>): ReactElement | null;
}

const ControlledTextField: ControlledTextFieldType = ({ controlProps, textFieldProps, sx, className }) => {
  const { field, fieldState } = useController(controlProps);

  return (
    <TextField
      {...textFieldProps}
      {...field}
      sx={sx}
      className={className}
      error={!!fieldState.error}
      helperText={(fieldState.error as { message: string } | undefined)?.message}
    />
  );
};

export default ControlledTextField;

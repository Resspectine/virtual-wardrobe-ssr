import { Control } from 'react-hook-form';

import { CreateGarmentValues } from './types';

import { ControlledTextField } from 'components/ControlledTextField';

export const getFormFieldConfigurations = (
  control: Control<CreateGarmentValues>
): ControlledTextField<CreateGarmentValues>[] => [
  {
    controlProps: {
      control,
      name: 'title',
      rules: {
        required: 'Title is required',
      },
    },
    textFieldProps: {
      label: 'Title',
      variant: 'outlined',
      type: 'text',
    },
  },
  {
    controlProps: {
      control,
      name: 'description',
      rules: {
        required: 'Description is required',
      },
    },
    textFieldProps: {
      label: 'Description',
      variant: 'outlined',
      type: 'text',
    },
  },
  {
    controlProps: {
      control,
      name: 'price',
      rules: {
        required: 'Price is required',
      },
    },
    textFieldProps: {
      label: 'Price',
      variant: 'outlined',
      type: 'number',
    },
  },
];

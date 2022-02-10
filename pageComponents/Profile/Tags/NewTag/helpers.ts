import { Control } from 'react-hook-form';

import { NewTagValues } from '.';

import { ControlledTextField } from 'components/ControlledTextField';

export const getFormFieldConfigurations = (control: Control<NewTagValues>): ControlledTextField<NewTagValues>[] => [
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
      variant: 'standard',
      type: 'text',
    },
  },
];

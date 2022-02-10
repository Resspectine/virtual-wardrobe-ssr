import { Control, UseFormWatch } from 'react-hook-form';

import { RegisterValue } from './hooks';

import { ControlledTextField } from '@/components/ControlledTextField';

const validate = (firstValue: string, secondValue: string): string | boolean =>
  firstValue === secondValue ? true : 'Password and Confirm password should be equal';

export const getFormFieldConfigurations = (
  control: Control<RegisterValue>,
  watch: UseFormWatch<RegisterValue>
): ControlledTextField<RegisterValue>[] => [
  {
    controlProps: {
      control,
      name: 'name',
      rules: {
        required: 'Name is required',
      },
    },
    textFieldProps: {
      label: 'Name',
      variant: 'outlined',
      type: 'text',
    },
  },
  {
    controlProps: {
      control,
      name: 'email',
      rules: {
        required: 'Email is required',
      },
    },
    textFieldProps: {
      label: 'Email',
      variant: 'outlined',
      type: 'text',
    },
  },
  {
    controlProps: {
      control,
      name: 'password',
      rules: {
        required: 'Password is required',
      },
    },
    textFieldProps: {
      label: 'Password',
      variant: 'outlined',
      type: 'password',
    },
  },
  {
    controlProps: {
      control,
      name: 'confirmPassword',
      rules: {
        required: 'Confirm password is required',
        validate: () => validate(watch('password'), watch('confirmPassword')),
      },
    },
    textFieldProps: {
      label: 'Confirm password',
      variant: 'outlined',
      type: 'password',
    },
  },
];

import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

import TextField from '@/components/ControlledTextField';
import { render } from '@/testUtils';

describe('ControlledTextFieldSnap', () => {
  test('should match snapshot without error', async () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: {
          test: '',
        },
        mode: 'onChange',
      })
    );

    const { asFragment } = render(
      <TextField
        controlProps={{
          control: result.current.control,
          name: 'test',
          rules: {
            required: 'Test is required',
          },
        }}
        textFieldProps={{
          label: 'Test!',
          variant: 'outlined',
          type: 'text',
        }}
        className="test-className"
        sx={{
          width: 40,
        }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should match snapshot with entered value', async () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: {
          test: '',
        },
      })
    );

    const { asFragment, getByLabelText } = render(
      <TextField
        controlProps={{
          control: result.current.control,
          name: 'test',
        }}
        textFieldProps={{
          label: 'Test!',
          variant: 'outlined',
          type: 'text',
        }}
        className="test-className"
        sx={{
          width: 40,
        }}
      />
    );

    userEvent.type(getByLabelText('Test!'), 'hello');

    expect(asFragment()).toMatchSnapshot();
  });

  test('should match snapshot with error', async () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: {
          test: '',
        },
        mode: 'onChange',
      })
    );

    const { asFragment, getByLabelText, queryByText } = render(
      <TextField
        controlProps={{
          control: result.current.control,
          name: 'test',
          rules: {
            validate: value => (value === 'test' ? false : 'Value should be "test"'),
          },
        }}
        textFieldProps={{
          label: 'Test!',
          variant: 'outlined',
          type: 'text',
        }}
        className="test-className"
        sx={{
          width: 40,
        }}
      />
    );

    userEvent.type(getByLabelText('Test!'), 'hello');

    await waitFor(async () => {
      expect(await queryByText('Value should be "test"')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});

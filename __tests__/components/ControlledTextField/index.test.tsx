import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

import TextField from '@/components/ControlledTextField';
import { render } from '@/testUtils';

describe('ControlledTextField', () => {
  test('should change useForm value and display error message', async () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: {
          test: '',
        },
        mode: 'onChange',
      })
    );

    const { getByLabelText, queryByText } = render(
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
      />
    );

    userEvent.type(getByLabelText('Test!'), 'Hello');

    expect(result.current.watch('test')).toBe('Hello');

    (getByLabelText('Test!') as HTMLInputElement).setSelectionRange(0, 5);

    userEvent.type(getByLabelText('Test!'), '{backspace}');

    expect(result.current.watch('test')).toBe('');

    await waitFor(async () => {
      expect(await queryByText('Test is required')).toBeInTheDocument();
    });

    userEvent.type(getByLabelText('Test!'), 'Hello2');

    await waitFor(async () => {
      expect(await queryByText('Test is required')).not.toBeInTheDocument();
    });
  });
});

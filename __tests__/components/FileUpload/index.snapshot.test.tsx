import { act, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

import FileUpload from '@/components/FileUpload';
import { CreateGarmentValues } from '@/pageComponents/CreateGarment/types';
import { render } from '@/testUtils';

describe('FileUpload', () => {
  test('should show upload button', async () => {
    const { result } = renderHook(() =>
      useForm<CreateGarmentValues>({
        defaultValues: {
          image: [],
          title: '',
          description: '',
          price: '',
        },
        mode: 'onChange',
      })
    );

    const { asFragment } = render(
      <FileUpload
        errors={result.current.formState.errors}
        file={result.current.watch('image')[0]}
        name="image"
        register={result.current.register}
        setValue={result.current.setValue}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should show picture', async () => {
    const file = new File([], 'test');

    const { result } = renderHook(() =>
      useForm<CreateGarmentValues>({
        defaultValues: {
          image: [],
          title: '',
          description: '',
          price: '',
        },
        mode: 'onChange',
      })
    );

    const { asFragment, getByRole, rerender, findByAltText } = render(
      <FileUpload
        errors={result.current.formState.errors}
        file={result.current.watch('image')[0]}
        name="image"
        register={result.current.register}
        setValue={result.current.setValue}
      />
    );

    userEvent.upload(getByRole('button'), file);

    rerender(
      <FileUpload
        errors={result.current.formState.errors}
        file={result.current.watch('image')[0]}
        name="image"
        register={result.current.register}
        setValue={result.current.setValue}
      />
    );

    await waitFor(async () => expect(await findByAltText('Something went wrong')).toBeInTheDocument());

    expect(asFragment()).toMatchSnapshot();
  });

  test('should show error', async () => {
    const { result } = renderHook(() =>
      useForm<CreateGarmentValues>({
        defaultValues: {
          image: [],
          title: '',
          description: '',
          price: '',
        },
        mode: 'onChange',
      })
    );

    const { asFragment, rerender } = render(
      <FileUpload
        errors={result.current.formState.errors}
        file={result.current.watch('image')[0]}
        name="image"
        register={result.current.register}
        setValue={result.current.setValue}
      />
    );

    await act(async () => {
      await result.current.handleSubmit(() => {})();
    });

    rerender(
      <FileUpload
        errors={result.current.formState.errors}
        file={result.current.watch('image')[0]}
        name="image"
        register={result.current.register}
        setValue={result.current.setValue}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

import FileUpload from '@/components/FileUpload';
import { CreateGarmentValues } from '@/pageComponents/CreateGarment/types';
import { render } from '@/testUtils';

describe('FileUpload', () => {
  test('should show and the remove provided image', async () => {
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

    const { getByRole, findByAltText, rerender, getByTestId, queryByAltText } = render(
      <FileUpload
        errors={result.current.formState.errors}
        file={result.current.watch('image')[0]}
        name="image"
        register={result.current.register}
        setValue={result.current.setValue}
      />
    );

    const rerenderComponent = () => {
      rerender(
        <FileUpload
          errors={result.current.formState.errors}
          file={result.current.watch('image')[0]}
          name="image"
          register={result.current.register}
          setValue={result.current.setValue}
        />
      );
    };

    userEvent.upload(getByRole('button'), file);

    expect(result.current.watch('image')[0]).toBe(file);

    rerenderComponent();

    await waitFor(async () => expect(await findByAltText('Something went wrong')).toBeInTheDocument());

    userEvent.click(getByTestId('CloseIcon'));

    expect(result.current.watch('image')[0]).toBe(undefined);

    rerenderComponent();

    await waitFor(async () => expect(await queryByAltText('Something went wrong')).not.toBeInTheDocument());
  });
});

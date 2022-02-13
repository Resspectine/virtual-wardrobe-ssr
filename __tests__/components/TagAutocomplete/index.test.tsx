import { build, sequence } from '@jackfranklin/test-data-bot';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import TagAutocompleteComponent from '@/components/TagAutocomplete';
import { AnyTag } from '@/components/TagAutocomplete/types';
import { render } from '@/testUtils';
import { Tag } from '@/types/tag';

const tagBuilder = build<Tag>({
  fields: {
    id: sequence(),
    title: sequence(x => `Tag${x}`),
  },
});

const tag = tagBuilder();

const tags = [tag];

describe('TagAutocomplete', () => {
  test('should show tag, select existing tag, add new tag, delete tag', async () => {
    const { result } = renderHook(() => useState<AnyTag[]>([]));

    const { getByLabelText, getByText, rerender, getByTestId } = render(
      <TagAutocompleteComponent autocompleteOptions={tags} value={result.current[0]} setValue={result.current[1]} />
    );

    const rerenderAutocomplete = () =>
      rerender(
        <TagAutocompleteComponent autocompleteOptions={tags} value={result.current[0]} setValue={result.current[1]} />
      );

    userEvent.type(getByLabelText('Add tags'), 'ta');
    userEvent.click(getByText(tag.title));

    expect(result.current[0]).toStrictEqual(tags);

    rerenderAutocomplete();

    userEvent.type(getByLabelText('Add tags'), 'Tag3');
    userEvent.click(getByText('Add "Tag3"'));

    expect(result.current[0]).toStrictEqual([
      ...tags,
      {
        inputValue: 'Tag3',
        title: 'Add "Tag3"',
      },
    ]);

    rerenderAutocomplete();

    userEvent.type(getByLabelText('Add tags'), '{backspace}');

    expect(result.current[0]).toStrictEqual(tags);

    rerenderAutocomplete();

    userEvent.click(getByTestId('CancelIcon'));

    expect(result.current[0]).toStrictEqual([]);
  });
});

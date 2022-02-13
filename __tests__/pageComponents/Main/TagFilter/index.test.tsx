import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { tagBuilder } from '../../Profile/Tags/index.test';

import TagFilter from '@/pageComponents/Main/TagFilter';
import { render } from '@/testUtils';

const tags = [tagBuilder(), tagBuilder()];

describe('TagFilter', () => {
  test('should show and check tags', async () => {
    const { result } = renderHook(() => useState<string[]>([]));

    const { getByText, rerender, getByTestId } = render(
      <TagFilter setValue={result.current[1]} tags={tags} value={result.current[0]} />
    );

    const rerenderComponent = () =>
      rerender(<TagFilter setValue={result.current[1]} tags={tags} value={result.current[0]} />);

    userEvent.click(getByTestId('tag-filter'));
    userEvent.click(getByText(tags[0].title));
    expect(result.current[0]).toStrictEqual([tags[0].id]);

    rerenderComponent();

    userEvent.click(getByTestId('tag-filter'));
    userEvent.click(getByText(tags[1].title));
    expect(result.current[0]).toStrictEqual(tags.map(({ id }) => id));
  });
});

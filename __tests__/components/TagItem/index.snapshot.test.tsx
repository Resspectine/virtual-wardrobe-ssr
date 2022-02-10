import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import TagItem from '@/components/TagItem';

describe('TagItem', () => {
  test('should display tag title', () => {
    const { asFragment } = render(
      <TagItem
        tag={{
          id: 'id',
          title: 'Title',
        }}
      />
    );

    expect(asFragment).toMatchSnapshot();
  });

  test('should display delete button', () => {
    const { asFragment } = render(
      <TagItem
        tag={{
          id: 'id',
          title: 'Title',
        }}
        onDelete={() => () => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

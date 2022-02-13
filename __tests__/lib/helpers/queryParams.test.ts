import '@testing-library/jest-dom';
import { build, fake } from '@jackfranklin/test-data-bot';

import { createQueryParams } from '@/lib/helpers/queryParams';

const queryObjectBuilder = build({
  fields: {
    filter: fake(f => f.lorem.word(5)),
    amount: fake(f => f.lorem.word(5)),
    length: 0,
  },
});

describe('createQueryParams', () => {
  test('createQueryParams should work correctly', () => {
    const queryObject = queryObjectBuilder();

    expect(createQueryParams(queryObject).get('filter')).toStrictEqual(queryObject.filter);
    expect(createQueryParams(queryObject).get('amount')).toStrictEqual(queryObject.amount);
    expect(createQueryParams(queryObject).get('length')).toStrictEqual(null);
  });
});

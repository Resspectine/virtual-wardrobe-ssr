import '@testing-library/jest-dom';

import { getLocalId } from '@/lib/helpers/localId';

describe('getLocalId', () => {
  test('getLocalId should work correctly', () => {
    expect(getLocalId()).toStrictEqual(1);
    expect(getLocalId()).toStrictEqual(2);
    expect(getLocalId()).toStrictEqual(3);
  });
});

import '@testing-library/jest-dom';
import { camelToSentenceCase } from '@/lib/helpers/textTransformations';

describe('camelToSentenceCase', () => {
  test('camelToSentenceCase should work correctly', () => {
    expect(camelToSentenceCase('camelCase')).toEqual('Camel Case');

    expect(camelToSentenceCase('')).toEqual('');

    expect(camelToSentenceCase('camelCaseLongVeryLong')).toEqual('Camel Case Long Very Long');
  });
});

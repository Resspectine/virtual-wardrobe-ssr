import '@testing-library/jest-dom';

import { materialTheme } from '../../materialUiTheme';

describe('materialUiTheme', () => {
  test('should return correct theme', () => {
    expect(materialTheme('green').palette.text.secondary).toEqual('#388e3c');

    expect(materialTheme('red').palette.text.secondary).toEqual('#d32f2f');
  });
});

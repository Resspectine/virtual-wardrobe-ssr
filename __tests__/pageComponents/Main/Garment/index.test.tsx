import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GarmentComponent from '@/pageComponents/Main/Garment';
import { render } from '@/testUtils';

const onClick = jest.fn(() => {});
const toggleFavorite = jest.fn(() => {});
const onMouseDown = jest.fn(() => {});
const onMouseUp = jest.fn(() => {});

const addToFavorite = /add to favorite/i;
const removeFromFavorite = /remove from favorite/i;

describe('Garment', () => {
  test('should call all provided click handlers, call toggle favorite, show correct hover message', async () => {
    const { getByTestId, getByLabelText, queryByRole, rerender } = render(
      <GarmentComponent
        garment={{
          description: '',
          id: '',
          isFavorite: false,
          price: '',
          title: '',
          wearingAmount: 0,
          tags: [
            {
              id: '1',
              title: '',
            },
          ],
        }}
        onClick={onClick}
        toggleFavorite={toggleFavorite}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    );

    userEvent.click(getByTestId('garment'));

    expect(onClick).toBeCalledTimes(1);
    expect(onMouseDown).toBeCalledTimes(1);
    expect(onMouseUp).toBeCalledTimes(1);

    userEvent.click(getByLabelText(addToFavorite));

    expect(toggleFavorite).toBeCalledTimes(1);

    userEvent.hover(getByLabelText(addToFavorite));

    await waitFor(async () => {
      const tooltip = await queryByRole('tooltip');

      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent(addToFavorite);
    });

    userEvent.unhover(getByLabelText(addToFavorite));

    rerender(
      <GarmentComponent
        garment={{
          description: '',
          id: '',
          isFavorite: true,
          price: '',
          title: '',
          wearingAmount: 0,
          tags: [
            {
              id: '1',
              title: '',
            },
          ],
        }}
        onClick={onClick}
        toggleFavorite={toggleFavorite}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    );

    userEvent.hover(getByLabelText(removeFromFavorite));

    await waitFor(async () => {
      const tooltip = await queryByRole('tooltip');

      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent(removeFromFavorite);
    });

    userEvent.unhover(getByLabelText(removeFromFavorite));

    userEvent.click(getByLabelText(removeFromFavorite));

    expect(toggleFavorite).toBeCalledTimes(2);
  });
});

import GarmentComponent from '@/pageComponents/Main/Garment';
import { render } from '@/testUtils';

const cb = () => {};

describe('Garment', () => {
  test('should match snapshot not favorite state', async () => {
    const { asFragment } = render(
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
        onClick={cb}
        toggleFavorite={cb}
        onMouseDown={cb}
        onMouseUp={cb}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should match snapshot favorite state', async () => {
    const { asFragment } = render(
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
        onClick={cb}
        toggleFavorite={cb}
        onMouseDown={cb}
        onMouseUp={cb}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

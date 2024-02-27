// import React from 'react';
// import { fireEvent } from '@testing-library/react-native';
// import Players from '../players/players';
// import renderWithNavigation from './renderWithNavigation';

// describe('<Players />', () => {
//   test('renders the input field with placeholder', () => {
//     const { getByPlaceholderText } = renderWithNavigation(<Players />);
//     const input = getByPlaceholderText('Search by full-name');
//     expect(input).toBeTruthy();
//   });

//   test('updates searchQuery state when typing in the input field', () => {
//     const { getByPlaceholderText } = renderWithNavigation(<Players />);
//     const input = getByPlaceholderText('Search by full-name');

//     fireEvent.changeText(input, 'John Doe');
//     expect(input.props.value).toBe('John Doe');
//   });
// });
// PlayerDetails.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import PlayerDetails from '../PlayerDetails';

describe('PlayerDetails', () => {
  const player = {
    common_name: 'Player Name',
    position : {name:'Defender'},
    image_path: 'https://example.com/image.jpg',
    country: {
      data: {
        name: 'Country Name',
      },
    },
  };

  it('renders player details correctly', () => {
    const { getByText, getByTestId } = render(<PlayerDetails route={{ params: { player } }} />);

    expect(getByText('Player Name')).toBeTruthy();
    expect(getByText('Defender')).toBeTruthy();
    expect(getByText('Country Name')).toBeTruthy();
    const playerAvatar = getByTestId('player-avatar');
    expect(playerAvatar).toBeTruthy();
  });
});

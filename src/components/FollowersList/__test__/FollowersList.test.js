import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FollowersList from '../FollowersList';
import axios from 'axios';

const MockFollowersList = () => {
  return (
    <BrowserRouter>
      <FollowersList />
    </BrowserRouter>
  );
};

const mockResponse = {
  data: {
    results: [
      {
        name: {
          first: 'Laith',
          last: 'Harb',
        },
        picture: {
          large: 'https://randomuser.me/api/portraits/men/59.jpg',
        },
        login: {
          username: 'ThePhonyGOAT',
        },
      },
      {
        name: {
          first: 'Caíque',
          last: 'Coelho',
        },
        picture: {
          large: 'https://randomuser.me/api/portraits/men/59.jpg',
        },
        login: {
          username: 'Caicco',
        },
      },
    ],
  },
};

describe('FollowersList mock', () => {
  beforeEach(() => {
    // jest.mock('axios', () => ({
    //   __esModule: true,
    //   get: () => mockResponse,
    // }));

    // or
    jest.spyOn(axios, 'get').mockReturnValue(mockResponse);
  });

  it('should fetch and render follower items and get the first one', async () => {
    render(<MockFollowersList />);
    const followerDivElement = await screen.findByTestId(`follower-item-0`);
    expect(followerDivElement).toBeInTheDocument();
  });

  it('should fetch and render multiple followers items and make sure length is greater than 1', async () => {
    render(<MockFollowersList />);

    const followerDivElements = await screen.findAllByTestId(/follower-item/i);
    expect(followerDivElements.length).toBeGreaterThan(1);
  });
});

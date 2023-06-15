import React from 'react';
import {render, screen} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import Leaderboard from './Leaderboard';
import fakeRespWithUsers from '../../TestResponses/LeaderboardWithUsers.json';
import fakeRespNoUsers from '../../TestResponses/LeaderboardNoUsers.json';
import axios from 'axios';

jest.mock('axios');

describe('loads games properly', () => {
  beforeEach(async () => {
    axios.post.mockImplementation((url, data) => {
      return Promise.resolve(fakeRespWithUsers);
    });
    await act(async () => {
      render(<Leaderboard/>);
    });
  });

  test('Ensure users are loaded correctly', () => {
    const rows = screen.getAllByRole('row');
    expect(rows.length).toEqual(6); // +1 b/c of table header
    expect(axios.post.mock.calls).toHaveLength(1);
  });
});

describe('properly displays when no users', () => {
  beforeEach(async () => {
    axios.post.mockImplementation((url, data) => {
      return Promise.resolve(fakeRespNoUsers);
    });
    await act(async () => {
      render(<Leaderboard/>);
    });
  });
  test('properly displays when no users', () => {
    const rows = screen.getAllByRole('row');
    expect(rows.length).toEqual(1); // 1 b/c of table header
    expect(axios.post.mock.calls).toHaveLength(1);
  });
});

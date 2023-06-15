import React from 'react';
import {Provider} from 'react-redux';
import {login} from '../../Store/Slices/authSlice';
import {store} from '../../Store/store';
import {render, screen} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import History from './History';
import fakeResponseWithGame from '../../TestResponses/HistoryWithGame.json';
import fakeResponseNoGame from '../../TestResponses/HistoryNoGame.json';
import axios from 'axios';

jest.mock('axios');

describe('loads games properly', () => {
  beforeEach(async () => {
    axios.post.mockImplementation((url, data) => {
      return Promise.resolve(fakeResponseWithGame);
    });
    await act(async () => {
      store.dispatch(login({username: 'test', email: 'test@test.com'}));
      render(
          <Provider store={store}>
            <History/>
          </Provider>,
      );
    });
  });

  test('Ensure games are loaded correctly', () => {
    const rows = screen.getAllByRole('rowgroup');
    expect(rows.length).toEqual(2); // +1 b/c of table header
    expect(axios.post.mock.calls).toHaveLength(1);
  });
});

describe('properly displays when no games', () => {
  beforeEach(async () => {
    axios.post.mockImplementation((url, data) => {
      return Promise.resolve(fakeResponseNoGame);
    });
    await act(async () => {
      store.dispatch(login({username: 'test', email: 'test@test.com'}));
      render(
          <Provider store={store}>
            <History/>
          </Provider>,
      );
    });
  });
  test('properly displays when no games', () => {
    const noGames =
      screen.getByText('Play a game to see it here!');
    expect(noGames).toBeInTheDocument();
    expect(axios.post.mock.calls).toHaveLength(1);
  });
});

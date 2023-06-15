import React from 'react';
import {act} from 'react-dom/test-utils';
import {render, screen} from '@testing-library/react';
import {store} from '../../Store/store';
import Navigation from './Navigation';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {login} from '../../Store/Slices/authSlice';

describe('Test each link', () => {
  beforeEach(() => {
    render(
        <Provider store={store}>
          <BrowserRouter>
            <Navigation/>
          </BrowserRouter>
        </Provider>,
    );
  });
  test('for proper amt of unauthenticated links', () => {
    const links = screen.getAllByRole('link');
    for (let i = 0; i < links.length; i++) {
      links[i] = links[i].href;
    }
    expect(links).toEqual(expect.arrayContaining([
      'http://localhost/',
      'http://localhost/login',
      'http://localhost/signup',
      'http://localhost/spectate',
      'http://localhost/leaderboard',
      'http://localhost/rules',
    ]));
  });
  test('for proper amt of authenticated links', () => {
    // Dispatch authentication info
    act(() => {
      store.dispatch(login({username: 'test', email: 'test@test.com'}));
    });
    const links = screen.getAllByRole('link');
    for (let i = 0; i < links.length; i++) {
      links[i] = links[i].href;
    }
    expect(links.length).toEqual(7);
    expect(links).toEqual(expect.arrayContaining([
      'http://localhost/',
      'http://localhost/chess',
      'http://localhost/profile',
      'http://localhost/history',
      'http://localhost/spectate',
      'http://localhost/leaderboard',
      'http://localhost/rules',
    ]));
  });
});

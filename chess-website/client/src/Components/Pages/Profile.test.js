import React from 'react';
import {render, screen} from '@testing-library/react';
import {login} from '../../Store/Slices/authSlice';
import {store} from '../../Store/store';
import {Provider} from 'react-redux';
import {act} from 'react-dom/test-utils';
import Profile from './Profile';
import ProfileResponse from '../../TestResponses/Profile.json';
import axios from 'axios';

jest.mock('axios');

describe('info is shown correctly', () => {
  beforeEach(async () => {
    axios.post.mockImplementation((url, data) => {
      return Promise.resolve(ProfileResponse);
    });
    await act(async () => {
      store.dispatch(login({username: 'test', email: 'test@test.com'}));
      render(
          <Provider store={store}>
            <Profile/>
          </Provider>,
      );
    });
  });
  test('ELO', () => {
    const ELOText = screen.getByText(/^\bELO: .{1,}$/);
    expect(ELOText).toBeInTheDocument();
  });
  test('UID', () => {
    const IDText = screen.getByText(/^\bUser ID: .{1,}$/);
    expect(IDText).toBeInTheDocument();
  });
  test('Email', () => {
    const email = screen.getByText(/^\bEmail: .{1,}$/);
    expect(email).toBeInTheDocument();
  });
  test.todo('Win streak');
  test.todo('Total wins');
});

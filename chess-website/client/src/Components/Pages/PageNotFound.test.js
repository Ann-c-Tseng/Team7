import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import PageNotFound from './PageNotFound';

test('if home button is rendered', () => {
  render(
      <BrowserRouter>
        <PageNotFound/>
      </BrowserRouter>,
  );
  expect(screen.getByRole('link')).toBeInTheDocument();
});

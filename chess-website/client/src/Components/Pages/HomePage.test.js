import React from 'react';
import {render, screen} from '@testing-library/react';
import HomePage from './HomePage';

describe('Home page', () => {
  beforeEach(() => {
    render(<HomePage/>);
  });
  test('Title renders', () => {
    const element = screen.getByText('Welcome to Chess Master!');
    expect(element).toBeInTheDocument();
  });
  test('Interactive chessboard works', () => {
    const squareElements = screen.getByTestId('chessboard');
    expect(squareElements).toBeInTheDocument();
  });
  test('Paragraphs render', () => {
    const p1 =
    screen.getByText('To play, first create a profile.', {exact: false});
    expect(p1).toBeInTheDocument();

    const p2 =
    screen.getByText('check out your history to see the games', {exact: false});
    expect(p2).toBeInTheDocument();
  });
  // To do: Test footer, nav bar
});

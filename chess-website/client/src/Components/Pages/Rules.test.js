import React from 'react';
import Rules from './Rules';
import {render, screen} from '@testing-library/react';

describe('render the rules', () => {
  beforeEach(() => {
    render(<Rules/>);
  });
  test('paragraphs', () => {
    const setup = screen.getByText('Setup & Board');
    const movement = screen.getByText('Movement & Capturing');
    const checkmate = screen.getByText('Check & Checkmate');
    const special = screen.getByText('Special Rules');
    const ending = screen.getByText('Game Ending');
    expect(setup).toBeInTheDocument();
    expect(movement).toBeInTheDocument();
    expect(checkmate).toBeInTheDocument();
    expect(special).toBeInTheDocument();
    expect(ending).toBeInTheDocument();
  });
  test('setup & board figures', () => {
    const rows = screen.getAllByRole('row');
    const board = screen.getByTestId('chessboard');
    expect(rows.length).toEqual(7);
    expect(board).toBeInTheDocument();
  });
});

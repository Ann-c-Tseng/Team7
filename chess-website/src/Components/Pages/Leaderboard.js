import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function createData(name, wins) {
  return { name, wins };
}

const rows = [];
for (var i = 0; i < 10; i++) {
  rows.push(createData('Player', 0));
}

const handleClick = (e) => {
  console.log(e.target);
}

export default function App() {
  return (
    <div className='board'>
      <h1 className='leaderboard'>Chess Leaderboard</h1>
      <div className='duration'>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={handleClick} data-id='7'>7 Days</Button>
          <Button onClick={handleClick} data-id='30'>30 Days</Button>
          <Button onClick={handleClick} data-id='0'>All Time</Button>
        </ButtonGroup>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Chess Leaderboard">
          <TableHead>
            <TableRow>
              <TableCell align="center">Player</TableCell>
              <TableCell align="center">Wins</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.wins}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

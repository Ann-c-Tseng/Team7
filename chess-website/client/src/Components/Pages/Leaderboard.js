import React, {useState, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import {Typography} from '@mui/material';
import axios from 'axios';

import './Table.css';
import './Leaderboard.css';


const textColor = '#fefefedf';
const bodyTypographyStyling = {
  color: textColor,
};
/**
 * The leaderboard, displaying the users with the top elo.
 * @component
 * @return {component}
 */
function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.post('/leaderboard').then((response) => {
      if (response) {
        for (const user of response.data) {
          delete user._id;
          delete user.fullName;
          delete user.email;
          delete user.password;
          delete user.date;
        }
        setUsers(response.data);
      }
    });
  }, []);

  users.sort((a, b) => {
    if (a.elo === b.elo) {
      return b.elo - a.elo;
    } else {
      return b.elo - a.elo;
    }
  });

  return (
    <div className="LeaderBoardContainer">
      <Typography
        variant="h3"
        sx={bodyTypographyStyling}
      >Leaderboard
      </Typography>
      <Table data={users}/>
    </div>
  );
}

const Row = (props) => {
  const {rank, player, rating} = props;
  return (
    <tr>
      <td>{rank}</td>
      <td>{player}</td>
      <td className='table-right'>{rating}</td>
    </tr>
  );
};

Row.propTypes = {
  rank: PropTypes.string,
  player: PropTypes.string,
  rating: PropTypes.number,
};

const Table = (props) => {
  const rank = '#';
  const {data} = props;
  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th className='table-right'>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, i) =>
            <Row
              rank={rank+(i+1)}
              player={row.username}
              rating={row.elo}
              key={i}
            />,
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.exact({
    username: PropTypes.string,
    elo: PropTypes.number,
  })),
};

export default Leaderboard;

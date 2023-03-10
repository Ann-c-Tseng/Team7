import React, { useState, useEffect } from 'react';
import {Typography} from "@mui/material";
import axios from 'axios';

import './Table.css';
import "./Leaderboard.css";


const textColor = "#fefefedf"
const bodyTypographyStyling = {
    color: textColor,
}

function Leaderboard() {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    axios.post('http://54.69.36.110/leaderboard').then(response => {
      if (response) {
        setUsers(response.data);
      }
    })
  }, []);

  users.sort((a, b) => {
    if (a.elo === b.elo) {
      return b.elo - a.elo;
    } else {
      return b.elo - a.elo;
    }
  })

  return (
    <div className="LeaderBoardContainer">
      <Typography variant="h3" sx={bodyTypographyStyling}>Leaderboard</Typography>
      <Table data={users}/>
    </div>
  )
}

const Row = (props) => {
  const { rank, player, rating } = props;
  return (
    <tr>
      <td>{rank}</td>
      <td>{player}</td>
      <td className='table-right'>{rating}</td>
    </tr>
  )
}

const Table = (props) => {
  let rank = "#";
  const { data } = props;
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
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Table.css';

function Leaderboard() {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:4000/leaderboard').then(response => {
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
    <div>
      <h1 className='title'>Leaderboard</h1>
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

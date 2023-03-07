import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css'
import Users from '../Users/Users';

function Leaderboard() {

  let [users, setUsers] = useState();

  // useEffect(async () => {
  //   async function fetchUsers() {
  //     try {
  //       axios.post('http://localhost:4000/leaderboard').then(response => {
  //         console.log(response);
  //         if (response) {
  //           setUsers(response.data);
  //         }
  //       })
  //     } catch (error) {
  //       console.error(error.response.data);
  //     }
  //   }
  //   fetchUsers();
  // }, []);

  useEffect(() => {
    axios.post('http://localhost:4000/leaderboard').then(response => {
        if (response) {
            setUsers(response.data);
        }
    })
});

  // users.sort((a, b) => {
  //   if (a.elo === b.elo) {
  //     return b.elo - a.elo;
  //   } else {
  //     return b.elo - a.elo;
  //   }
  // })

  return (
    <div className="board">
      <h1 className="leaderboard">Leaderboard</h1>
      <Users UserData={users}></Users>
    </div>
  )
}

const UserData = [
  {
    name: "Player",
    clan: "India",
    elo: 1550,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    dt: "2023-02-01"
  },
  {
    name: "Player",
    clan: "USA",
    elo: 2310,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    dt: "2021-01-01"
  },
  {
    name: "Player",
    clan: "China",
    elo: 350,
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    dt: "2021-08-17"
  },
  {
    name: "Player",
    clan: "Japan",
    elo: 2100,
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    dt: "2021-10-23"
  },
  {
    name: "Player",
    clan: "London",
    elo: 1250,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    dt: "2022-01-22"
  },
  {
    name: "Player",
    clan: "Canada",
    elo: 5250,
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    dt: "2022-01-21"
  }
]

export default Leaderboard;

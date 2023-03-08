import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './Table.css';

const Row = (props) => {
    const { duration, white, black, result, moves, date } = props;
    return (
        <tr>
            <td>{duration}</td>
            <td>{white}</td>
            <td>{black}</td>
            <td>{result}</td>
            <td>{moves}</td>
            <td>{date}</td>
        </tr>
    )
}

const Table = (props) => {
    const username = props.username;
    const { data } = props;
    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>White</th>
                        <th>Black</th>
                        <th>Result</th>
                        <th>Moves</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row, i) =>
                        <Row duration={row.duration}
                            white={row.white}
                            black={row.black}
                            result={row.winner === username ? 'win' : 'loss'}
                            moves={row.numMoves}
                            date={row.date}
                            key={i} />
                    )}
                </tbody>
            </table>
        </div>
    )
}

const History = () => {
    let [rows, setRows] = useState([]);
    const user = useSelector((state) => state.auth.user.username)

    useEffect(() => {
        axios.post('http://localhost:4000/history', { username: user }).then(response => {
            if (response) {
                setRows(response.data);
            }
        })
    }, [user]);

    if (rows.length !== 0) {
        return (
            <div>
                <h1>Your Game History</h1>
                <Table data={rows} username={user} />
            </div>
        )
    } else {
        return (
            <h1>Play a game to see it here!</h1>
        )
    }
}

export default History;
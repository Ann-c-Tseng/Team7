import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './History.css'
import axios from 'axios';

// const matches = [
//     { duration: "5:03", opponent: "Dan", result: "win", moves: 24, date: "02-23-2023" },
//     { duration: "5:03", opponent: "Dan", result: "win", moves: 24, date: "02-23-2023" },
//     { duration: "5:03", opponent: "Dan", result: "win", moves: 24, date: "02-23-2023" },
//     { duration: "5:03", opponent: "Dan", result: "win", moves: 24, date: "02-23-2023" }
// ]

const Row = (props) => {
    const { duration, opponent, result, moves, date } = props;
    return (<tr>
        <td>{duration}</td>
        <td>{opponent}</td>
        <td>{result}</td>
        <td>{moves}</td>
        <td>{date}</td>
    </tr>)
}

const Table = (props) => {
    const { data } = props;
    return (<table>
        <thead>
            <tr className='header'>
                <th></th>
                <th>Opponent</th>
                <th>Result</th>
                <th>Moves</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {data?.map(row =>
                <Row duration={row.duration}
                    opponent={row.opponent}
                    result={row.result}
                    moves={row.moves}
                    date={row.date} />
            )}
        </tbody>
    </table>)
}

const History = () => {
    let [rows, setRows] = useState();
    const user = useSelector((state) => state.auth.user.username)

    useEffect(() => {axios.post('http://localhost:4000/history', user).then(response => {
        console.log(response);
        if (response) {
            setRows(response.data);
        }
    })}, [user]);

    console.log(user);

    return (
        <div className='history'>
            <h1 className='title'>Your Game History</h1>
            <Table data={rows} />
        </div>
    )
}

export default History;
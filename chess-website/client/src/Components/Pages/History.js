import React from 'react';
import { useState } from 'react';
import './History.css'

const matches = [
    {duration: "5:03", opponent: "Dan", result: "win", moves: 24, date: "02-23-2023"},
    {duration: "5:03", opponent: "Dan", result: "win", moves: 24, date: "02-23-2023"},
    {duration: "5:03", opponent: "Dan", result: "win", moves: 24, date: "02-23-2023"},
    {duration: "5:03", opponent: "Dan", result: "win", moves: 24, date: "02-23-2023"}
]

const Row = (props) => {
    const {duration, opponent, result, moves, date} = props;
    return (<tr>
        <td>{duration}</td>
        <td>{opponent}</td>
        <td>{result}</td>
        <td>{moves}</td>
        <td>{date}</td>
    </tr>)
}

const Table = (props) => {
    const {data} = props;
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
            {data.map(row => 
                <Row duration={row.duration}
                     opponent={row.opponent}
                     result={row.result}
                     moves={row.moves}
                     date={row.date}/>
            )}
        </tbody>
    </table>)
}

export default function History() {
    const [rows] = useState(matches);

    return (
        <div className='history'>
            <h1 className='title'>Your Game History</h1>
            <Table data={rows}/>
        </div>
    )
}
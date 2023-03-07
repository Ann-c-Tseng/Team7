import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './History.css'
import axios from 'axios';

const Row = (props) => {
    const { duration, white, black, result, moves, date } = props;
    return (<tr>
        <td>{duration}</td>
        <td>{white}</td>
        <td>{black}</td>
        <td>{result}</td>
        <td>{moves}</td>
        <td>{date}</td>
    </tr>)
}

const Table = (props) => {
    const username = props.username;
    const { data } = props;
    return (<table>
        <thead>
            <tr className='header'>
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
    </table>)
}

const History = () => {
    let [rows, setRows] = useState();
    const user = useSelector((state) => state.auth.user.username)

    useEffect(() => {
        axios.post('http://localhost:4000/history', { username: user }).then(response => {
            if (response) {
                setRows(response.data);
            }
        })
    }, [user]);

    return (
        <div className='history'>
            <h1 className='title'>Your Game History</h1>
            <Table data={rows} username={user} />
        </div>
    )
}

export default History;
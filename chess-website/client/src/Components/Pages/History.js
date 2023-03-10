import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {Chessboard} from "react-chessboard";
import { Typography } from '@mui/material';

import './Table.css';
import "./History.css";
const textColor = "#fefefedf"
const bodyTypographyStyling = {
    color: textColor,
    textOverflow: "break-word"
}

const Row = (props) => {
    const { duration, white, black, result, moves, date, fen } = props;
    return (
        <tr>
            <td>{duration}</td>
            <td>{white}</td>
            <td>{black}</td>
            <td>{result}</td>
            <td>{moves}</td>
            <td>{date}</td>
            <td>
                <Chessboard
                    arePiecesDraggable={false}
                    boardWidth={220}
                    position={fen}
                />
            </td>
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
                        <th>Duration</th>
                        <th>White</th>
                        <th>Black</th>
                        <th>Winner</th>
                        <th>Moves</th>
                        <th>Date</th>
                        <th>Final Position</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row, i) =>
                        <Row duration={row.duration}
                            white={row.white}
                            black={row.black}
                            result={row.winner}
                            moves={row.moves}
                            date={row.date}
                            fen={row.fen}
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
                setRows(response.data.reverse());
            }
        })
    }, [user]);

    if (rows.length !== 0) {
        return (
            <div className="HistoryContainer">
                <Typography variant="h3" sx={bodyTypographyStyling}>Your Game History</Typography>
                <Table data={rows} username={user} />
            </div>
        )
    } else {
        return (
            <div className="HistoryContainer">
                <Typography variant="h3" sx={bodyTypographyStyling}>Play a game to see it here!</Typography>
            </div>
        )
    }
}

export default History;
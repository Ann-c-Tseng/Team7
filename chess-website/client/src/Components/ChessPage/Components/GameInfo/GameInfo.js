import React from 'react';
import { Box, Typography, Button } from "@mui/material";

import "./GameInfo.css";

//A view component (MVC)
class GameInfo extends React.Component {
    render() {
        // console.log(this.props.moves[0].white)
        return (
            <Box className="MainGameInfo">
                <Typography className="MoveText" variant="h4">Moves</Typography>

                <Box className="MoveList">
                    <strong><p className="DarkMove">
                        <span>#</span>
                        <span>White</span>
                        <span> | </span>
                        <span>Black</span>
                    </p></strong>
                    {
                        this.props.moves ?
                            this.props.moves.map((move) => {
                                return (
                                    <p className={move.number % 2 === 0 ? "DarkMove" : ""} key={move.number}>
                                        <span>{move.number}. </span>
                                        <span>{move.white}</span>
                                        <span> | </span>
                                        <span>{move.black}</span>
                                    </p>
                                )
                            }) : null
                    }
                </Box>
            </Box>
        )
    }
}

export default GameInfo;
import React from 'react';
import {Box, Typography, Button} from "@mui/material";

import "./GameInfo.css";

class GameInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            moves: [{number: 1, white: "e4", black: "e5"}, {number: 2, white: "Ng3", black: "Nc6"}] //This needs to be better
        }
    }
    

    render(){
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
                    {this.state.moves.map((move) => {
                        return (
                            <p  className={move.number % 2 === 0 ? "DarkMove" : ""}key={move.number}>
                                <span>{move.number}. </span>
                                <span>{move.white}</span>
                                <span> | </span>
                                <span>{move.black}</span>
                            </p>
                        )
                    })}
                </Box>
            </Box>
        )
    }
}

export default GameInfo;
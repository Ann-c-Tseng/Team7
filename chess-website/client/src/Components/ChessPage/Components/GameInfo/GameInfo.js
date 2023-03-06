import React from 'react';
import {Box, Typography, Button, IconButton, ButtonGroup} from "@mui/material";

import RepeatRounded from '@mui/icons-material/RepeatRounded'; //Flip board
import HandshakeIcon from '@mui/icons-material/Handshake'; //Draw request
import FlagIcon from '@mui/icons-material/Flag'; //Resign

import "./GameInfo.css";


class GameInfo extends React.Component{
    render(){
        return (
            <Box className="MainGameInfo">
                <Box className="Moves">
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
                                <p  className={move.number % 2 === 0 ? "DarkMove" : ""}key={move.number}>
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
                <Box className="GameActionButtons">
                    <ButtonGroup>
                        <IconButton size="large" title="Flip Board" onClick={this.props.flipBoard}><RepeatRounded /></IconButton>
                        <IconButton size="large" title="Request Draw" onClick={this.props.requestDraw}><HandshakeIcon /></IconButton>
                        <IconButton size="large" title="Resign" onClick={this.props.resign}><FlagIcon /></IconButton>
                    </ButtonGroup>
                </Box>
            </Box>
        )
    }
}

export default GameInfo;
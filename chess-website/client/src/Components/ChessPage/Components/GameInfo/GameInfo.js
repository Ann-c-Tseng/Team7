import React from 'react';
<<<<<<< HEAD
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
=======
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
                {
                    this.props.drawRequestPopup && 
                    <Box className="drawRequest popup">
                        <p>Opponent requested draw</p>
                    </Box>
                }
                    <ButtonGroup>
                        <IconButton size="large" title="Flip Board" onClick={this.props.flipBoardHandler}><RepeatRounded /></IconButton>
                        <IconButton size="large" title="Request Draw" onClick={this.props.requestDrawHandler}><HandshakeIcon /></IconButton>
                        <IconButton size="large" title="Resign" onClick={this.props.resignHandler}><FlagIcon /></IconButton>
                    </ButtonGroup>
>>>>>>> origin/main
                </Box>
            </Box>
        )
    }
}

export default GameInfo;
import React from 'react';
import {Box, Typography, IconButton, ButtonGroup} from "@mui/material";

import RepeatRounded from '@mui/icons-material/RepeatRounded'; //Flip board
import HandshakeIcon from '@mui/icons-material/Handshake'; //Draw request
import FlagIcon from '@mui/icons-material/Flag'; //Resign

import "./GameInfo.css";


class GameInfo extends React.Component{

    generateMoves(){
        const moves = this.props.moves;
        const formattedMoves = [];
        for (let i = 0; i < moves.length; i+=2){
            const moveNum = Math.floor(i/2)+1;
            formattedMoves.push(
                <p  className={moveNum % 2 === 0 ? "DarkMove" : ""}key={moveNum}>
                    <span>{moveNum}. </span>
                    <span>{moves[i]}</span>
                    <span> | </span>
                    <span>{i+1 < moves.length ? moves[i+1] : ""}</span>
                </p>
            )
        }
        return formattedMoves;
    }

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
                            this.generateMoves() : null
                        }
                    </Box>
                </Box>
                
                <Box className="GameActionButtons">
                {
                    this.props.drawRequestPopup && 
                    <Box className="drawRequest popup">
                        <p>{this.props.drawRequestColor ? this.props.drawRequestColor : "Opponent"} requested a draw</p>
                    </Box>
                }
                    <ButtonGroup>
                        <IconButton size="large" title="Flip Board" onClick={this.props.flipBoardHandler}><RepeatRounded /></IconButton>
                        {!(this.props.mode === "Spectator") ?
                        <>
                            <IconButton size="large" title="Request Draw" onClick={this.props.requestDrawHandler}><HandshakeIcon /></IconButton>
                            <IconButton size="large" title="Resign" onClick={this.props.resignHandler}><FlagIcon /></IconButton>
                        </> : null}
                    </ButtonGroup>
                </Box>
            </Box>
        )
    }
}

export default GameInfo;
import React from 'react';
import './ChessPage.css';
import GameInfo from "./Components/GameInfo/GameInfo.js";
import Timer from "./Components/Timer/Timer.js";
import UserCard from "./Components/UserCard/UserCard.js";
import ChessGame from "./Components/ChessGame/ChessGame.js";
import Box from "@mui/material/Box";

class ChessPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Box className="Chess">
                <aside className="Timers">
                    <Timer className="opponentTimer" time={10000}/>
                    <Timer className="userTimer" time={10000}/>
                </aside>
                <Box className="Game">
                    <ChessGame />
                </Box>
                <Box className="Opponent" />

                <GameInfo  className="Info"/>
                
                <UserCard className="UserCard"/>
            </Box>
        )
    }
}

export default ChessPage;
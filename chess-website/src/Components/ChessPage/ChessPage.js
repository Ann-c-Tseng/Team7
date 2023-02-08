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
                <ChessGame className="Game"/>
                <GameInfo  className="Info"/>
                <Timer className="Timer"/>
                <UserCard className="UserCard"/>
            </Box>
        )
    }
}

export default ChessPage;
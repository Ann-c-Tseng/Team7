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
                <aside className="TimerSidePanel">
                    <Timer className="OpponentTimer" time={610000}/>
                    <Timer className="UserTimer" time={610000}/>
                </aside>
                <Box className="GameUserContainter">
                    <UserCard className="UserCard"/>
                    <Box className="Game">
                        <ChessGame />
                    </Box>
                    <UserCard className="UserCard"/>
                </Box>
                
                <GameInfo  className="Info"/>
            </Box>
        )
    }
}

export default ChessPage;
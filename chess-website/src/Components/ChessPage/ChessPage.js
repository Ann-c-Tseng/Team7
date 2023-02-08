import React from 'react';
import GameInfo from "./Components/GameInfo/GameInfo.js";
import Timer from "./Components/Timer/Timer.js";
import UserCard from "./Components/UserCard/UserCard.js";
import ChessGame from "./Components/ChessGame/ChessGame.js";
import Box from "@mui/material/Box";
import './ChessPage.css';

class ChessPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Box className="ChessPage">
                <Box className="GameUserContainer">
                    <UserCard className="UserCard" username="Opponent"/>
                    <Box className="GameInfo">
                        <aside className="TimerSidePanel">
                            <Timer className="OpponentTimer" time={600000}/>
                            <Timer className="UserTimer" time={600000}/>
                        </aside>
                        <Box className="Game">
                            <ChessGame />
                        </Box>
                        <GameInfo  className="Info"/>
                    </Box>
                    
                    <UserCard className="UserCard" username="Myself"/>
                </Box>
                
            </Box>
        )
    }
}

export default ChessPage;
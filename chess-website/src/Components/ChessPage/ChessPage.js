import React from 'react';
import './ChessPage.css';
import GameInfo from "./Components/GameInfo/GameInfo.js";
import Timer from "./Components/Timer/Timer.js";
import UserCard from "./Components/UserCard/UserCard.js";
import ChessGame from "./Components/ChessGame/ChessGame.js";

class ChessPage extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <ChessGame />
        )
    }
}

export default ChessPage;
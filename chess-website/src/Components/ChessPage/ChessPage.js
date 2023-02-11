import React from 'react';
import GameInfo from "./Components/GameInfo/GameInfo.js";
import TimerView from "./Components/Timer/TimerView.js";
import Timer from "./Components/Timer/Timer.js";
import UserCard from "./Components/UserCard/UserCard.js";
import ChessGame from "./Components/ChessGame/ChessGame.js";
import { Chess } from "chess.js";
import Box from "@mui/material/Box";
import './ChessPage.css';


//The model (MVC)
class ChessPage extends React.Component{
    constructor(props){
        super(props);

        this.attemptMove = this.attemptMove.bind(this);
        this.timerUpdateCallback = this.timerUpdateCallback.bind(this);
        this.timerFinishCallback = this.timerFinishCallback.bind(this);

        this.state = {
            game: new Chess(),
            moveNum: 0,
            moves: [],
            turn: "w",
            timers: [
                new Timer("w", props.time || 10000, this.timerUpdateCallback, this.timerFinishCallback), 
                new Timer("b", props.time || 10000, this.timerUpdateCallback, this.timerFinishCallback)
            ],
        }
    }

    attemptMove(fromSquare, toSquare){
        const move = {
            from: fromSquare,
            to: toSquare,
            promotion: "q" //Always promote to queen (for now)
        };

        //TODO: Add check for time left
        const moveResult = this.state.game.move(move);
        this.setState({game: this.state.game});
        if (moveResult){
            this.successfulMove(moveResult);
            return true;
        }
        else{
            //Failed move
            return false;
        }
    }

    successfulMove(moveResult){
        //Checkmate?
        //Insufficient material?
        //Stalemate?
        //Threefold repetition?
        this.addMove(moveResult.san, moveResult.color);
        if (this.state.moveNum > 0){
            this.disableTimer(moveResult.color);
            this.enableTimer(this.getOpponentColor(moveResult.color));
        }


    }

    //If white, create new object and push it in with move info,
    //if black, just place move info
    addMove(move, color){
        if (color === "w"){
            this.setState({moves: [...this.state.moves, {
                number: this.state.moveNum+1,
                white: move,
                black: ""
            }]});
            this.setState({moveNum: this.state.moveNum+1});
        }
        else{
            if (this.state.moveNum === 0){
                console.warn("Black attempted to move first: " + move);
                return;
            }
            const lastMove = this.state.moveNum;
            this.state.moves[lastMove-1].black = move;
            this.setState({moves: this.state.moves});
        }
    }

    //Pass this to the timer objects, so that when they update,
    //they call this function to update this game state.
    timerUpdateCallback(){
        this.setState({timers: this.state.timers});
    }
    timerFinishCallback(){
        console.log("Finished!!!");
    }

    //Start a timer. Only allow a timer that is disabled to be enabled.
    enableTimer(color){
        let timer = this.getTimer(color);
        timer.enable();
    }
    disableTimer(color){
        let timer = this.getTimer(color);
        timer.disable();
    }

    getTimer(color){
        if (color == "w"){
            return this.state.timers[0];
        }
        else{
            return this.state.timers[1];
        }
    }

    getOpponentColor(color){
        return color === "w" ? "b" : "w";
    }

    render(){
        return (
            <Box className="ChessPage">
                <Box className="GameUserContainer">
                    <UserCard className="UserCard" username="Opponent"/>
                    <Box className="GameInfo">
                        <aside className="TimerSidePanel">
                            <TimerView className="OpponentTimer" color={this.state.timers[1].color} time={this.state.timers[1].time} enabled={this.state.timers[1].enabled}/>
                            <TimerView className="UserTimer" color={this.state.timers[0].color} time={this.state.timers[0].time} enabled={this.state.timers[0].enabled}/>
                        </aside>
                        <Box className="Game">
                            <ChessGame
                                moveHandler={this.attemptMove}
                                gameState={this.state.game.fen()}
                            />
                        </Box>
                        <GameInfo moves={this.state.moves} className="Info"/>
                    </Box>
                    
                    <UserCard className="UserCard" username="Myself"/>
                </Box>
                
            </Box>
        )
    }
}

export default ChessPage;
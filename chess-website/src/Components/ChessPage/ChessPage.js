import React from 'react';
import GameInfo from "./Components/GameInfo/GameInfo.js";
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
        
        this.state = {
            game: new Chess(),
            moveNum: 0,
            moves: [],
            turn: "w",
            timers: [
            {   
                color: "w",
                intervalId: null, //Keep track of the intervalId (if enabled)
                enabled: false,
                time: props.time || 600000, //How long the timer is in milliseconds
            },
            {   
                color: "b",
                intervalId: null, //Keep track of the intervalId (if enabled)
                enabled: false,
                time: props.time || 600000, //How long the timer is in milliseconds
            }],
        }
    }
    componentDidMount(){
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
    
    attemptMove(fromSquare, toSquare){
        const move = {
            from: fromSquare,
            to: toSquare,
            promotion: "q" //Always promote to queen (for now)
        };

        const moveResult = this.state.game.move(move);
        this.setState({game: this.state.game});
        if (moveResult){
            this.addMove(moveResult.san, moveResult.color);
            //TODO: Clean this up
            if (this.state.moveNum > 0){
                this.disableTimer(moveResult.color);
                this.enableTimer(this.getOpponentColor(moveResult.color));
            }
            return true;
        }
        else{
            return false;
        }
    }

    //Start a timer. Only allow a timer that is disabled to be enabled.
    enableTimer(color){
        let timer = this.getTimer(color);
        if (timer.enabled){
            return;
        }

        let start = Date.now()
        timer.enabled = true;
        timer.intervalId = setInterval(() => {
            const now = Date.now()
            const diff = now - start;
            timer.time -= diff;
            start = now;

            this.setState({timers: this.state.timers});
        }, 100);
    }

    disableTimer(color){
        let timer = this.getTimer(color);
        clearInterval(timer.intervalId);
        timer.enabled = false;
        this.setState({timers: this.state.timers});
    }

    hasTimeLeft(color){
        let timer = this.getTimer(color);
        return timer.time > 0;
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
                            <Timer className="OpponentTimer" time={this.state.timers[1].time}/>
                            <Timer className="UserTimer" time={this.state.timers[0].time}/>
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
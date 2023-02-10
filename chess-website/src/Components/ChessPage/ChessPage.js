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

        this.state = {
            game: new Chess(),
            moveNum: 0,
            moves: [],
            turn: "w"
        }
        this.attemptMove = this.attemptMove.bind(this);
        
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
            return true;
        }
        else{
            return false;
        }
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
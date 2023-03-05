import React from 'react';
import GameInfo from "./Components/GameInfo/GameInfo.js";
import TimerView from "./Components/Timer/TimerView.js";
import Timer from "./Components/Timer/Timer.js";
import UserCard from "./Components/UserCard/UserCard.js";
import ChessGame from "./Components/ChessGame/ChessGame.js";
import { Chess } from "chess.js";
import Box from "@mui/material/Box";
import './ChessPage.css';
import {connect} from "react-redux";
import io from "socket.io-client";



class ChessPage extends React.Component{
    constructor(props){
        super(props);

        this.userMove = this.userMove.bind(this);
        this.timerUpdateCallback = this.timerUpdateCallback.bind(this);
        this.timerFinishCallback = this.timerFinishCallback.bind(this);

        const whiteTimer = new Timer("w", props.time || 600000, this.timerUpdateCallback, this.timerFinishCallback);
        const blackTimer = new Timer("b", props.time || 600000, this.timerUpdateCallback, this.timerFinishCallback);
        
        let userColor = props.userColor || "w";

        this.state = {
            game: new Chess(),
            gameOver: false,
            moveNum: 0,
            moves: [],

            turn: "w",
            user: userColor,
            opponent: null,

            timers: [blackTimer, whiteTimer],
            topTimer: null,
            bottomTimer: null,

            orientation: props.userColor || "w", //orientation should be separate from user, though they start with the same value
        }

        this.state.topTimer = this.getTimer(this.getOpponentColor(userColor));
        this.state.bottomTimer = this.getTimer(userColor);
        this.state.opponent = this.getOpponentColor(this.state.user);

        this.socket = null;

    }

    componentDidMount(){

        //Begin the match making!
        //Establish a socket connection with the server
        try{
            const socket = io("http://localhost:4000");

            this.socket = socket;
            this.socket.on('initialize', (data) => {
                this.setState({
                    user: data.color,
                    opponent: this.getOpponentColor(data.color),
                })
                if (data.color === "b"){
                    this.flipBoard();
                }
            });

            this.socket.on('opponentMove', (move) => {
                console.log("Received opponent move");
                this.opponentMove(move.from, move.to, move.promotion);
            });
            
            this.socket.on('invalid', (data) => {
                console.log(data.message);   
            })
        }
        catch(err){
            console.log(err);
        }
        //For singleplayer testing
        //this.startRandomMoveComp();
    }

    //TEMPORARY FOR RANDOM MOVE COMPUTER (move to server?)
    startRandomMoveComp(){
        setInterval(() => {
            if (!this.opponentsTurn() || this.state.game.isGameOver()){
                return;
            }

            let moves = this.state.game.moves({verbose: true});
            let move = moves[Math.floor(Math.random() * moves.length)];
            this.opponentMove(move.from, move.to);
        }, 4000)
    }

    userMove(fromSquare, toSquare, promotion){
        if (this.state.gameOver || !this.usersTurn()){
            return false;
        }
        this.attemptMove(fromSquare, toSquare, 'q');
    }
    opponentMove(fromSquare, toSquare, promotion){
        if (this.state.gameOver || !this.opponentsTurn()){
            return false;
        }
        this.attemptMove(fromSquare, toSquare, promotion);
    }

    attemptMove(fromSquare, toSquare, promotion){
        const move = {
            from: fromSquare,
            to: toSquare,
            promotion: promotion //Always promote to queen (for now)
        };

        let moveResult;
        try{
            moveResult = this.state.game.move(move);
            
        } catch(e){
            //Throws error if invalid move attempt
            //Notify the player?
        }

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
        
        //Only send move to server if it's this user's move
        if (moveResult.color === this.state.user){
            this.socket.emit('move', {
                from: moveResult.from,
                to: moveResult.to,
                promotion: moveResult?.promotion
            });
        }
        

        this.switchTurn();
        this.addMove(moveResult.san, moveResult.color);
        this.handleTimers(moveResult.color);

        this.checkGameOver();
    }

    opponentsTurn(){
        return this.state.turn === this.state.opponent;
    }
    usersTurn(){
        return this.state.turn === this.state.user;
    }
    switchTurn(){
        this.setState({turn: this.getOpponentColor(this.state.turn)});
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

    //Checks if the game is over. Calls gameOver with the reason if it is.
    checkGameOver(){
        if (this.state.game.isCheckmate()){
            let winner = this.getOpponentColor(this.state.game.turn());
            winner = (winner === "w" ? "White" : "Black");
            this.gameOver(winner + " has won", "Checkmate");
        }
        else if (this.state.game.isStalemate()){
            this.gameOver("Draw", "Stalemate");
        }
        else if (this.state.game.isThreefoldRepetition()){
            this.gameOver("Draw", "Threefold Repetition");
        }
        else if (this.state.game.isInsufficientMaterial()){
            this.gameOver("Draw", "Insufficient Material");
        }
        else if (this.state.game.isDraw()){
            this.gameOver("Draw", "50-move rule");
        }
        
    }

    gameOver(result, reason){
        this.disableTimer("w");
        this.disableTimer("b");
        this.setState({gameOver: true});
        console.log("Game over. " + result + " by " + reason);
    }
    
    //Pass these to the timer objects, so that when they update,
    //they call these functions to update this game's state.
    timerUpdateCallback(){
        this.setState({timers: this.state.timers});
    }
    timerFinishCallback(color){
        let winner = this.getOpponentColor(this.state.game.turn());
        winner = (winner === "w" ? "White" : "Black");
        this.gameOver(winner + " has won", "Timeout");
    }

    //Color is of the user who just made a move
    handleTimers(color){
        //Don't start the timers on the first move of the game, for fairness.
        if (this.state.moveNum === 0 && color === "w"){
            //Do nothing
        }
        else{
            this.toggleTimers(color);
        }
    }

    beginTimers(){
        this.enableTimer("b");
    }
    toggleTimers(color){
        this.disableTimer(color);
        this.enableTimer(this.getOpponentColor(color));
    }

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
            return this.state.timers[1];
        }
        else if (color == "b"){
            return this.state.timers[0];
        }
    }

    getOpponentColor(color){
        return color === "w" ? "b" : "w";
    }

    flipBoard(){
        this.setState({
            topTimer: this.state.bottomTimer,
            bottomTimer: this.state.topTimer,
            orientation: this.getOpponentColor(this.state.orientation),
        });
    }

    render(){
        return (
            <Box className="ChessPage">
                <Box className="GameUserContainer">
                    <UserCard className="UserCard" username="Opponent"/>
                    <Box className="GameInfo">
                        <aside className="TimerSidePanel">
                            <TimerView 
                                className="TopTimer"
                                color={this.state.topTimer.color}
                                time={this.state.topTimer.time}
                                enabled={this.state.topTimer.enabled}
                            />
                            <TimerView 
                                className="BottomTimer"
                                color={this.state.bottomTimer.color}
                                time={this.state.bottomTimer.time}
                                enabled={this.state.bottomTimer.enabled}
                            />
                        </aside>
                        <Box className="Game">
                            <ChessGame
                                moveHandler={this.userMove}
                                gameState={this.state.game.fen()}
                                boardOrientation={this.state.orientation}
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

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}


export default connect(mapStateToProps)(ChessPage);
import React from 'react';
import GameInfo from "./Components/GameInfo/GameInfo.js";
import TimerView from "./Components/Timer/TimerView.js";
import Timer from "./Components/Timer/Timer.js";
import UserCard from "./Components/UserCard/UserCard.js";
import ChessGame from "./Components/ChessGame/ChessGame.js";
import PromotionSelect from './Components/PromotionSelect/PromotionSelect.js';
import ResultPopup from './Components/ResultPopup/ResultPopup.js';
import { Chess } from "chess.js";
import Box from "@mui/material/Box";
import axios from 'axios';
import './ChessPage.css';
import {connect} from "react-redux";
import io from "socket.io-client";



class ChessPage extends React.Component{
    constructor(props){
        super(props);

        this.userMove = this.userMove.bind(this);
        this.timerUpdateCallback = this.timerUpdateCallback.bind(this);
        this.timerFinishCallback = this.timerFinishCallback.bind(this);
        
        this.changePromotionSelection = this.changePromotionSelection.bind(this);
        this.flipBoard = this.flipBoard.bind(this);
        this.requestDraw = this.requestDraw.bind(this);
        this.resign = this.resign.bind(this);
        this.notificationAccept = this.notificationAccept.bind(this);

        const whiteTimer = new Timer("w", this.timerUpdateCallback, this.timerFinishCallback);
        const blackTimer = new Timer("b", this.timerUpdateCallback, this.timerFinishCallback);
        
        let userColor = props.userColor || "w";

        this.state = {
            game: new Chess(),
            gameOver: false,
            moveNum: 0,
            moves: [],

            turn: "w",
            promoting: true,
            promotionChoice: 'q',
            user: userColor,
            opponent: null,
            drawRequest: false,

            timers: [blackTimer, whiteTimer],
            topTimer: null,
            bottomTimer: null,

            topUser: null,
            bottomUser: props.user,

            orientation: props.userColor || "w", //orientation should be separate from user, though they start with the same value

            notification: {
                active: false,
                title: "Default notification title",
                details: "Default details",
            }
        }

        this.state.opponent = this.getOpponentColor(this.state.user);

        this.state.topTimer = this.getTimer(this.getOpponentColor(userColor));
        this.state.bottomTimer = this.getTimer(userColor);

        this.socket = null;

    }

    componentDidMount(){

        //Begin the match making!
        //Establish a socket connection with the server
        try{
            const socket = io("http://localhost:4000", {query: {email: this.props.user.email}});

            this.socket = socket;
            this.socket.on('initialize', (data) => {
                this.state.timers.forEach((t) => t.time = data.time);

                this.setState({
                    game: new Chess(), 
                    user: data.color,
                    topUser: data.opponent,
                    drawRequest: false,
                    opponent: this.getOpponentColor(data.color),
                    timers: this.state.timers,
                    gameOver: false,
                    moveNum: 0,
                    moves: [],
                    turn: "w",
                    promoting: true,
                })
                if (data.color === "b"){
                    this.flipBoard();

                    this.setState({
                        topUser: data.opponent,
                        bottomUser: this.props.user
                    })

                }
            });

            this.socket.on('disconnect', (reason) => {
                console.log("Disconnected: " + reason)
            });
            this.socket.on('requestDraw', () => {
                console.log("Opponent requested a draw");
                this.setState({
                    drawRequest: true
                });
            });
            this.socket.on('drawConfirm', () => {
                this.gameOver("Draw", "Agreement");
                this.setState({
                    drawRequest: false
                });
            });
            this.socket.on('resign', () => {
                console.log("Opponent resigned");
                let winner = (this.state.user === "w" ? "White" : "Black");
                this.gameOver(winner + " has won", "Resignation");
            })

            this.socket.on('opponentMove', (data) => {
                console.log("Received opponent move");
                this.opponentMove(data.move.from, data.move.to, data.move.promotion);

                this.syncTimers(data.timeLeft, data.oppTimeLeft, data.timeSent);
            });
            this.socket.on('updateTimer', (data) => {
                this.syncTimers(data.timeLeft, data.oppTimeLeft, data.timeSent);
            });
            this.socket.on('gameOver', (data) => {
                this.setState({gameOver: true});
                this.gameOver(data.result, data.reason);
            })
            
            this.socket.on('invalid', (data) => {
                console.log(data.message);   
            })
        }
        catch(err){
            console.err("Connection error");
        }
        //For singleplayer testing
        //this.startRandomMoveComp();
    }

    //TEMPORARY FOR RANDOM MOVE COMPUTER (move to server?)
    startRandomMoveComp(){
        setInterval(() => {
            if (!this.opponentsTurn() || this.state.game.isGameOver()) {
                return;
            }

            let moves = this.state.game.moves({ verbose: true });
            let move = moves[Math.floor(Math.random() * moves.length)];
            this.opponentMove(move.from, move.to);
        }, 4000)
    }

    userMove(fromSquare, toSquare){

        if (this.state.gameOver || !this.usersTurn()){
            return false;
        }
        this.attemptMove(fromSquare, toSquare, this.state.promotionChoice);
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
        try {
            moveResult = this.state.game.move(move);

        } catch (e) {
            //Throws error if invalid move attempt
            //Notify the player?
        }

        this.setState({game: this.state.game});
        if (moveResult){
            this.successfulMove(moveResult);
            return true;
        }
        else {
            //Failed move
            return false;
        }
    }

    successfulMove(moveResult){
        this.setState({
            drawRequest: false
        })

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

    opponentsTurn() {
        return this.state.turn === this.state.opponent;
    }
    usersTurn() {
        return this.state.turn === this.state.user;
    }
    switchTurn() {
        this.setState({ turn: this.getOpponentColor(this.state.turn) });
    }

    //If white, create new object and push it in with move info,
    //if black, just place move info
    addMove(move, color) {
        if (color === "w") {
            this.setState({
                moves: [...this.state.moves, {
                    number: this.state.moveNum + 1,
                    white: move,
                    black: ""
                }]
            });
            this.setState({ moveNum: this.state.moveNum + 1 });
        }
        else {
            if (this.state.moveNum === 0) {
                console.warn("Black attempted to move first: " + move);
                return;
            }
            const lastMove = this.state.moveNum;
            this.state.moves[lastMove - 1].black = move;
            this.setState({ moves: this.state.moves });
        }
    }

    //Checks if the game is over. Calls gameOver with the reason if it is.
    checkGameOver() {
        if (this.state.game.isCheckmate()) {
            let winner = this.getOpponentColor(this.state.game.turn());
            winner = (winner === "w" ? "White" : "Black");
            this.gameOver(winner + " has won", "Checkmate");
        }
        else if (this.state.game.isStalemate()) {
            this.gameOver("Draw", "Stalemate");
        }
        else if (this.state.game.isThreefoldRepetition()) {
            this.gameOver("Draw", "Threefold Repetition");
        }
        else if (this.state.game.isInsufficientMaterial()) {
            this.gameOver("Draw", "Insufficient Material");
        }
        else if (this.state.game.isDraw()) {
            this.gameOver("Draw", "50-move rule");
        }

    }

    gameOver(result, reason) {
        this.disableTimer("w");
        this.disableTimer("b");
        console.log("Game over. " + result + " by " + reason);
        this.socket.emit('gameOver');
        this.setNotification("Game over!", result + " by " + reason)
        
    }

    //Pass these to the timer objects, so that when they update,
    //they call these functions to update this game's state.
    timerUpdateCallback() {
        this.setState({ timers: this.state.timers });
    }
    timerFinishCallback(color){
        
        //Might still want to do something here, for extra visual effects or something
        //let winner = this.getOpponentColor(this.state.game.turn());
        //winner = (winner === "w" ? "White" : "Black");
        //this.gameOver(winner + " has won", "Timeout");
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

    enableTimer(color) {
        let timer = this.getTimer(color);
        timer.enable();
    }
    disableTimer(color) {
        let timer = this.getTimer(color);
        timer.disable();
    }

    syncTimers(userTime, oppTime, timeSent){

        const latency = Date.now() - timeSent;
        const userTimer = this.getTimer(this.state.user);
        const oppTimer = this.getTimer(this.getOpponentColor(this.state.user));
        
        userTimer.time = userTime - latency;
        oppTimer.time = oppTime - latency;

        this.setState({
            timers: this.state.timers
        })
    }

    getTimer(color){
        if (color == "w"){
            return this.state.timers[1];
        }
        else if (color == "b"){
            return this.state.timers[0];
        }
    }

    getOpponentColor(color) {
        return color === "w" ? "b" : "w";
    }

    flipBoard() {
        this.setState({
            topTimer: this.state.bottomTimer,
            bottomTimer: this.state.topTimer,

            topUser: this.state.bottomUser,
            bottomUser: this.state.topUser,

            orientation: this.getOpponentColor(this.state.orientation),
        });
    }
    changePromotionSelection(choice){
        this.setState({
            promotionChoice: choice
        })
    }
    
    requestDraw(){
        if (this.state.gameOver){
            return;
        }
        this.socket.emit('requestDraw');
        //TODO add a confirm
        console.log("Requested draw");
    }

    resign(){
        if (this.state.gameOver){
            return;
        }
        this.socket.emit('resign');
        //TODO add a confirm
        console.log("Resigned");
        let winner = (this.state.user === "w" ? "Black" : "White");
        this.gameOver(winner + " has won", "Resignation");
    }

    setNotification(title, details){
        this.setState({
            notification: {
                active: true,
                title: title,
                details: details,
            }
        });
    }

    notificationAccept(){
        this.setState({
            notification: {
                active: false,
            }
        });
    }

    render() {
        return (
            <>
            <Box className="ChessPage">
                <Box className="GameUserContainer">
                    {
                        this.state.topUser ?
                        <UserCard className="UserCard"
                            username={this.state.topUser.username}
                            elo={this.state.topUser.elo}
                        />
                        :
                        <UserCard className="UserCard"
                            username="Searching for opponent..."
                            elo={null}
                        />
                    }
                    
                    <Box className="GameInfo">
                        <aside className="TimerSidePanel">
                            <TimerView
                                className="TopTimer"
                                color={this.state.topTimer.color}
                                time={this.state.topTimer.time}
                                enabled={this.state.topTimer.enabled}
                            />
                            { this.state.promoting ? <PromotionSelect changeHandler={this.changePromotionSelection} user={this.state.user}/> : null}
                            <TimerView 
                                className="BottomTimer"
                                color={this.state.bottomTimer.color}
                                time={this.state.bottomTimer.time}
                                enabled={this.state.bottomTimer.enabled}
                            />
                        </aside>
                        <Box className="Game">
                            <ResultPopup
                                active={this.state.notificationActive}
                                notification={this.state.notification}
                                acceptHandler={this.notificationAccept}
                            />
                            <ChessGame
                                moveHandler={this.userMove}
                                gameState={this.state.game.fen()}
                                boardOrientation={this.state.orientation}
                            />
                        </Box>
                        <GameInfo 
                            moves={this.state.moves}
                            className="Info"
                            flipBoardHandler={this.flipBoard}
                            requestDrawHandler={this.requestDraw}
                            resignHandler={this.resign}
                            drawRequestPopup={this.state.drawRequest}
                            />
                        
                    </Box>
                    {
                        this.state.bottomUser ?
                        <UserCard className="UserCard"
                            username={this.state.bottomUser.username}
                            elo={this.state.bottomUser.elo}
                        />
                        :
                        <UserCard className="UserCard"
                            username="Waiting on opponent..."
                            elo={null}
                        />
                    }
                </Box>
            </Box>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}


export default connect(mapStateToProps)(ChessPage);
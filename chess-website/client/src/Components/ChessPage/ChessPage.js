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
import './ChessPage.css';
import {connect} from "react-redux";
import io from "socket.io-client";

import commonSocketSignals from "./SocketFunctions/Common.js";
import spectatorSocketSignals from "./SocketFunctions/Spectating.js";
import playerSocketSignals from "./SocketFunctions/Playing.js";


class ChessPage extends React.Component{
    constructor(props){
        super(props);

        this.flipBoard = this.flipBoard.bind(this);
        this.notificationAccept = this.notificationAccept.bind(this);

        if (props?.spectating){
            this.matchId = window.location.pathname.split('/')[2];
        }
        else{
            this.changePromotionSelection = this.changePromotionSelection.bind(this);
            this.requestDraw = this.requestDraw.bind(this);
            this.resign = this.resign.bind(this);
        }

        this.userMove = this.userMove.bind(this);
        this.timerUpdateCallback = this.timerUpdateCallback.bind(this);
        this.timerFinishCallback = this.timerFinishCallback.bind(this);
        
        const whiteTimer = new Timer("w", this.timerUpdateCallback, this.timerFinishCallback);
        const blackTimer = new Timer("b", this.timerUpdateCallback, this.timerFinishCallback);
        
        let userColor = props.userColor || "w";

        this.state = {
            game: new Chess(),
            gameOver: false,
            moveNum: 0,
            moves: [],

            turn: "w",
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
                title: "",
                details: "",
            }
        }

        this.state.opponent = this.getOpponentColor(this.state.user);

        this.state.topTimer = this.getTimer(this.getOpponentColor(userColor));
        this.state.bottomTimer = this.getTimer(userColor);

        this.socket = null;

    }

    componentDidMount(){
        try{
            if (this.props?.spectating){
                this.socket = io("http://localhost:4000", {query: {spectate: this.matchId}});
                commonSocketSignals(this.socket, this);
                spectatorSocketSignals(this.socket, this);
            }
            else{
                this.socket = io("http://localhost:4000", {query: {email: this.props.user.email}});
                commonSocketSignals(this.socket, this);
                playerSocketSignals(this.socket, this);
            }
        }
        catch(err){
            console.error("Connection error");
        }
    }

    componentWillUnmount(){
        if (!this.socket.disconnected){
            this?.socket.disconnect();
        }
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
            promotion: promotion 
        };

        let moveResult;
        try{
            moveResult = this.state.game.move(move);
            
        } catch(e){
            console.log("invalid move");
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
        this.addMove(moveResult.san);
        this.handleTimers(moveResult.color);

        this.checkGameOver();
        if (moveResult.color === 'b'){
            this.setState({
                moveNum: this.state.moveNum+1,
            })
        }
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
    
    //Add move to "Moves" list
    addMove(move){
        this.state.moves.push(move);
        this.setState({
            moves: this.state.moves,
        })
    }

    //Checks if the game is over. Calls gameOver with the reason if it is.
    checkGameOver(){
        if (this.state.game.isCheckmate()){
            let winner = this.getOpponentColor(this.state.game.turn());
            winner = (winner === "w" ? "White" : "Black");
            this.gameOver(winner + " has won", " by Checkmate");
        }
        else if (this.state.game.isStalemate()){
            this.gameOver("Draw", " by Stalemate");
        }
        else if (this.state.game.isThreefoldRepetition()){
            this.gameOver("Draw", " by Threefold Repetition");
        }
        else if (this.state.game.isInsufficientMaterial()){
            this.gameOver("Draw", " by Insufficient Material");
        }
        else if (this.state.game.isDraw()){
            this.gameOver("Draw", " by 50-move rule");
        }
        
    }

    gameOver(result, reason){
        this.disableTimer("w");
        this.disableTimer("b");

        this.setNotification("Game over!", result + reason)
    }
    
    //Pass these to the timer objects, so that when they update,
    //they call these functions to update this game's state.
    timerUpdateCallback(){
        this.setState({timers: this.state.timers});
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

    enableTimer(color){
        let timer = this.getTimer(color);
        timer.enable();
    }
    disableTimer(color){
        let timer = this.getTimer(color);
        timer.disable();
    }

    syncTimers(whiteTime, blackTime, timeSent){

        const latency = Date.now() - timeSent;
        
        this.getTimer('w').time = whiteTime - latency;
        this.getTimer('b').time = blackTime - latency;

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

    getOpponentColor(color){
        return color === "w" ? "b" : "w";
    }

    flipBoard(){
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
    }

    resign(){
        if (this.state.gameOver){
            return;
        }
        this.socket.emit('resign');
        //TODO add a confirm
        let winner = (this.state.user === "w" ? "Black" : "White");
        this.gameOver(winner + " has won", " by Resignation");
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

    render(){
        return (
            <>
            <Box className="ChessPage">
                <Box className="GameUserContainer">
                    {
                        this.state.topUser ?
                        <UserCard className="UserCard"
                            username={this.state.topUser.username}
                            elo={this.state.topUser.elo}
                            avatarEnabled={true}
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
                            { !this.props?.spectating ? <PromotionSelect changeHandler={this.changePromotionSelection} user={this.state.user}/> : null}
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
                                relativeWidth={0.4}
                                relativeHeight={0.7}
                                moveHandler={this.userMove}
                                gameState={this.state.game.fen()}
                                mode={this.props.spectating ? "Spectator" : "Player"}
                                boardOrientation={this.state.orientation}
                            />
                        </Box>
                        <GameInfo 
                            mode={this.props.spectating ? "Spectator" : "Player"}
                            moves={this.state.moves}
                            className="Info"
                            flipBoardHandler={this.flipBoard}
                            requestDrawHandler={this.requestDraw}
                            resignHandler={this.resign}
                            drawRequestPopup={this.state.drawRequest}
                            drawRequestColor={this.props.spectating ? this.state.drawRequestColor : null}
                        />
                    </Box>
                    {
                        this.state.bottomUser ?
                        <UserCard className="UserCard"
                            username={this.state.bottomUser.username}
                            elo={this.state.bottomUser.elo}
                            avatarEnabled={true}
                        />
                        :
                        <UserCard className="UserCard"
                            username="Searching for opponent..."
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
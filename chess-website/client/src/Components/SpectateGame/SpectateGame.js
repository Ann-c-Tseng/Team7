import React from "react";
import {Chess} from "chess.js";
import {Box} from "@mui/material"
import UserCard from "../ChessPage/Components/UserCard/UserCard";
import TimerView from "../ChessPage/Components/Timer/TimerView";
import Timer from "../ChessPage/Components/Timer/Timer";
import ResultPopup from "../ChessPage/Components/ResultPopup/ResultPopup";
import ChessGame from "../ChessPage/Components/ChessGame/ChessGame";
import GameInfo from "../ChessPage/Components/GameInfo/GameInfo";

import {useParams} from "react-router";
import io from "socket.io-client";

import "../ChessPage/ChessPage.css";

//Should be a stripped down version of the ChessPage. Should move common code into a new class and have these extend them.
class SpectateGame extends React.Component{
    constructor(props){
        super(props);

        this.flipBoard = this.flipBoard.bind(this);
        this.notificationAccept = this.notificationAccept.bind(this);
        this.timerUpdateCallback = this.timerUpdateCallback.bind(this);
        this.timerFinishCallback = this.timerFinishCallback.bind(this);

        const whiteTimer = new Timer("w", this.timerUpdateCallback, this.timerFinishCallback);
        const blackTimer = new Timer("b", this.timerUpdateCallback, this.timerFinishCallback);

        this.state = {
            queried: false,
            validGame: false,

            game: new Chess(),
            gameOver: false,
            moveNum: 0,
            moves: [],

            turn: "w",
            opponent: null,
            drawRequest: false,

            timers: [blackTimer, whiteTimer],
            topTimer: blackTimer,
            bottomTimer: whiteTimer,

            topUser: null,
            bottomUser: null,

            orientation: "w",

            notification: {
                active: false,
                title: "",
                details: "",
            }
        }
        this.socket = null;
    }

    componentDidMount(){
        this.socket = io("http://54.69.36.110", {query: {spectate: this.props.gameID}});
        this.socket.on('initialize', (data) => {

            this.state.timers[0].time = data.black.time;
            this.state.timers[1].time = data.white.time;

            //Some things need to be updated immediately.
            this.state.moveNum = Math.floor(data.moves.length/2);
            this.state.game = new Chess(data.fen);

            this.setState({
                timers: this.state.timers,
                game: this.state.game,
                topUser: data.black.user,
                bottomUser: data.white.user,
                moves: data.moves,
                moveNum: this.state.moveNum,
            });

            if (this.state.moveNum === 0){
                //Do nothing
            }
            else{
                console.log("Toggle timer");
                this.enableTimer(this.state.game.turn());
            }

        });
        this.socket.on('move', (data) => {
            this.attemptMove(data.move);
            this.syncTimers(data.whiteTimeLeft, data.blackTimeLeft, data.timeSent);
            
        });
        this.socket.on('gameNotFound', () => {
            this.setNotification("Error", "Game not found");
        });
        this.socket.on('notify', (data) => {
            this.setNotification(data.title, data.message);
        });
        this.socket.on('requestDraw', (data) => {
            this.setState({
                drawRequest: true,
                drawRequestColor: data.color === 'w' ? "White" : "Black",
            });
        });

        this.socket.on('gameOver', (data) => {
            console.log("Received game over");
            this.setState({gameOver: true});
            this.gameOver(data.result, data.reason);
        });
    }

    componentWillUnmount(){
        if (!this.socket.disconnected){
            this?.socket.disconnect();
        }
    }

    attemptMove(move){

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

        this.addMove(moveResult.san);
        this.handleTimers(moveResult.color);

        this.checkGameOver();
        if (moveResult.color === 'b'){
            this.setState({
                moveNum: this.state.moveNum+1,
            })
        }
    }

    //Add move to "Moves" list
    addMove(move){
        this.state.moves.push(move);
        this.setState({
            moves: this.state.moves,
        })
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
    flipBoard(){
        this.setState({
            topTimer: this.state.bottomTimer,
            bottomTimer: this.state.topTimer,

            topUser: this.state.bottomUser,
            bottomUser: this.state.topUser,

            orientation: this.getOpponentColor(this.state.orientation),
        });
    }

    getOpponentColor(color){
        return color === "w" ? "b" : "w";
    }

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
        console.log("Game over. " + result + reason);
        this.setNotification("Game over!", result + reason)
    }

    handleTimers(color){
        //Don't start the timers on the first move of the game, for fairness.
        if (this.state.moveNum === 0 && color === "w"){
            //Do nothing
        }
        else{
            this.toggleTimers(color);
        }
    }

    toggleTimers(color){
        this.disableTimer(color);
        this.enableTimer(this.getOpponentColor(color));
    }

    syncTimers(whiteTime, blackTime, timeSent){

        const latency = Date.now() - timeSent;
        const whiteTimer = this.getTimer('w');
        const blackTimer = this.getTimer('b');
        
        whiteTimer.time = whiteTime - latency;
        blackTimer.time = blackTime - latency;

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
    enableTimer(color){
        let timer = this.getTimer(color);
        timer.enable();
    }
    disableTimer(color){
        let timer = this.getTimer(color);
        timer.disable();
    }
    timerUpdateCallback(){
        this.setState({timers: this.state.timers});
    }
    timerFinishCallback(color){
        
        //Might still want to do something here, for extra visual effects or something
        //let winner = this.getOpponentColor(this.state.game.turn());
        //winner = (winner === "w" ? "White" : "Black");
        //this.gameOver(winner + " has won", "Timeout");
    }


    render(){

        if (!this.state.validGame && this.state.queried){
            return (<p>Could not find game.</p>);
        }
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
                            username="Retrieving info..."
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
                                mode={"Spectator"}
                                moveHandler={this.userMove}
                                gameState={this.state.game.fen()}
                                boardOrientation={this.state.orientation}
                            />
                        </Box>
                        <GameInfo 
                            mode={"Spectator"}
                            moves={this.state.moves}
                            className="Info"
                            flipBoardHandler={this.flipBoard}
                            drawRequestPopup={this.state.drawRequest}
                            drawRequestColor={this.state.drawRequestColor}
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
                            username="Retrieving info..."
                            elo={null}
                        />
                    }
                </Box>
            </Box>
            </>
        )
    }
}

//There is currently no way to extract the game ID from the URL in class-based components.
//So, use a functional component wrapper.
function SpectateGameWrapper(){
    const URL = useParams();
    const gameID = URL.id;

    return (<SpectateGame gameID={gameID}/>)
}

export default SpectateGameWrapper;
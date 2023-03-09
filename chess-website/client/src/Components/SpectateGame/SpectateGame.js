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

import "./SpectateGame.css";

//Should be a stripped down version of the ChessPage. Should move common code into a new class and have these extend them.
class SpectateGame extends React.Component{
    constructor(props){
        super(props);

        this.flipBoard = this.flipBoard.bind(this);
        this.notificationAccept = this.notificationAccept.bind(this);

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
        this.socket = io("http://localhost:4000", {query: {spectate: this.props.gameID}});
        this.socket.on('initialize', (data) => {
            console.log(data);

            this.state.timers[0].time = data.black.time;
            this.state.timers[1].time = data.white.time;
            this.setState({
                timers: this.state.timers,
                game: new Chess(data.fen),
                topUser: data.black.user,
                bottomUser: data.white.user,
                moves: data.moves,
                moveNum: data.moveNum
                
            })
        })
        this.socket.on('move', (data) => {
            console.log(data);
            
        })
        this.socket.on('gameNotFound', () => {
            this.setNotification("Error", "Game not found");
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
            <p>Game id: {this.props.gameID}</p>
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
import React from 'react';
import axios from "axios";
import {Box} from '@mui/system';
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Navigate} from 'react-router-dom';
import {Chessboard} from "react-chessboard";
import UserCard from "../ChessPage/Components/UserCard/UserCard";
import TimerView from "../ChessPage/Components/Timer/TimerView";
import "./SpectateSelect.css";

class SpectateSelect extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            games: [],
            redirect: false,
            redirectTo: null,
        };

    }

    componentDidMount(){
        this.refresh();
    }

    //onClick only accepts functions, so create a new function with the id baked in
    buttonFunctionMaker(id){
        return () => {
            this.setState({
                redirect: true,
                redirectTo: id,
            })
        };
    }

    refresh(){
        axios.post('http://localhost:4000/spectate')
        .then((response) => {
            if (response.data.success){
                this.setState({
                    games: response.data.games,
                })
            }
            else{
                console.log("Unsuccessful in getting games");
            }
        })
    }

    render(){
        if (this.state.redirect){
            return <Navigate to={"/spectate/" + this.state.redirectTo}/>
        }

        return (
            <>
                <Typography variant="h2">Spectate a game</Typography>
                <Box className="SpectateGameCardList">
                {this.state.games.map(game => {
                    return (
                        <Card className="SpectateGameCard" key={game.id}>
                            <CardActionArea className="CardButton" onClick={this.buttonFunctionMaker(game.id)}>
                                <Box className="SpectateGameInfo">
                                    <TimerView color="b" time={game.black.time}/>
                                    <UserCard
                                        username={game.black.user.username}
                                        avatarEnabled={true}
                                        elo={game.black.user.elo}
                                    />
                                
                                <Box className="Game">
                                    <Chessboard 
                                        id={game.id}
                                        position={game.position}
                                        showBoardNotation={false}
                                        boardWidth={260}
                                        boardHeight={260}
                                        arePiecesDraggable={false}
                                        areArrowsAllowed={false}
                                    />
                                </Box>
                                <UserCard
                                    username={game.white.user.username}
                                    avatarEnabled={true}
                                    elo={game.white.user.elo}
                                />
                                <TimerView color="w" time={game.white.time}/>
                                </Box>
                            </CardActionArea>
                        </Card>
                    )
                })}
                </Box>
            </>
        );
    }
}

export default SpectateSelect;
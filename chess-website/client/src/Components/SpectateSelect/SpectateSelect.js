import React from 'react';
import axios from "axios";
import {Box} from '@mui/system';
import {Button, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Navigate} from 'react-router-dom';
import {Chessboard} from "react-chessboard";
import UserCard from "../ChessPage/Components/UserCard/UserCard";
import TimerView from "../ChessPage/Components/Timer/TimerView";
import "./SpectateSelect.css";

const textColor = "#fefefedf"
const bodyTypographyStyling = {
    color: textColor,
}

const refreshButtonStyle = {
    margin:"10px",
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    width: 'fit-content',
    minWidth: '100px',
    height: '40px',
    padding: '8px',
    borderRadius: '5px',
    boxShadow: '0px 0px 20px -20px',
    backgroundColor: '#2b2725',
    userSelect: 'none',
    fontWeight: 'bold',
    color: 'white',
}

class SpectateSelect extends React.Component{
    constructor(props){
        super(props);

        this.refresh = this.refresh.bind(this);
        this.state = {
            games: [],
            redirect: false,
            redirectTo: null,
            canRefresh: true,
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
        console.log("refresh");
        if (!this.state.canRefresh){
            console.log("Refresh is on cooldown!");
            return;
        }
        this.setState({
            canRefresh: false,
        });
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
        });
        setTimeout(() => {
            this.setState({
                canRefresh: true,
            })
        },3000);
    }

    render(){
        if (this.state.redirect){
            return <Navigate to={"/spectate/" + this.state.redirectTo}/>
        }

        return (
            <Box className="SpectateSelectContainer">
                <Typography variant="h3" sx={bodyTypographyStyling}>Spectate a game</Typography>
                <Button
                    sx={refreshButtonStyle}
                    onClick={this.refresh}
                    disabled={!this.state.canRefresh}
                >
                    Refresh
                </Button>
                <Box className="SpectateGameCardList">
                {this.state.games.length !== 0 ? this.state.games.map(game => {
                    return (
                        <Card sx={{backgroundColor:"#2b2725"}} className="SpectateGameCard" key={game.id}>
                            <CardActionArea sx={{backgroundColor:"#2b2725"}} className="CardButton" onClick={this.buttonFunctionMaker(game.id)}>
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
                }) : 
                <Typography variant="body1" sx={bodyTypographyStyling}>There are currently no games being played.</Typography>}
                </Box>
            </Box>
        );
    }
}

export default SpectateSelect;
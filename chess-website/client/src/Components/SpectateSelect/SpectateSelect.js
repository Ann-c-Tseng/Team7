import React from 'react';
import axios from "axios";
import { Box } from '@mui/system';
import {Card, CardActionArea, CardContent} from "@mui/material";
import { Chessboard } from "react-chessboard";
import UserCard from "../ChessPage/Components/UserCard/UserCard";
import TimerView from "../ChessPage/Components/Timer/TimerView";
import "./SpectateSelect.css";

class SpectateSelect extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            games: [],
        };

    }

    componentDidMount(){
        this.refresh();
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
        return (
            <Box className="SpectateGameCardList">
            {this.state.games.map(game => {
                return (
                    <Card className="SpectateGameCard" key={game.id}>
                        <CardActionArea className="CardButton">
                            <Box className="SpectateGameInfo">
                                <TimerView color="b" time={600000}/>
                                <UserCard
                                    username="Test"
                                    avatarEnabled={true}
                                    
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
                                username="Test"
                                avatarEnabled={true}
                            />
                            <TimerView color="w" time={600000}/>
                            </Box>
                        </CardActionArea>
                    </Card>
                )
            })}
            </Box>
        );
    }
}

export default SpectateSelect;
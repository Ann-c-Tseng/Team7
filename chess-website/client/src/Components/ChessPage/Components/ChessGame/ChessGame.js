import React from 'react';
import {IconButton, ButtonGroup} from "@mui/material";
import { Chessboard } from "react-chessboard";
import blackQueen from "./pieces/black-queen.svg";
import blackRook from "./pieces/black-rook.svg";
import blackBishop from "./pieces/black-bishop.svg";
import blackKnight from "./pieces/black-knight.svg";

import whiteQueen from "./pieces/white-queen.svg";
import whiteRook from "./pieces/white-rook.svg";
import whiteBishop from "./pieces/white-bishop.svg";
import whiteKnight from "./pieces/white-knight.svg";

//A view and controller component (MVC)
class ChessGame extends React.Component{

    getOrientationString(col){
        return (col === "w" ? "white" : "black");
    }

    render(){
        return (
            <>
                <Chessboard 
                    className="Chessboard"
                    boardWidth={675}
                    boardHeight={675}
                    position={this.props.gameState}
                    onPieceDrop={this.props.moveHandler}
                    boardOrientation={this.getOrientationString(this.props.boardOrientation)}
                    /* Special styling options for later
                    customBoardStyle={}
                    customSquareStyles={}
                    customDarkSquareStyle={}
                    customLightSquareStyle={}
                    customPremoveDarkSquareStyle={}
                    customPremoveLightSquareStyle={}
                    customDropSquareStyle={} (Square being hovered over with dragged piece)
                    */
                />
                <ButtonGroup orientation="vertical">
                    {
                        this.props.user === "w" ? 
                        <>
                            <IconButton><img src={blackQueen} /></IconButton>
                            <IconButton><img src={blackRook} /></IconButton>
                            <IconButton><img src={blackBishop} /></IconButton>
                            <IconButton><img src={blackKnight} /></IconButton>
                        </> :
                        <>
                            <IconButton><img src={whiteQueen} /></IconButton>
                            <IconButton><img src={whiteRook} /></IconButton>
                            <IconButton><img src={whiteBishop} /></IconButton>
                            <IconButton><img src={whiteKnight} /></IconButton>
                        </>
                        
                    }
                    
                </ButtonGroup>
            </>
        );
    }
}

export default ChessGame;
import React from 'react';
import { Chessboard } from "react-chessboard";


//A view and controller component (MVC)
class ChessGame extends React.Component{

    getOrientationString(col){
        return (col === "w" ? "white" : "black");
    }

    render(){
        return (
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
        );
    }
}

export default ChessGame;
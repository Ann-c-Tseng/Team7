import React from 'react';
import { Chessboard } from "react-chessboard";


//A view and controller component (MVC)
class ChessGame extends React.Component{

    render(){
        return (
            <Chessboard 
                className="Chessboard"
                boardWidth={675}
                boardHeight={675}
                position={this.props.gameState}
                onPieceDrop={this.props.moveHandler}
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
import React from 'react';

import { Chessboard } from "react-chessboard";

class ChessGame extends React.Component{
    constructor(props){
        super(props);

        const size = this.calculateSize()

        this.state = {
            width: size,
            height: size,
        }
    }
    calculateSize(){
        return Math.min(window.innerWidth * this.props.relativeWidth, window.innerHeight * this.props.relativeHeight);
    }

    componentDidMount(){
        window.addEventListener("resize", () => {

            const newSize = this.calculateSize()

            this.setState({
                width: newSize,
                height: newSize
            })
        })
    }

    getOrientationString(col){
        return (col === "w" ? "white" : "black");
    }

    render(){
        return (
            <Chessboard 
                className="Chessboard"
                boardWidth={this.state.width}
                boardHeight={this.state.height}
                position={this.props.gameState}
                onPieceDrop={this.props.moveHandler}
                boardOrientation={this.getOrientationString(this.props.boardOrientation)}
                arePiecesDraggable={!(this.props.mode === "Spectator")}
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
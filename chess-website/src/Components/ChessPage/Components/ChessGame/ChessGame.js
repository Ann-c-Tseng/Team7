import React from 'react';
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

class ChessGame extends React.Component{
    constructor(props){
        super(props)
        this.state = {game: null};
        this.onDrop = this.onDrop.bind(this);
    }
    componentDidMount(){
        this.setState({game: new Chess()});
    }

    makeMove(move){
        const moveResult = this.state.game.move(move);
        this.setState({game: this.state.game});
        return moveResult;
    }

    onDrop(fromSquare, toSquare){
        const move = this.makeMove({
            from: fromSquare,
            to: toSquare,
            promotion: "q"
        });
        return move ? true : false;
    }

    render(){
        return (
            this.state.game ?
            <Chessboard 
                className="Chessboard"
                boardWidth={675}
                boardHeight={675}
                position={this.state.game.fen()}
                onPieceDrop={this.onDrop}
            /> : null
        );
    }
}

export default ChessGame;
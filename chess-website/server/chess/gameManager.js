const gamesModel = require('../models/Games');


//node got fussy when trying to require chess.js normally. This is a mess
async function loader(){
    const Chess = await import('chess.js')
    //Give the game manager access to the chess library
    gameManager.Chess = Chess;
}

const connectedUsers = require("../utils/connectedUsers");
const whiteMoveList = [];
const blackMoveList = [];
let counter = 0;
const gameManager = {
    games: [],
    
    addNewGame(playerSockets) {
        const game = {
            state: new this.Chess.Chess(),
            spectators: [],
            ...playerSockets
        }
        this.games.push(game);
        
        //Each socket needs a reference to their own game
        game.white.game = game;
        game.black.game = game;

        game.white.drawRequest = false;
        game.black.drawRequest = false;

        game.white.emit('initialize', {color: "w", opponent: {
            username: game.black.user.username,
        }});

        game.black.emit('initialize', {color: "b", opponent: {
            username: game.white.user.username,
        }});

        this.setHandlers(game.white, game.black);
        this.setHandlers(game.black, game.white);
    },

    setHandlers(socket, opponentSocket){
        //A game has been made at this point. If the user leaves after the first moves are made then
        //they should be penalized.
        socket.on('move', (move) => {
            try{
                this.handleMove(socket.game, move);
                opponentSocket.emit('opponentMove', move);
            }
            catch(err){
                console.log(err)
                console.log("Invalid move was sent to the server");
                socket.emit('invalid', {message: "Invalid move"});
            }
            
        })
        socket.on('requestDraw', () => {
            if (opponentSocket.drawRequest){
                socket.emit('drawConfirm');
                opponentSocket.emit('drawConfirm');
                this.handleGameOver();
                
            }
            else{
                opponentSocket.emit('requestDraw');
                socket.drawRequest = true;
            }
            
        })
        socket.on('resign', () => {
            opponentSocket.emit('resign');
            this.handleGameOver();
        })
        socket.on('gameOver', () => {
            this.handleGameOver();
        })
    },

    handleMove(game, move){
        game.state.move(move);
        console.log(move);
        if (counter % 2 === 0) {
            whiteMoveList.push(move);
        }
        else {
            blackMoveList.push(move);
        }
        game.white.drawRequest = false;
        game.black.drawRequest = false;
        if (game.state.isCheckmate()){
            this.handleGameOver(game);
        }
    },

    handleGameOver(game){
        //send to DB
        console.log("white moves: " + this.whiteMoveList);
        console.log("black moves: " + this.blackMoveList);

    }

}

loader();

module.exports = gameManager;
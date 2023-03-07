

//node got fussy when trying to require chess.js normally. This is a mess
async function loader(){
    const Chess = await import('chess.js')
    //Give the game manager access to the chess library
    gameManager.Chess = Chess;
}

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
        game.white.game = game.state;
        game.black.game = game.state;

        game.white.emit('initialize', {color: "w"});
        game.black.emit('initialize', {color: "b"});

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
                console.log("Invalid move was sent to the server");
                socket.emit('invalid', {message: "Invalid move"});
            }
            
        })
    },

    //Do stuff upon game overs
    handleMove(game, move){
        game.move(move);
        if (game.isCheckmate()){
            this.handleGameOver();
        }
    },

    handleGameOver(game){
        //send to DB
        // game.state.p

    }

}

loader();

module.exports = gameManager;
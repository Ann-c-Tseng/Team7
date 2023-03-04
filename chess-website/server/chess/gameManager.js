//TODO: Verify chess moves made by players. The chess.js import is being weird.
const gameManager = {
    games: [],
    
    addNewGame(playerSockets) {
        const game = {
            state: null,
            ...playerSockets
        }
        this.games.push(game);
        
        game.white.emit('initialize', {color: "w"});
        game.black.emit('initialize', {color: "b"});

        this.setHandlers(game.white, game.black);
        this.setHandlers(game.black, game.white);

    },

    setHandlers(socket, opponentSocket){   
        socket.on('move', (move) => {
            opponentSocket.emit('opponentMove', move);
        })
    },

    abortGame(game){

    }
}

module.exports = gameManager;
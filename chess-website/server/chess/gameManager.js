//TODO: Verify chess moves made by players. The chess.js import is being weird.
const gameManager = {
    games: [],
    
    addNewGame(playerSockets) {
        const game = {
            state: null,
            ...playerSockets
        }
        this.games.push(game);

        //this.setHandlers(game.white, game.black);
        //this.setHandlers(game.black, game.white);
        
        game.white.emit('initialize', {color: "w"});
        game.black.emit('initialize', {color: "b"});

    },

    setHandlers(socket, opponentSocket){   
        socket.on('move', () => {
            opponentSocket.emit('move')
        })
    },

    abortGame(game){
        
    }
}

module.exports = gameManager;
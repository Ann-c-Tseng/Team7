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

loader();

module.exports = gameManager;
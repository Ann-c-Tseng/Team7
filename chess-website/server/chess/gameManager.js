//node got fussy when trying to require chess.js normally. This is a mess
async function loader(){
    const Chess = await import('chess.js')
    //Give the game manager access to the chess library
    gameManager.Chess = Chess;
}

const Timer = require("./Timer");

const connectedUsers = require("../utils/connectedUsers");
const matchTime = 6000 // 10 minute matches 


const gameManager = {
    games: [],
    
    addNewGame(playerSockets) {
        const game = {
            state: new this.Chess.Chess(),
            move: 1,
            spectators: [],
            ...playerSockets
        }
        this.games.push(game);
        
        //Associate game info with each socket
        game.white.game = game;
        game.white.drawRequest = false;
        game.white.color = 'w';

        game.black.game = game;
        game.black.drawRequest = false;
        game.black.color = 'b';

        this.setTimers(game);
        this.initializePlayers(game);
    },

    initializePlayers(game){
        game.white.emit('initialize', {
            color: "w",
            time: game.white.timer.time,
            opponent: {
                username: game.black.user.username,
            },
        });

        game.black.emit('initialize', {
            color: "b",
            time: game.black.timer.time,
            opponent: {
                username: game.white.user.username,
            },
        });

        this.setHandlers(game.white, game.black);
        this.setHandlers(game.black, game.white);
    },

    setHandlers(socket, opponentSocket){

        socket.on('move', (move) => {
            try{
                this.handleMove(socket.game, move, socket.color);
                opponentSocket.emit('opponentMove', {
                    move,
                    timeSent: Date.now(),
                    timeLeft: opponentSocket.timer.time,
                    oppTimeLeft: socket.timer.time
                });
                socket.emit('updateTimer', {
                    timeSent: Date.now(),
                    timeLeft: socket.timer.time,
                    oppTimeLeft: opponentSocket.timer.time
                })
            }
            catch(err){
                console.log(err)
                console.log("Invalid move was sent to the server");
                socket.emit('invalid', {message: "Invalid move"});
            }
            
        });
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
            
        });
        socket.on('resign', () => {
            opponentSocket.emit('resign');
            this.handleGameOver();
        });
    },

    setTimers(game){
        const timerCallback = (color) => {
            this.finishedTimer(color, game);
        }

        game.black.timer = new Timer('b', matchTime, timerCallback);
        game.white.timer = new Timer('w', matchTime, timerCallback);
    },

    handleMove(game, move, color){
        game.state.move(move);

        this.handleTimers(game, color);

        game.white.drawRequest = false;
        game.black.drawRequest = false;

        if (game.state.isCheckmate()){
            this.handleGameOver(game);
        }
        if (color === 'b'){
            game.move++;
        }
    },

    
    handleTimers(game, colorMoved){
        if (game.move === 1 && colorMoved === 'w'){
            //Do nothing
            console.log("First move");
        }
        else if (game.move === 1 && colorMoved === 'b'){
            console.log("Begin timers!");
            game.white.timer.toggle();
        }
        else{
            game.white.timer.toggle();
            game.black.timer.toggle();
        }
    },

    finishedTimer(color, game){
        console.log(color + " ran out of time");

    },

    handleGameOver(game, result, reason){
        //Notify players + spectators
        //send to DB
    }
}

loader();

module.exports = gameManager;
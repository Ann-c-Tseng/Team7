const gameModel = require('../models/Games');


//node got fussy when trying to require chess.js normally. This is a mess
async function loader(){
    const Chess = await import('chess.js')
    //Give the game manager access to the chess library
    gameManager.Chess = Chess;
}

const Timer = require("./Timer");
const uuid = require("uuid");

const connectedUsers = require("../utils/connectedUsers");
const matchTime = 600000 // 10 minute matches 


const gameManager = {
    games: new Map(),
    
    getActiveGames(){
        const activeGames = [];
        
        for (entry of this.games.entries()){
            const game = entry[1]
            activeGames.push({
                id: entry[0],
                position: game.state.fen(),
            });
        }
        return activeGames;
    },


    addNewGame(playerSockets) {
        const game = {
            uuid: uuid.v4(),
            state: new this.Chess.Chess(),
            move: 1,
            gameOver: false,
            startTime: 0,
            endTime: 0,
            spectators: [],
            ...playerSockets
        }
        this.games.set(game.uuid, game);
        
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

        socket.on('disconnect', () => {
            this.handlePlayerDisconnect(socket.game, socket.color);
        });
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
            const winner = socket.color === "w" ? "Black" : "White";
            const result = winner + " has won";
            this.handleGameOver(socket.game, result, "Resignation");
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
        if ((color === "w" && !game.white.timer.timeLeft()) ||
            (color === "b" && !game.black.timer.timeLeft())){
            throw new Error("User tried making move with no time left");
        }

        game.state.move(move);

        this.handleTimers(game, color);
        game.white.drawRequest = false;
        game.black.drawRequest = false;

        if (!this.checkGameOver(game, color) && color === 'b'){
            game.move++;
        }
    },

    handleTimers(game, colorMoved){
        if (game.move === 1 && colorMoved === 'w'){
            //Do nothing
        }
        else if (game.move === 1 && colorMoved === 'b'){
            console.log("Begin timers!");
            game.startTime = Date.now();
            game.white.timer.toggle();
        }
        else{
            game.white.timer.toggle();
            game.black.timer.toggle();
        }
    },

    finishedTimer(color, game){
        const winner = color === "w" ? "Black" : "White";
        const result = winner + " has won";
        this.handleGameOver(game, result, "Timeout");

    },

    handlePlayerDisconnect(game, color){
        if (!game.gameOver){
            const winner = color === "w" ? "Black" : "White";
            const result = winner + " has won";
            this.handleGameOver(game, result, "Disconnect");
        }
    },

    checkGameOver(game, color){
        if (game.state.isCheckmate()){
            const winner = color === "w" ? "White" : "Black";
            const result = winner + " has won";
            this.handleGameOver(game, result, "Checkmate");
            return true;
        }
        else if (game.state.isStalemate()){
            this.handleGameOver(game, "Draw", "Stalemate");
            return true;
        }
        else if (game.state.isThreefoldRepetition()){
            this.handleGameOver(game, "Draw", "Threefold Repetition");
            return true;
        }
        else if (game.state.isInsufficientMaterial()){
            this.handleGameOver(game, "Draw", "Insufficient Material");
            return true;
        }
        else if (game.state.isDraw()){
            this.handleGameOver(game, "Draw", "50-move rule");
            return true;
        }
        return false;
    },

    async handleGameOver(game, result, reason){
        game.gameOver = true;
        game.endTime = Date.now();
        game?.white.emit('gameOver', {result, reason});
        game?.black.emit('gameOver', {result, reason});
        //Notify players + spectators
        //send to DB
        
        totalMoveString = game.state.pgn();
        numMove = game.move;
        whiteUser = game.white.user.username;
        blackUser = game.black.user.username;
        winner = result.split(" ")[0]
        console.log("Move string: " + game.state.pgn());
        console.log("number of game move: " + game.move);
        console.log("blackUser: " + game.black.user.username + "\nwhiteUser: " + game.white.user.username);

        duration = `${((game.endTime - game.startTime) / 60000).toFixed(3)} minutes`;
        console.log(`Game Duration: ${duration}`);
        winner = result.split(" ")[0] === 'White' ? game.white.user.username : game.black.user.username
        console.log(`winner: ${winner}`);
        const gameDB = new gameModel({
            moveString: totalMoveString,
            numMoves: numMove,
            black: blackUser, 
            white: whiteUser,
            winner: winner,
            duration: duration
        })

        try {
            let result = await gameDB.save();
            console.log("game data successfully stored");
        }
        catch(error){
            console.log(error);
        }

        this.disconnectAll(game);
        this.games.delete(game.uuid);
        
    },

    disconnectAll(game){
        if (!game.white){
            console.log(game.white);
        }
        if (!game.black){
            console.log(game.black);
        }
        
        
        game.white.disconnect();
        game.black.disconnect();
    }
}

loader();

module.exports = gameManager;
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
            const whiteUser = game.white.user;
            const blackUser = game.black.user;
            activeGames.push({
                id: entry[0],
                position: game.state.fen(),
                turn: game.state.turn(),
                //Only take specific things. Don't send the entire user to spectators.
                //Add profile pictures later
                white: {
                    user: {
                        username: whiteUser.username,
                        elo: whiteUser.elo
                        
                    },
                    time: game.white.timer.time,
                },
                black: {
                    user: {
                        username: blackUser.username,
                        elo: blackUser.elo,
                    },
                    time: game.black.timer.time,
                }
            });
        }
        return activeGames;
    },
    getGameById(uuid){
        return this.games.get(uuid);
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
    addSpectator(game, spectator){
        game.spectators.push(spectator);
        spectator.emit('initialize', {
            turn: game.state.turn(),
            fen: game.state.fen(),
            moves: game.state.history(),
            //Only take specific things. Don't send the entire user to spectators.
            //Add profile pictures later
            white: {
                user: {
                    username: game.white.user.username,
                    elo: game.white.elo
                    
                },
                time: game.white.timer.time,
            },
            black: {
                user: {
                    username: game.black.user.username,
                    elo: game.black.elo,
                },
                time: game.black.timer.time,
            }
        });
    },

    setHandlers(socket, opponentSocket){

        socket.on('disconnect', () => {
            this.handlePlayerDisconnect(socket.game, socket.color);
        });
        socket.on('move', (move) => {
            try{
                this.tryMove(socket.game, move, socket.color);
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
                });
                this.endMove(socket.game, socket.color);
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
                this.handleGameOver(socket.game, "Draw", " by Agreement");
                
            }
            else{
                opponentSocket.emit('requestDraw');
                this.emitSpectators(socket.game, 'requestDraw', {color: socket.color});
                socket.drawRequest = true;
            }
            
        });
        socket.on('resign', () => {
            const winner = socket.color === "w" ? "Black" : "White";
            const result = winner + " has won";
            this.handleGameOver(socket.game, result, " by Resignation");
        });
    },

    setTimers(game){
        const timerCallback = (color) => {
            this.finishedTimer(color, game);
        }

        game.black.timer = new Timer('b', matchTime, timerCallback);
        game.white.timer = new Timer('w', matchTime, timerCallback);
    },

    tryMove(game, move, color){
        if ((color === "w" && !game.white.timer.timeLeft()) ||
            (color === "b" && !game.black.timer.timeLeft())){
            throw new Error("User tried making move with no time left");
        }

        game.state.move(move);
        this.handleTimers(game, color);
        game.white.drawRequest = false;
        game.black.drawRequest = false;

        this.emitSpectators(game, 'move', {
            move: move,
            whiteTimeLeft: game.white.timer.time,
            blackTimeLeft: game.black.timer.time,
            timeSent: Date.now(),
        })
    },

    endMove(game, color){

        if (!this.checkGameOver(game, color) && color === 'b'){
            game.move++;
        }
    },

    handleTimers(game, colorMoved){
        if (game.move === 1 && colorMoved === 'w'){
            //Do nothing
        }
        else if (game.move === 1 && colorMoved === 'b'){
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
        this.handleGameOver(game, result, " by Timeout");

    },

    handlePlayerDisconnect(game, color){
        if (!game.gameOver){
            const winner = color === "w" ? "Black" : "White";
            const result = winner + " has won";
            this.handleGameOver(game, result, " by Disconnect");
        }
    },

    checkGameOver(game, color){
        if (game.state.isCheckmate()){
            const winner = color === "w" ? "White" : "Black";
            const result = winner + " has won";
            this.handleGameOver(game, result, " by Checkmate");
            return true;
        }
        else if (game.state.isStalemate()){
            this.handleGameOver(game, "Draw", " by Stalemate");
            return true;
        }
        else if (game.state.isThreefoldRepetition()){
            this.handleGameOver(game, "Draw", " by Threefold Repetition");
            return true;
        }
        else if (game.state.isInsufficientMaterial()){
            this.handleGameOver(game, "Draw", " by Insufficient Material");
            return true;
        }
        else if (game.state.isDraw()){
            this.handleGameOver(game, "Draw", " by 50-move rule");
            return true;
        }
        return false;
    },

    async handleGameOver(game, result, reason){
        game.gameOver = true;
        game.endTime = Date.now();

        if (game.move < 2){
            this.emitAll(game, 'gameOver', {result: "Game Aborted. ", reason: "Game ended prematurely"})
        }
        else{
            this.emitAll(game, 'gameOver', {result, reason})
        }

        this.storeGameInDB(game, result, reason);
        this.disconnectAll(game);
        this.games.delete(game.uuid);
    },
    emitAll(game, type, packet){
        game.white.emit(type, packet);
        game.black.emit(type, packet);
        this.emitSpectators(game, type, packet);
    },
    emitSpectators(game, type, packet){
        for (let spectator of game.spectators){
            spectator.emit(type, packet);
        }
    },

    async storeGameInDB(game, result, reason){
        //Don't store games with only 1 move.
        if (game.move < 2){
            return;
        }

        const whiteUser = game.white.user.username;
        const blackUser = game.black.user.username;

        const duration = `${((game.endTime - game.startTime) / 60000).toFixed(3)} minutes`;
        let winner;
        if (result === "Draw"){
            winner = "Draw";
        }
        else{
            winner = result.split(" ")[0] === 'White' ? whiteUser : blackUser;
        }
        

        const gameDB = new gameModel({
            pgn: game.state.pgn(),
            fen: game.state.fen(),
            moves: game.move,
            black: blackUser, 
            white: whiteUser,
            winner: winner,
            reason: reason.split(" ")[2],
            duration: duration
        });

        try {
            let result = await gameDB.save();
            console.log("Game data successfully stored");
        }
        catch(error){
            console.log(error);
        }
    },

    disconnectAll(game){
        game.white.disconnect();
        game.black.disconnect();
        for (let spectator of game.spectators){
            spectator.disconnect();
        }
    }
}

loader();

module.exports = gameManager;
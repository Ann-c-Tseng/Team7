const gameManager = require("./gameManager");
const findUser = require("../dbActions/findUser");
const connectedUsers = require("../utils/connectedUsers");

const matchmaking = {
    //consider other data structures
    queue: [],
    addToMatchmaking(socket) {
        this.queue.push(socket);
        return this.pairPlayers();
    },

    removeFromMatchmaking(remove){
        this.queue = this.queue.filter((socket) => socket.id !== remove.id);
    },

    inMatchmaking(socket){
        return this.queue.some((s) => s.id === socket.id);
    },

    pairPlayers() {
        if (this.queue.length > 1){
            
            const rand = Math.random() > 0.5;

            const newGame = {
                white: rand ? this.queue[0] : this.queue[1],
                black: rand ? this.queue[1] : this.queue[0],
            }
            this.queue.splice(0,2);
            return newGame;
        }
        return null;
    }
}

const newConnection = async (socket) => {
    //Connection means they would like to play a game of chess.

    const user = await findUser(socket.handshake.query.email);
    if (!user){
        socket.disconnect("Could not find user account");
        return;
    }
    // else if (connectedUsers.has(user.email)){
    //     console.log("User tried to connect twice");
    //     socket.emit("alreadyConnected");
    //     socket.disconnect("Only one active connection per account allowed.");
    //     return;
    // }
    socket.user = user;
    connectedUsers.set(user.email, socket);

    //Disconnecting before a match is made should cause no penalty
    socket.on('disconnect', () => {
        matchmaking.removeFromMatchmaking(socket);
        console.log(socket.user.username + " has disconnected!");
        connectedUsers.delete(user.email);
    })


    const game = matchmaking.addToMatchmaking(socket)
    if (game !== null){
        console.log("a match made!");
        gameManager.addNewGame(game);
    }
}

module.exports = {
    matchmaking,
    newConnection
};
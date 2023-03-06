const gameManager = require("./gameManager");
const findUser = require("../dbActions/findUser");

const matchmaking = {
    queue: [],
    addToMatchmaking(socket) {
        this.queue.push(socket);
        return this.pairPlayers();
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
        socket.disconnect();
        return;
    }

    socket.user = user;

    //Disconnecting before a match is made should cause no penalty
    socket.on('disconnect', () => {
        console.log(socket.user.username + " has disconnected!");
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
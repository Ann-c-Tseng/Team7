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

module.exports = matchmaking;
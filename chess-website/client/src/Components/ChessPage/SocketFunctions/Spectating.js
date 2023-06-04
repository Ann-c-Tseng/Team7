const attachAll = (socket, parent) => {
    socket.on('move', (data) => {
        parent.attemptMove(data.move.from, data.move.to, data.move.promotion);
        parent.syncTimers(data.whiteTimeLeft, data.blackTimeLeft, data.timeSent);
    });

    socket.on('gameNotFound', () => {
        parent.setNotification("Error", "Game not found");
    });
}

export default attachAll;

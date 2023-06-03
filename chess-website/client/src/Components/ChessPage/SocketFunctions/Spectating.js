const attachAll = (socket, parent) => {
    socket.on('move', (data) => {
        parent.attemptMove(data.move);
        parent.syncTimers(data.whiteTimeLeft, data.blackTimeLeft, data.timeSent);
    });

    socket.on('gameNotFound', () => {
        parent.setNotification("Error", "Game not found");
    });
}

export default attachAll;

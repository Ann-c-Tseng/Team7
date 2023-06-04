const attachAll = (socket, parent) => {
    socket.on('opponentMove', (data) => {
        parent.opponentMove(data.move.from, data.move.to, data.move.promotion);
        parent.syncTimers(data.whiteTimeLeft, data.blackTimeLeft, data.timeSent);
    });

    socket.on('updateTimer', (data) => {
        parent.syncTimers(data.whiteTimeLeft, data.blackTimeLeft, data.timeSent);
    });
}

export default attachAll;

const bindOpponents = (socket, opponentSocket, parent) => {
  socket.on('disconnect', () => {
    parent.handlePlayerDisconnect(socket.game, socket.color);
  });
  socket.on('move', (move) => {
    try {
      parent.tryMove(socket.game, move, socket.color);
      const timeLeft = parent.getTimeleft(socket.game);
      opponentSocket.emit('opponentMove', {
        move,
        ...timeLeft,
      });
      socket.emit('updateTimer', timeLeft);
      parent.endMove(socket.game, socket.color);
    } catch (err) {
      console.log(err);
      console.log('Invalid move was sent to the server');
      socket.emit('invalid', {message: 'Invalid move'});
    }
  });
  socket.on('requestDraw', () => {
    if (opponentSocket.drawRequest) {
      parent.handleGameOver(socket.game, 'Draw', ' by Agreement');
    } else {
      opponentSocket.emit('requestDraw', {color: socket.color});
      parent.emitSpectators(socket.game, 'requestDraw', {color: socket.color});
      socket.drawRequest = true;
    }
  });
  socket.on('resign', () => {
    const winner = socket.color === 'w' ? 'Black' : 'White';
    const result = winner + ' has won';
    parent.handleGameOver(socket.game, result, ' by Resignation');
  });
};
module.exports = bindOpponents;

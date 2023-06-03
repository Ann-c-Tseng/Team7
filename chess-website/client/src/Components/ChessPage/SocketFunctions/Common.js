import { Chess } from "chess.js";

const attachAll = (socket, parent) => {
    socket.on('initialize', (data) => {
        parent.state.timers[0].time = data.black.time;
        parent.state.timers[1].time = data.white.time;
        
        parent.setState({
            game: new Chess(), 
            user: data.color,
            topUser: data.black.user,
            drawRequest: false,
            opponent: parent.getOpponentColor(data.color),
            timers: parent.state.timers,
            gameOver: false,
            moveNum: 0,
            moves: [],
            turn: "w",
            promoting: true,
        })
        if (data.color === "b"){
            parent.flipBoard();
            parent.setState({
                topUser: data.white.user,
                bottomUser: parent.props.user
            })
        }
    });

    socket.on('requestDraw', (data) => {
        console.log(data);
        parent.setState({
            drawRequest: true,
            drawRequestColor: data.color === 'w' ? "White" : "Black",
        });
    });

    socket.on('gameOver', (data) => {
        parent.setState({
            gameOver: true,
            drawRequest: false,
        });
        parent.gameOver(data.result, data.reason);
    });

    socket.on('alreadyConnected', () => {
        parent.setNotification("Already connected!", "Please use your other tab.");
    })
    socket.on('disconnect', (reason) => {
        console.log("Disconnected: " + reason)
    });
    socket.on('notify', (data) => {
        parent.setNotification(data.title, data.message);
    });
    socket.on('invalid', (data) => {
        console.log(data.message);
    });
    socket.on('blocked', (data) => {
        console.log(data);
    });
}
export default attachAll;
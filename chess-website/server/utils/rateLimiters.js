const rateLimiter = require("rate-limiter-flexible").RateLimiterMemory;
const pageLimiter = new rateLimiter({
    points: 5,
    duration: 1,
});

const chessPageLimiter = new rateLimiter({
    points: 10,
    duration: 1,
});

const pageLimiterMiddleware = function(req, res, next){
    pageLimiter.consume(req.ip)
    .then(() => {
        next();
    })
    .catch(() => {
        res.status(429).send("Too Many Requests");
    })
}

//For socket connections

const chessPageLimiterMiddleware = async function(socket, next){
    //Check rate limiting for connections first
    const ip = socket.handshake.address;
    try{
        await chessPageLimiter.consume(ip);
    }
    catch(e){
        return next(e);
    }

    socket.onAny(() => {
        chessPageLimiter.consume(ip)
        .catch((err) => {
            socket.emit("blocked", {
                success: false,
                message: "Too many requests, disconnected",
                err,
            });
            socket.disconnect();
        })
    })
    next();
}

module.exports = {
    pageLimiterMiddleware,
    chessPageLimiterMiddleware,
}
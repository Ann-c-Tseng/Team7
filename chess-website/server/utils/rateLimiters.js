const rateLimiter = require("rate-limiter-flexible").RateLimiterMemory;
const pageLimiter = new rateLimiter({
    points: 5,
    duration: 1,
});

const chessPageLimiter = new rateLimiter({
    points: 10,
    duration: 1,
});

//100 attempts per day, then lock for 24 hours.
//keys are IP only.

const maxLoginsPerDay = 100;
const maxConsecutiveLoginAttempts = 10;
const slowLoginBruteForceLimiter = new rateLimiter({
    points: maxLoginsPerDay,
    duration: 60 * 60 * 24, 
    blockDuration: 60 * 60 * 24,
})

//10 consecutive attempts will lock logins for 1 hour.
//Consecutive failed attempts are stored for 10 days.
//keys are username + IP.
const consecutiveLoginBruteForceLimiter = new rateLimiter({
    points: maxConsecutiveLoginAttempts,
    duration: 60 * 60 * 24 * 10,
    blockDuration: 60 * 60,
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

//Consume on both login limiters
const failedLoginAttempt = async (IP, username) => {
    let failed = false;
    //Don't immediately return so you can count on both limiters.
    try{
        await slowLoginBruteForceLimiter.consume(IP);
    }
    catch(err){
        failed = true;
    }

    const userIPKey = `${username}_${IP}`;
    try{
        await consecutiveLoginBruteForceLimiter.consume(userIPKey);
    }
    catch(err){
        failed = true;
    }
    return failed;
}

//reset consecutive limiter for IP/user pair
const successfulLogin = (IP, username) => {
    const userIPKey = `${username}_${IP}`;
    consecutiveLoginBruteForceLimiter.delete(userIPKey);
}
const isLoginLocked = async (IP, username) => {
    try{
        const slowLimiterStatus = await slowLoginBruteForceLimiter.get(IP);

        const userIPKey = `${username}_${IP}`;
        const consecutiveLimiterStatus = await consecutiveLoginBruteForceLimiter.get(userIPKey);

        return (slowLimiterStatus !== null && 
            slowLimiterStatus.consumedPoints > maxLoginsPerDay) ||
            (consecutiveLimiterStatus !== null && 
            consecutiveLimiterStatus.consumedPoints > maxConsecutiveLoginAttempts);
    }
    catch(e){

    }
    
    return true;
}

module.exports = {
    pageLimiterMiddleware,
    chessPageLimiterMiddleware,
    failedLoginAttempt,
    successfulLogin,
    isLoginLocked
}
const RateLimiter = require('rate-limiter-flexible').RateLimiterMemory;
const pageLimiter = new RateLimiter({
  points: 5,
  duration: 1,
});

const chessPageLimiter = new RateLimiter({
  points: 10,
  duration: 1,
});

// 100 attempts per day, then lock for 24 hours.
// keys are IP only.

const maxLoginsPerDay = 100;
const maxConsecutiveLoginAttempts = 10;
const slowLoginLimiter = new RateLimiter({
  points: maxLoginsPerDay,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 60 * 24,
});

// 10 consecutive attempts will lock logins for 1 hour.
// Consecutive failed attempts are stored for 10 days.
// keys are username + IP.
const consecutiveLoginLimiter = new RateLimiter({
  points: maxConsecutiveLoginAttempts,
  duration: 60 * 60 * 24 * 10,
  blockDuration: 60 * 60,
});

const pageLimiterMiddleware = function(req, res, next) {
  pageLimiter.consume(req.ip)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(429).send('Too Many Requests');
      });
};

// For socket connections

const chessPageLimiterMiddleware = async function(socket, next) {
  // Check rate limiting for connections first
  const ip = socket.handshake.address;
  try {
    await chessPageLimiter.consume(ip);
  } catch (e) {
    return next(e);
  }

  socket.onAny(() => {
    chessPageLimiter.consume(ip)
        .catch((err) => {
          socket.emit('blocked', {
            success: false,
            message: 'Too many requests, disconnected',
            err,
          });
          socket.disconnect();
        });
  });
  next();
};

// Consume on both login limiters
const failedLoginAttempt = async (IP, username) => {
  let failed = false;
  // Don't immediately return so you can count on both limiters.
  try {
    await slowLoginLimiter.consume(IP);
  } catch (err) {
    failed = true;
  }

  const userIPKey = `${username}_${IP}`;
  try {
    await consecutiveLoginLimiter.consume(userIPKey);
  } catch (err) {
    failed = true;
  }
  return failed;
};

// reset consecutive limiter for IP/user pair
const successfulLogin = (IP, username) => {
  const userIPKey = `${username}_${IP}`;
  consecutiveLoginLimiter.delete(userIPKey);
};
const isLoginLocked = async (IP, username) => {
  try {
    const slowLimiterStatus = await slowLoginLimiter.get(IP);

    const userIPKey = `${username}_${IP}`;
    const limiterStatus = await consecutiveLoginLimiter.get(userIPKey);

    return (slowLimiterStatus !== null &&
            slowLimiterStatus.consumedPoints > maxLoginsPerDay) ||
            (limiterStatus !== null &&
            limiterStatus.consumedPoints > maxConsecutiveLoginAttempts);
  } catch (e) {

  }

  return true;
};

module.exports = {
  pageLimiterMiddleware,
  chessPageLimiterMiddleware,
  failedLoginAttempt,
  successfulLogin,
  isLoginLocked,
};

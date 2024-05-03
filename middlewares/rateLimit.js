const rateLimit = require('express-rate-limit');

/**
 * The windowMs is the time window in ms. 
 * The max is the number of requets, that a user can maximum have in this window.
 * When a request is made from one ip-address, the express-rrate-limit checks how many requets,
 * frrom this ip address that has been made in the timei window. If it doesn't exceed the max,
 * the requet is processed as usual. Otherwise requests frrom this ip will be blocked, till the window has reset.
 */
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
  });

module.exports = apiLimiter; 
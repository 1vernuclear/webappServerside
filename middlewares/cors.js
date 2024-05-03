const cors = require('cors');

const corsOptions = {
    origin: 'https://webapp7.crabdance.com', // Only allow requests from this domain
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// Middleware to generate and attach CSRF token to response locals
const attachCsrfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

module.exports = { csrfProtection, attachCsrfToken };
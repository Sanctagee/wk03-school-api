// middleware/isAuthenticated.js
// Protects routes — only allows requests from logged-in users

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({
    error: 'Unauthorized. You must be logged in to access this resource.',
    loginUrl: '/auth/google'
  });
};

module.exports = isAuthenticated;

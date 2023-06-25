const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the request header, query parameter, or body
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Not Authorized' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ Error: 'Invalid token' });
    }
    // Token is valid
    req.body.lecturerId = decoded.userId;
    next();
  })
};

module.exports = authMiddleware;

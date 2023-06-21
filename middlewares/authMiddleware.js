const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the request header, query parameter, or body
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not provided' });
  }

  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded payload to the request object
    req.user = decodedToken;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;

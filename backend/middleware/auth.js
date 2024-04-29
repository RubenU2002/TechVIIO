import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer TOKEN"
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    // The result of jwt.verify() is the decoded token if it's valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Assign the decoded user to the request object
    req.user = decoded;
    // Continue with the middleware chain
    next();
  } catch (err) {
    // Log the error message for debugging purposes
    console.error('Error verifying token:', err.message);
    // Send a 403 Forbidden status if there's an error verifying the token
    res.status(403).send('Invalid token.');
  }
};

export default verifyToken;

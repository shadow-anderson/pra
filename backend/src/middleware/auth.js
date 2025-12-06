// Authentication middleware
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// Verify JWT token
exports.authenticate = async (req, res, next) => {
  try {
    // Get token from header
    // const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // if (!token) {
    //   return res.status(401).json({ error: 'Authentication required' });
    // }

    // Verify token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findById(decoded.userId);

    // if (!user) {
    //   return res.status(401).json({ error: 'User not found' });
    // }

    // req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Check user role/permissions
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // if (!roles.includes(req.user.role)) {
    //   return res.status(403).json({ error: 'Access denied' });
    // }
    next();
  };
};

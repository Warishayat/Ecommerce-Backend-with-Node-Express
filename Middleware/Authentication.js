const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. JWT is required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded_data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded_data; // attach user info to request
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authentication;

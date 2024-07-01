const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Access Denied");
  }

  const authHeader = req.headers.authorization.split(" ");
  const token = authHeader[1];

  if (!token) {
    return res.status(401).send("No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userID = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(400).send("Invalid Token");
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};

const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (req, res, next) => {
  // get token from header
  const token = req.header("x-auth-token");

  //   check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  //   verify token
  const decoded = jwt.verify(token, config.get("jwtSecret"));
  req.user = decoded.user;
  next();
  try {
  } catch (err) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
};

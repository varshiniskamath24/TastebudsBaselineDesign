const jwt = require("jsonwebtoken");

module.exports = function requireAuth(req, res, next) {
  const raw = req.headers.authorization;
  if (!raw || !raw.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token" });
  }

  const token = raw.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

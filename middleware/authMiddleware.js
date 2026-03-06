const jwt = require("jsonwebtoken")

function verifyJWT(req, res, next) {
 const authHeader = req.headers.authorization

 if (!authHeader) {
  return res.status(401).json({
   success: false,
   message: "Token missing"
  })
 }

 const [scheme, token] = authHeader.split(" ")

 if (scheme !== "Bearer" || !token) {
  return res.status(401).json({
   success: false,
   message: "Invalid authorization format"
  })
 }

 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.user = decoded
  next()
 } catch (err) {
  return res.status(403).json({
   success: false,
   message: "Invalid token"
  })
 }
}

module.exports = verifyJWT

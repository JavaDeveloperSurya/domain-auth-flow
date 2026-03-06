const generateToken = require("../utils/jwt")

const login = (req, res) => {
 if (!req.user) {
  return res.status(401).json({
   success: false,
   message: "Authentication failed"
  })
 }

 const token = generateToken(req.user)
 res.redirect(`/dashboard.html?token=${token}`)
}

module.exports = {
 login
}

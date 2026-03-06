const passport = require("passport");
const generateToken = require("../utils/jwt");

const login= (req,res)=>{
  const token = generateToken(req.user)
  res.redirect(`/dashboard.html?token=${token}`)
 }

module.exports = {
 login
}
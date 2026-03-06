const express = require("express")
const passport = require("passport")
const { login } = require("../controllers/authController")
const path = require("path")

const router = express.Router()

router.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "../views/login.html"))
})

router.get(
 "/auth/google",
 passport.authenticate("google", {
  scope: ["profile", "email"]
 })
)

router.get(
 "/auth/google/callback",
 passport.authenticate("google", {
  session: false,
  failureRedirect: "/auth/failed"
 }),
 login
)

router.get("/auth/failed", (req, res) => {
 res.status(401).json({
  success: false,
  message: "Google authentication failed"
 })
})

module.exports = router

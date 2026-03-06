const express = require("express");
const passport = require("passport");
const { login } = require("../controllers/authController");
const path=require("path")

const router = express.Router()
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});
router.get("/auth/google",
 passport.authenticate("google", {
  scope: ["profile","email"]
 })
)

router.get(
 "/auth/google/callback",
 passport.authenticate("google",{ session:false }),
 login
)

module.exports = router
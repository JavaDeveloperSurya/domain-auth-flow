require("dotenv").config()

const express = require("express")
const passport = require("passport")
const cors = require("cors")

require("./config/passport")

const authRoutes = require("./routes/authRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(passport.initialize())

app.use(express.static("public"))
app.use(express.static("views"))

app.use("/", authRoutes)
app.use("/", dashboardRoutes)

app.get("/api/health", (req, res) => {
 res.json({
  success: true,
  message: "Server is running"
 })
})

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
})

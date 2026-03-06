require("dotenv").config()

const express = require("express")
const passport = require("passport")
const cors = require("cors")
const path = require("path")

require("./config/passport")

const authRoutes = require("./routes/authRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")

const app = express()

app.use(cors())
app.use(express.json())
app.use(passport.initialize())

app.use(express.static("public"))
app.use(express.static("views"))

app.use("/", authRoutes)
app.use("/", dashboardRoutes)

app.listen(process.env.PORT, () => {
 console.log(`Server running on port ${process.env.PORT}`)
})
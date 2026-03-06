const express = require("express")
const verifyJWT = require("../middleware/authMiddleware")
const allowRoles = require("../middleware/roleMiddleware")
const { dashboard, dashboardAdmin } = require("../controllers/dashboardController")

const router = express.Router()

router.get("/api/dashboard", verifyJWT,dashboard)

router.get(
    "/api/admin",
    verifyJWT,
    allowRoles("admin"),
    dashboardAdmin
)

module.exports = router
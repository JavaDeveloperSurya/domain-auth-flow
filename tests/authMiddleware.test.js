const test = require("node:test")
const assert = require("node:assert/strict")
const jwt = require("jsonwebtoken")
const verifyJWT = require("../middleware/authMiddleware")

process.env.JWT_SECRET = "test-secret"

function createRes() {
 return {
  statusCode: 200,
  payload: null,
  status(code) {
   this.statusCode = code
   return this
  },
  json(body) {
   this.payload = body
   return this
  }
 }
}

test("verifyJWT rejects missing authorization header", () => {
 const req = { headers: {} }
 const res = createRes()
 let nextCalled = false

 verifyJWT(req, res, () => {
  nextCalled = true
 })

 assert.equal(nextCalled, false)
 assert.equal(res.statusCode, 401)
 assert.deepEqual(res.payload, {
  success: false,
  message: "Token missing"
 })
})

test("verifyJWT rejects malformed authorization header", () => {
 const req = { headers: { authorization: "Token abc" } }
 const res = createRes()
 let nextCalled = false

 verifyJWT(req, res, () => {
  nextCalled = true
 })

 assert.equal(nextCalled, false)
 assert.equal(res.statusCode, 401)
 assert.deepEqual(res.payload, {
  success: false,
  message: "Invalid authorization format"
 })
})

test("verifyJWT accepts valid bearer token", () => {
 const token = jwt.sign({ id: "u1", role: "user" }, process.env.JWT_SECRET)
 const req = { headers: { authorization: `Bearer ${token}` } }
 const res = createRes()
 let nextCalled = false

 verifyJWT(req, res, () => {
  nextCalled = true
 })

 assert.equal(nextCalled, true)
 assert.equal(req.user.id, "u1")
 assert.equal(req.user.role, "user")
})

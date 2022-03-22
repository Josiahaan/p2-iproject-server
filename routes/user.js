const express = require("express")
const routerUser = express.Router()
const UserController = require("../controllers/UserController")

routerUser.post("/register", UserController.register)
routerUser.post("/login", UserController.login)


module.exports = routerUser
const express = require("express")
const routerCartItem = express.Router()
const CartItemController = require("../controllers/CartItemController")
const isUser = require('../middlewares/authentication')

routerCartItem.get('/', isUser, CartItemController.getCart)
routerCartItem.post('/', isUser, CartItemController.addToCart)

module.exports = routerCartItem
const express = require("express")
const routerCartItem = express.Router()
const CartItemController = require("../controllers/CartItemController")

routerCartItem.get('/cartitems', CartItemController.getCart)
routerCartItem.post('/products:id', CartItemController.addToCart)

module.exports = routerCartItem
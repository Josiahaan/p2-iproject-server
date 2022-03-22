const { application } = require('express')
const express = require('express')
const routerShop = express.Router()
const ShopController = require('../controllers/ShopController')
const isUser = require('../middlewares/authentication')

routerShop.post('/', ShopController.addShop)
routerShop.put('/', isUser, ShopController.updateShop)
routerShop.get('/:userId', isUser, ShopController.getShopById)

module.exports = routerShop
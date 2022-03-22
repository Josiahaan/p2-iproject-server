const express = require("express")
const router = express.Router()
const routerUser = require("./user")
const routerCartItem = require("./cartitem")
const routerProduct = require("./product")
const routerShop = require('./shop')

router.use(routerUser)
router.use(routerCartItem)
router.use(routerProduct)
router.use(routerShop)


module.exports = router
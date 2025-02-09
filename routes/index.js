const express = require("express")
const router = express.Router()
const routerUser = require("./user")
const routerCartItem = require("./cartitem")
const routerProduct = require("./product")
const routerShop = require('./shop')
const routerPulsa = require('./pulsa')
const routerMidtrans = require("./midtrans")

router.use(routerUser)
router.use("/cartitem", routerCartItem)
router.use("/product", routerProduct)
router.use("/shop", routerShop)
router.use("/pulsa", routerPulsa)
router.use(routerMidtrans)


module.exports = router
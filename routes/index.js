const express = require("express")
const router = express.Router()
const routerUser = require("./user")
const routerCartItem = require("./cartitem")
const routerProduct = require("./product")

router.use(routerUser)
router.use(routerCartItem)
router.use(routerProduct)


module.exports = router
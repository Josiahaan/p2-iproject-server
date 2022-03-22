const express = require('express')
const routerPulsa = express.Router()
const PulsaController = require('../controllers/PulsaController')


routerPulsa.get("/", PulsaController.getPulsa)

module.exports = routerPulsa
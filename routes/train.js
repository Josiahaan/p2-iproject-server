const express = require('express')
const routerTrain = express.Router()
const TrainController = require('../controllers/TrainController')

routerTrain.get('/', TrainController.trainSchedules)

module.exports = routerTrain
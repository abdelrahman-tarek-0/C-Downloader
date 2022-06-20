const express = require('express')
const routes = express.Router()
const controller = require('../../handlers/facebook.controller')

routes.get('/HD', controller.high)
routes.get('/SD', controller.low)

module.exports = routes
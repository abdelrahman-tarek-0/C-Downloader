const express = require('express')
const routes = express.Router()
const controller = require('../../handlers/facebook.controller')

routes.get('/', controller.all)

module.exports = routes

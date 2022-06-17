const express = require('express')
const routes = express.Router()
const controller = require('../../handlers/youtube.controller.js')

routes.get('/', controller.mp4)

module.exports = routes

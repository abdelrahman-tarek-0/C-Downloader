const express = require('express')
const routes = express.Router()
const controller = require('../../handlers/youtube.controller.js')

routes.get('/mp4', controller.mp4)
routes.get('/mp3', controller.mp3)
routes.get('/quality', controller.quality)


module.exports = routes

const express = require('express')
const youtubeRoutes = require('./APIs/youtube.routes.js')
const routes = express.Router()

routes.get('/', (req, res) => {
   res.json({ message: 'main api route' })
})

routes.use('/Youtube', youtubeRoutes)

module.exports = routes

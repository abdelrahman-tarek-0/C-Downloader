const {videoGrabber} = require('../modules/facebookUrl.module')
const config = require('../config')

const all = async (req, res, next) => {
    try {
        const url = req.query.url
        const cookie = req.headers.cookie || config.publicCookie
        const data = await videoGrabber(url, cookie)
        res.json(data)
    } catch (error) {
        next(error)
    }
}


module.exports = { all }

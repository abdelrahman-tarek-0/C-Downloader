const fbvid = require('fbvideos');



const high = async (req, res , next) => {
    try {
        const url = req.query.url
        const video = await fbvid.high(url)
        res.json({vid:video})
    } catch (error) {
        next(error)
    }
}
const low = async (req, res , next) => {
    try {
        const url = req.query.url
        const video = await fbvid.low(url)
        res.json({vid:video})
    } catch (error) {
        next(error)
    }
}


module.exports = {high,low}
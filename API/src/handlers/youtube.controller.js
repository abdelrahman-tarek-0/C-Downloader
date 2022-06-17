const ytdl = require('ytdl-core')

const quality = async (req, res, next) => {
   try {
      const url = req.query.url
      let quality = []
      if (ytdl.validateURL(url)) {
        let info = await ytdl.getInfo(url);
        for(let i = 0; i < info.formats.length; i++) {
            quality.push({quality:info.formats[i].qualityLabel,itag:info.formats[i].itag})
        }
        // remove duplicated quality label , itag and null in the array
        quality = quality.filter((item, index, arr) => {
            return arr.map(mapItem => mapItem.quality).indexOf(item.quality) === index && arr.map(mapItem => mapItem.itag).indexOf(item.itag) === index && item.quality !== null
        })
        console.log(quality);
      }
   } catch {
      next(Error)
   }
}
const mp4 = async (req, res, next) => {
    try {
       const url = req.query.url
       const quality = req.query.quality
       if (ytdl.validateURL(url)) {
          ytdl(url)
            .on('info', (info) => {
               res.header(
                  'Content-Disposition',
                  `attachment; filename="${info.videoDetails.title}.mp4"`
               )
            })
            .on('error', (error) => {
               return res.status(400)
            })
            .pipe(res)
       }
    } catch {
       next(Error)
    }
 }

module.exports = { mp4 }

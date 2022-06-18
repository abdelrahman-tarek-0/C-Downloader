const ytdl = require('ytdl-core')

const quality = async (req, res, next) => {
   try {
      const url = req.query.url
      const audioOrVideo = req.query.format
      const quality = []
      if (ytdl.validateURL(url)) {
         if (audioOrVideo === 'video') {
            const info = await ytdl.getInfo(url)

            for (let i = 0; i < info.formats.length; i++) {
               if (
                  info.formats[i].hasVideo &&
                  info.formats[i].hasAudio &&
                  info.formats[i].qualityLabel !== null
               ) {
                  quality.push({
                     quality: info.formats[i].qualityLabel,
                     itag: info.formats[i].itag,
                  })
               }
            }
            res.json({ quality: quality })
         } else if (audioOrVideo === 'audio') {
            const info = await ytdl.getInfo(url)
            for (let i = 0; i < info.formats.length; i++) {
               if (!info.formats[i].hasVideo && info.formats[i].hasAudio) {
                  quality.push({
                     quality: `${info.formats[i].audioBitrate}kp`,
                     itag: info.formats[i].itag,
                  })
               }
            }
            res.json({ quality: quality })
         }
      }else{
         throw new Error('invalid url')
      }
   } catch (error) {
      next(error)
   }
}
const mp4 = async (req, res, next) => {
   try {
      const url = req.query.url
      const quality = req.query.quality
      if (ytdl.validateURL(url)) {
         ytdl(url, {
            quality: quality,
         })
            .on('info', (info) => {
               res.header(
                  'Content-Disposition',
                  `attachment; filename="${info.videoDetails.title}.mp4"`
               )
            })
            .pipe(res)
      }else{
         throw new Error('invalid url')
      }
   } catch (error) {
      next(error)
   }
}
const mp3 = async (req, res, next) => {
   try {
      console.log('mp3')
      const url = req.query.url
      const quality = req.query.quality
      if (ytdl.validateURL(url)) {
         ytdl(url, {
            quality: quality,
         })
            .on('info', (info) => {
               res.header(
                  'Content-Disposition',
                  `attachment; filename="${info.videoDetails.title}.mp4"`
               )
            })
            .pipe(res)
      }else{
         throw new Error('invalid url')
      }
   } catch (error) {
      next(error)
   }
}

module.exports = { mp4, quality, mp3 }

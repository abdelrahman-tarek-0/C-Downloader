const ytdl = require("ytdl-core");

const mp4 = (req, res) => {
   const date = new Date();
   const dateString =
    date.getMonth() +
    "-" +
    date.getDate() +
    "-" +
    date.getFullYear() +
    "-" +
    date.getHours() +
    "-" +
    date.getMinutes() +
    "-" +
    date.getSeconds();

   const url = req.query.url;
    console.log(url);
    res.header('Content-Disposition', `attachment; filename="vid-${dateString}.mp4"`)
    ytdl(url).on("error",(error)=>{
        return res.status(400).json( {"error": `${error}`} )
    }).pipe(res);
  console.log("sent");
}

module.exports = { mp4 }

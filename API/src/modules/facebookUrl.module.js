const axios = require('axios')
const jsdom = require("jsdom");
const config = require('../config')
const { JSDOM } = jsdom


// cookie required for private facebook groups and pages
// i added a public cookie for acccessing public groups and pages

const videoGrabber = async (url,cookie = config.publicCookie) => {
    let URLs = []
    const res = await axios.request({
       url: url,
       method: 'GET',
       headers: {
          cookie: cookie,
          'Upgrade-Insecure-Requests': '1',
          'User-Agent':
             'Mozilla/5.0(WindowsNT10.0;Win64;x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/84.0.4147.89Safari/537.36',
          Accept:
             'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-User': '?1',
          'Sec-Fetch-Dest': 'document',
          'Accept-Language': 'en-US,en;q=0.9',
       },
    })
    const dom = new JSDOM(res.data);
 
    function get_elements_by_inner(word) {
     let res=[];
     let elems = [...dom.window.document.getElementsByTagName('script')];
     elems.forEach((elem) => {
         if(elem.outerHTML.includes(word)) {
             res.push(elem)
         }
     })
     return(res)
    }
 
    let quality = [
       '4320p',
       '2160p',
       '1440p',
       '1080p',
       '960p',
       '840p',
       '720p',
       '640p',
       '540p',
       '480p',
       '360p',
       '270p',
       '240p',
       '180p',
       '144p',
       '108p',
       '72p',
    ]
 
    let script = get_elements_by_inner('playable_url":"')[0].innerHTML
    if (script.includes('playable_url":"')) {
       let videoUrl = script
          .split('playable_url":"')[1]
          .split('"')[0]
          .replaceAll('&amp;', '&')
          .replaceAll('\\u0025', '%')
          .replaceAll('\\', '')
         
       if (!(videoUrl == 'null')) {
          URLs.push({ quality: 'SD', url: videoUrl, audio: true, note:"source(low) quality with audio"})
       }
    }
    if (script.includes('playable_url_quality_hd":')) {
       let videoUrl = script
          .split('playable_url_quality_hd":')[1]
          .split(',"')[0]
          .replaceAll('&amp;', '&')
          .replaceAll('\\u0025', '%')
          .replaceAll('\\', '')
       if (!(videoUrl == 'null')) {
          URLs.push({ quality: 'HD', url: videoUrl,audio: true,note:"High quality with audio"})
       }
    }
    for (let i = 0; i < quality.length; i++) {
       if (script.includes(`FBQualityLabel=\\"${quality[i]}\\`)) {
          let videoUrl = script
             .split(`FBQualityLabel=\\"${quality[i]}\\">\\u003CBaseURL>`)[1]
             .split('\\u003C')[0]
             .replaceAll('"', '')
             .replaceAll('&amp;', '&')
             .replaceAll('\\u0025', '%')
             .replaceAll('\\', '')
          if (!(videoUrl == 'null')) {
             URLs.push({
                quality: `${quality[i]}`,
                url: videoUrl,
                audio: false,
             })
          }
       }
    }
    if (script.includes('"audio":[{"url":"')) {
       let audioUrl = script
          .split('"audio":[{"url":"')[1]
          .split('"')[0]
          .replaceAll('&amp;', '&')
          .replaceAll('\\u0025', '%')
          .replaceAll('\\', '')
       if (!(audioUrl == 'null')) {
          URLs.push({ quality: 'audio', url: audioUrl, audio: true })
       }
    }
    console.log(URLs)
 }
 
 
 
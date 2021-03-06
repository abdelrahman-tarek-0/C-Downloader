const backEnd = 'http://localhost:3000'
const searchBtn = document.querySelector('#btn')
const youtubePlaceholder = document.querySelector('#youtubePlaceholder')
const botnsContainer = document.querySelector('#quality')
let url = ''

/*
html structure

-body

   -input-text
      url

   -btn

   -format
      audio
      video

   -youtubePlaceholder
      iframe-youtube (if loaded)

   -quality
      loader
      botns (if loaded)
*/

searchBtn.addEventListener('click', async () => {
   // rest of the code
   youtubePlaceholder.innerHTML = ''
   botnsContainer.innerHTML = '<div id="loader"></div>'
   document.querySelector('#url').focus()

   try {
      url = document.querySelector('#url').value
      if (!url) {
         alert('please enter a url')
         return
      }

      const loader = document.querySelector('#loader')
      loader.style.display = 'block'

      const BackEndURL = videoOrAudioURL(quality, 'qualityRoute')
      const res = await fetch(BackEndURL)

      if (res.ok) {
         const data = await res.json()
         loader.style.display = 'none'
         updateQualityUi(data.quality)
      } else {
         const error = await res.json()
         alert('error: ' + error.message + '\nstatus: ' + res.status)
         loader.style.display = 'none'
      }
   } catch (error) {
      if (error.message === 'Failed to fetch') {
         alert('server is down :(\n please try again later')
         loader.style.display = 'none'
      } else {
         alert('error: ' + error.message)
         loader.style.display = 'none'
      }
   }
})

const updateQualityUi = (data) => {
   const scrVideo = `https://www.youtube.com/embed/${url.split('=')[1]}`
   youtubePlaceholder.innerHTML = `<iframe width="420" height="315" id="video" src="${scrVideo}"></iframe>`
   botnsContainer.innerHTML = '<div id="loader"></div>'
   for (let i = 0; i < data.length; i++) {
      botnsContainer.innerHTML += `<button class="${data[i].itag} botns">${data[i].quality}</button>`
   }
}

botnsContainer.addEventListener('click', async (e) => {
   if (e.target.classList.contains('botns')) {
      try {
         const quality = e.target.classList[0]
         const BackEndURL = videoOrAudioURL(quality, 'downloadRoute')
         const res = await fetch(BackEndURL)
         if (res.ok) {
            window.open(BackEndURL)
         } else {
            alert('something went wrong')
         }
      } catch (error) {
         alert(`error: ${error.message}`)
      }
   }
})

const videoOrAudioURL = (quality, route) => {
   let YoutubeBackEndURL = ''
   const videoOrAudio = document.querySelector('#format').selectedIndex
   if (route === 'qualityRoute') {
      if (videoOrAudio === 0) {
         YoutubeBackEndURL = `${backEnd}/api/Youtube/quality?url=${url}&format=audio`
         return YoutubeBackEndURL
      } else if (videoOrAudio === 1) {
         YoutubeBackEndURL = `${backEnd}/api/Youtube/quality?url=${url}&format=video`
         return YoutubeBackEndURL
      }
   } else if (route === 'downloadRoute') {
      if (videoOrAudio === 0) {
         YoutubeBackEndURL = `${backEnd}/api/Youtube/mp3?url=${url}&quality=${quality}`
         return YoutubeBackEndURL
      } else if (videoOrAudio === 1) {
         YoutubeBackEndURL = `${backEnd}/api/Youtube/mp3?url=${url}&quality=${quality}`
         return YoutubeBackEndURL
      }
   }
}

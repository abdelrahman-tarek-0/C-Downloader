const btn = document.querySelector('#btn')
let url = ''
const backEnd = 'http://localhost:3000'
const botnsContainer = document.querySelector('#quality')

btn.addEventListener('click', async () => {
   try {
      url = document.querySelector('#url').value

      if (!url) {
         alert('please enter a url')
         return
      }

      let VideoBackEndUrl = ''
      if (document.querySelector('#format').selectedIndex === 0) {
         VideoBackEndUrl = `${backEnd}/api/Youtube/quality?url=${url}&format=audio`
      } else if (document.querySelector('#format').selectedIndex === 1) {
         VideoBackEndUrl = `${backEnd}/api/Youtube/quality?url=${url}&format=video`
      }

      const res = await fetch(VideoBackEndUrl)
      if (res.ok) {
         const data = await res.json()
         updateQualityUi(data.quality)
      } else {
         const error = await res.json()
         alert('error: ' + error.message + '\nstatus: ' + res.status)
      }
   } catch (error) {
      if (error.message === 'Failed to fetch') {
         alert('server is down :(\n please try again later')
      } else {
         alert('error: ' + error.message)
      }
   }
})

const updateQualityUi = (data) => {
   const scrVideo = `https://www.youtube.com/embed/${url.split('=')[1]}`

   const youtubePlaceholder = document.querySelector('#youtubePlaceholder')
   youtubePlaceholder.innerHTML = `<iframe width="420" height="315" id="video" src="${scrVideo}"></iframe>`

   botnsContainer.innerHTML = ''

   for (let i = 0; i < data.length; i++) {
      botnsContainer.innerHTML += `<button class="${data[i].itag} botns">${data[i].quality}</button>`
   }
}
// after click on any new botns , it will download the video
botnsContainer.addEventListener('click', async (e) => {
   if (e.target.classList.contains('botns')) {
      try{
         const quality = e.target.classList[0]
         let VideoBackEndUrl = ''

         if (document.querySelector('#format').selectedIndex === 0) {
            VideoBackEndUrl = `${backEnd}/api/Youtube/mp3?url=${url}&quality=${quality}`
            console.log(VideoBackEndUrl);
         } else if (document.querySelector('#format').selectedIndex === 1) {
            VideoBackEndUrl = `${backEnd}/api/Youtube/mp4?url=${url}&quality=${quality}`
         }

         const res = await fetch(VideoBackEndUrl)
         if (res.ok) {
            window.open(VideoBackEndUrl)
         } else {
            alert('something went wrong')
         }
      }catch(error){
         alert('')
      }
      

   }
})

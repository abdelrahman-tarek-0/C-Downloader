const btn = document.querySelector('#btn')
const backEnd = 'http://localhost:3000'

btn.addEventListener('click', async () => {
   try {
      const url = document.querySelector('#url').value
      const scrVideo = `https://www.youtube.com/embed/${url.split('=')[1]}`
      if (!url) {
         alert('please enter a url')
         return
      }
      const youtubePlaceholder = document.querySelector('#youtubePlaceholder')
      youtubePlaceholder.innerHTML = `<iframe width="420" height="315" id="video" src="${scrVideo}"></iframe>`
      let URL
      if (document.querySelector('#format').selectedIndex === 0) {
         URL = `${backEnd}/api/Youtube/quality?url=${url}&format=audio`
      } else if (document.querySelector('#format').selectedIndex === 1) {
         URL = `${backEnd}/api/Youtube/quality?url=${url}&format=video`
      }
      const res = await fetch(URL)
      data = await res.json()
      updateQualityUi(data.quality)
   } catch {
      alert('can not fitch')
   }
})

const updateQualityUi = (data) => {
   const quality = document.querySelector('#quality')
   quality.innerHTML = ''
   for (let i = 0; i < data.length; i++) {
      quality.innerHTML += `<button class="${data[i].itag} botns">${data[i].quality}</button>`
   }
}
// after click on any new botns , it will download the video
document.addEventListener('click', async (e) => {
   if (e.target.classList.contains('botns')) {
      const url = document.querySelector('#url').value
      const quality = e.target.classList[0]
      let URL
      if (document.querySelector('#format').selectedIndex === 0) {
         URL = `${backEnd}/api/Youtube/mp3?url=${url}&quality=${quality}`
      } else if (document.querySelector('#format').selectedIndex === 1) {
         URL = `${backEnd}/api/Youtube/mp4?url=${url}&quality=${quality}`
      }
      console.log(`${url} \n ${quality} \n ${URL}`)
      const res = await fetch(URL)
      if (res.ok) {
         window.open(URL)
      } else {
         alert('something went wrong')
      }
   }
})

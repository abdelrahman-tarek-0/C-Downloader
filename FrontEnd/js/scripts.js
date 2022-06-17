const btn = document.querySelector('#btn')
const url = 'http://localhost:3000'

btn.addEventListener('click', () => {
   fetch(url + '/api/Youtube/mp4?url=https://www.youtube.com/watch?v=BZP1rYjoBgI')
      .then((data) => {
         console.log(data)
      })
})


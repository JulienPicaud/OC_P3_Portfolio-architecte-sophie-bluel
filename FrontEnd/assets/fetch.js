// cette fonction joue fetch, supprime la galerie puis en recréée une
function getProject() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://localhost:5678/api/works", requestOptions)
  .then(response => response.json())
  .then((result) => {
  console.log(result)
  deleteGallery()
  createGallery(result)
})
  .catch(error => console.log('error', error))
}

// On supprime la div gallery
function deleteGallery() {
  let gallery = document.querySelector('.gallery');
  gallery.remove();
}

// On recré la gallerie
function createGallery(param1) {
  let gallery = document.createElement('div'); 
  let portfolio = document.getElementById('portfolio')
  gallery.setAttribute('class', 'gallery');
  portfolio.appendChild(gallery)

  param1.forEach((project) => {
    const figure = document.createElement('figure')
    const img = document.createElement('img');
    const figureCaption = document.createElement('figureCaption');
  
    img.src = project.imageUrl;
    img.alt = project.title
    figureCaption.textContent = project.title;
  
  figure.appendChild(img)
  figure.appendChild(figureCaption)
  gallery.appendChild(figure)

  })
}

getProject()


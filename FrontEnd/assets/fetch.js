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
function createGallery(projects) {
  let gallery = document.createElement('div'); 
  let portfolio = document.getElementById('portfolio')
  gallery.setAttribute('class', 'gallery');
  portfolio.appendChild(gallery)
  

  function attributeProject() {
  projects.forEach((project) => {
    const figure = document.createElement('figure')
    const img = document.createElement('img');
    const figureCaption = document.createElement('figureCaption');
  
    img.src = project.imageUrl;
    img.alt = project.title
    figureCaption.textContent = project.title;
  
  figure.appendChild(img)
  figure.appendChild(figureCaption)
  gallery.appendChild(figure)

  })}
  attributeProject()
}
getProject()

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////


function getCategories() {
  // Fetch les categories sur l'API
  let requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };

  fetch("http://localhost:5678/api/categories", requestOptions)
      .then(response => response.json())
      .then((filters) => {
          deleteGallery()
          createFilters(filters)
      })
      .catch(error => console.log('error', error))
}

function createFilters(filters) {
  let gallery = document.createElement('div');
  let portfolio = document.getElementById('portfolio')
  gallery.setAttribute('class', 'gallery');
  portfolio.appendChild(gallery)

  filters.forEach((filter) => {
      const figure = document.createElement('figure')
      const img = document.createElement('img');
      const figureCaption = document.createElement('figureCaption');

      img.src = filter.imageUrl;
      img.alt = filter.title
      figureCaption.textContent = filter.title;

      figure.appendChild(img)
      figure.appendChild(figureCaption)
      gallery.appendChild(figure)

  })
}

getCategories()

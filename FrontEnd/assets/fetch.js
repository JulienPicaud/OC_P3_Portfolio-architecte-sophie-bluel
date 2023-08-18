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

  }) 

}
function attributeProject() {
}

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
      const monSet = new Set(filters);
      console.log(monSet)
      createButton(monSet)

      //createFilters(filters)
    })
    .catch(error => console.log('error', error))
}

function createButton(filters){

let filtersButton = document.getElementById('filtersButton');

let resetButton = document.createElement('input');
resetButton.setAttribute('class', 'resetButton')
resetButton.type ='button'
resetButton.value = "Réinitialiser"
filtersButton.appendChild(resetButton)

  filters.forEach((filter) => {
  let input = document.createElement('input');
  input.setAttribute('class', 'button')
  filtersButton.appendChild(input)

  input.value = filter.name
  input.type = 'button'
})
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
getProject()
getCategories()
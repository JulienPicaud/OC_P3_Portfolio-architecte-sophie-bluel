let projectsList = []
let categoriesList = []
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
// cette fonction joue fetch, supprime la galerie puis en recréée une

/**
 * get all pictures and display
 */
function getProject() {
    fetch("http://localhost:5678/api/works", requestOptions)
        .then(response => response.json())
        .then((result) => {
            projectsList = result
            niceGallery(projectsList)
        })
        .catch(error => console.log('error', error))
}

/**
 * get categories and categories's data
 */
function getCategories() {
    fetch("http://localhost:5678/api/categories", requestOptions)
        .then(response => response.json())
        .then((filters) => {
            const monSet = new Set(filters);
            categoriesList = monSet
            createButton(monSet)

        })
        .catch(error => console.log('error', error))
}

/**
 * delete div .gallery
 */
function deleteGallery() {
    let gallery = document.querySelector('.gallery');
    gallery.remove();
}

/**
 * reset gallery
 */
function niceGallery() {
    deleteGallery()
    createGallery(projectsList)
}

// On recré la div gallery
function createGallery(projectsList) {
    let portfolio = document.getElementById('portfolio')

    // let gallery = document.createElement('div');
    // gallery.setAttribute('class', 'gallery');
    // portfolio.appendChild(gallery)
    let gallery = createMarkup('div', portfolio, { class: 'gallery' })

    projectsList.forEach((project) => {
        // const figure = document.createElement('figure')
        // const img = document.createElement('img');
        // const figureCaption = document.createElement('figureCaption');
        const figure = createMarkup('figure', gallery);
        createMarkup('img', figure, { src: project.imageUrl, alt: project.title });
        const figureCaption = createMarkup('figureCaption', figure, {}, project.title);
        // figureCaption.textContent = project.title;

        // img.src = project.imageUrl;
        // img.alt = project.title

        // figure.appendChild(img)
        // figure.appendChild(figureCaption)
        // gallery.appendChild(figure)

    })

}


/**
 * creates the buttons according to fetched categories
 * @param {set} categoriesList 
 */
function createButton(categoriesList) {

    let filtersButton = document.getElementById('filtersButton');

    // let resetButton = document.createElement('input');
    // resetButton.setAttribute('class', 'resetButton')
    // resetButton.type = 'button'
    // resetButton.value = "Réinitialiser"
    // filtersButton.appendChild(resetButton)
    let resetButton = createMarkup('input', filtersButton, { value: 'Tous', type: 'button', class: 'button' })
    resetButton.addEventListener('click', () => {
        niceGallery();
    })
    categoriesList.forEach((category) => {

        // let input = document.createElement('input');
        // input.setAttribute('class', 'button')
        // filtersButton.appendChild(input)
        // input.value = category.name
        // input.type = 'button'
        let input = createMarkup('input', filtersButton, { value: category.name, type: 'button', class: 'button' })

        input.addEventListener("click", () => {
            filterObject(category.id)
        })
    })
}


/**
 * create a tag and bind it to the DOM
 * @param {string} tag 
 * @param {htmlElement} parent 
 * @param {object} attributes 
 * @param {string} content 
 */
function createMarkup(tag, parent, attributes = {}, content = '') {
    let htmlElement = document.createElement(tag);
    htmlElement.innerHTML = content;
    if (Object.keys(attributes).length > 0) {
        for (const [key, value] of Object.entries(attributes)) {
            htmlElement.setAttribute(key, value);
        }
    }
    parent.appendChild(htmlElement);
    return htmlElement;
}



/**
 * clean the last gallery and display filtered elements
 * @param {set} categoriesList 
 */
function filterObject(categoriesList) {
    //   deleteGallery()
    //   let gallery = document.createElement('div');
    //   let portfolio = document.getElementById('portfolio')
    //   gallery.setAttribute('class', 'gallery');
    //   portfolio.appendChild(gallery)
    let gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''

    let filteredEntities = projectsList.filter((p) => {
        return p.category.id === categoriesList
    })

    filteredEntities.forEach((objets) => {

        const figure = createMarkup('figure', gallery);
        createMarkup('img', figure, { src: objets.imageUrl, alt: objets.title });
        const figureCaption = createMarkup('figureCaption', figure, {}, objets.title);

        //  const figure = document.createElement('figure')
        //  const img = document.createElement('img');
        //   const figureCaption = document.createElement('figureCaption');

        //  img.src = objets.imageUrl;
        //    img.alt = objets.title
        //   figureCaption.textContent = objets.title;

        //   figure.appendChild(img)
        //  figure.appendChild(figureCaption)
        //   gallery.appendChild(figure)

    })
}

getProject()
getCategories()



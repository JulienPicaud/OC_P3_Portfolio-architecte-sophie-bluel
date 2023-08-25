let projectsList = []
let categoriesList = []
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

/**
 * get all pictures and display
 */
function getProject() {
    fetch("http://localhost:5678/api/works", requestOptions)
        .then(response => response.json())
        .then((result) => {
            projectsList = result
            resetGallery(projectsList)
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
function resetGallery() {
    deleteGallery()
    createGallery(projectsList)
}

// On recré la div gallery
function createGallery(projectsList) {
    let portfolio = document.getElementById('portfolio')
    let gallery = createMarkup('div', portfolio, { class: 'gallery' })
    projectsList.forEach((project) => {
        const figure = createMarkup('figure', gallery);
        createMarkup('img', figure, { src: project.imageUrl, alt: project.title });
        createMarkup('figureCaption', figure, {}, project.title);
    })
}

/**
 * creates the buttons according to fetched categories
 * @param {set} categoriesList 
 */

function createButton(categoriesList) {
    let filtersButton = document.getElementById('filtersButton');
    let resetButton = createMarkup('input', filtersButton, { value: 'Tous', type: 'button', class: 'button' })
    resetButton.addEventListener('click', () => {
        resetGallery();
    })
    categoriesList.forEach((category) => {
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
    parent.appendChild(htmlElement);
    if (Object.keys(attributes).length > 0) {
        for (const [key, value] of Object.entries(attributes)) {
            htmlElement.setAttribute(key, value);
        }
    }
    htmlElement.innerHTML = content;
    return htmlElement;
}

/**
 * clean the last gallery and display filtered elements
 */
function filterObject(categoriesList) {
    let gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''

    let filteredProjects = projectsList.filter((p) => {
        return p.category.id === categoriesList
    })
    filteredProjects.forEach((objets) => {
        const figure = createMarkup('figure', gallery);
        createMarkup('img', figure, { src: objets.imageUrl, alt: objets.title });
        createMarkup('figureCaption', figure, {}, objets.title);
    })
}

getProject()
getCategories()



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
            let buttonModal = document.querySelector('.boxModal')
            buttonModal.addEventListener('click', openModal)

            createGalleryModal(projectsList)
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
/**Requete Delete 1 project gallery by using ID */

let formdata = new FormData();
formdata.append("email", "string");
formdata.append("password", "string");

let requestOptionsDelete = {
    method: 'DELETE',
    body: formdata,
    redirect: 'follow'
};

function deleteProject() {
    fetch("http://localhost:5678/api/works/{id}", requestOptionsDelete)
        .then(response => response.json())
        .then(result => console.log(result))
        document.querySelector('.fa-solid fa-trash-can').addEventListener('click', deletePicture)
        .catch(error => console.log('error', error));
}
//Const deletePicture = function(e) {
//
//}

// On recré la div gallery sur l'index.html
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

/** Gère la modale 1**/

const stopPropagation = function (e) {
    e.stopPropagation()
}
let modal = null;

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null;
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.close').addEventListener('click', closeModal)
    modal.querySelector('.modalPropagation').addEventListener('click', stopPropagation)
    getProject()


}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.close').removeEventListener('click', closeModal)
    modal.querySelector('.modalPropagation').removeEventListener('click', stopPropagation)
    modal = null
    deleteGalleryModal()
}
function createGalleryModal(projectsList) {
    let portfolio = document.querySelector('.allProjects')
    projectsList.forEach((project) => {
        createMarkup('img', portfolio, { src: project.imageUrl, alt: project.title });
        createMarkup('i', portfolio,{class:'fa-solid fa-trash-can', style : 'color: #000000'})
    })
}


function deleteGalleryModal() {
    let portfolio = document.querySelector('.allProjects')
    portfolio.innerHTML = ''
}

/******** MODAL 2*******/
const changeModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null;
    document.getElementById('modal1').style.display = "none";
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.close').addEventListener('click', closeModal)
    modal.querySelector('.modalPropagation').addEventListener('click', stopPropagation)
}

let buttonModal2 = document.getElementById('ButtonAdd')
buttonModal2.addEventListener('click', changeModal)






getProject()
getCategories()

//post -> ok add projects list, reset gallery
// delete -> supp projet dans l'array projectsList puis reset gallery
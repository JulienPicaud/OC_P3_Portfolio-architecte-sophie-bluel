let projectsList = []
let categoriesList = []
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
let modal = null;
let monToken = localStorage.getItem("token");

/*** get all pictures and display ***/
function getProject() {
    fetch("http://localhost:5678/api/works", requestOptions)
        .then(response => response.json())
        .then((result) => {
            projectsList = result
            console.log(projectsList)
            let buttonModal = document.querySelector('.boxModal')
            buttonModal.addEventListener('click', openModal)
            createGalleryModal(projectsList)
            resetGallery(projectsList)
        })
        .catch(error => console.log('error', error))
}


/*** get categories and categories's data ***/
function getCategories() {
    fetch("http://localhost:5678/api/categories", requestOptions)
        .then(response => response.json())
        .then((filters) => {
            const monSet = new Set(filters);
            categoriesList = monSet
            createButton(monSet)

            //passe de la modale 1 à 2
            let buttonModal2 = document.getElementById('ButtonAdd')
            buttonModal2.addEventListener('click', changeModal)
            let buttonModal3 = document.getElementById('backLeft')
            buttonModal3.addEventListener('click', changeModal2)
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

/** creates the buttons according to fetched categories **/

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

/*** clean the last gallery and display filtered elements ***/
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
    deleteListModal()
}

function createGalleryModal(projectsList) {
    let portfolio = document.querySelector('.allProjects')
    projectsList.forEach((project) => {
        const divTrash = createMarkup('div', portfolio, { class: 'bins', Id: project.id })
        createMarkup('img', divTrash, { src: project.imageUrl, alt: project.title, });
        const poubs = createMarkup('i', divTrash, { class: 'fa-solid fa-trash-can', style: 'color: #000000', })

        poubs.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const idProject = divTrash.id;
            console.log(divTrash);
            let response = await fetch(
                `http://localhost:5678/api/works/${idProject}`,
                {
                    method: "DELETE",
                    headers: {
                        accept: "*/*",
                        Authorization: `Bearer ${monToken}`,
                    },
                }
            );
            if (response.ok) {
                return false;
                // if HTTP-status is 200-299
                //alert("Photo supprimé avec succes");
                // obtenir le corps de réponse (la méthode expliquée ci-dessous)
            } else {
                alert("Echec de suppression");
            }
        });
        //document.querySelector('.fa-solid.fa-trash-can').addEventListener('click', deletePicture)
    })
}

function deleteGalleryModal() {
    let portfolio = document.querySelector('.allProjects')
    portfolio.innerHTML = ''
}
function deleteListModal(){
    document.getElementById('listCategoriesModale2').innerHTML = ''
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
    const listCategoriesModale2 = document.getElementById('listCategoriesModale2')
    createMarkup('label', listCategoriesModale2, { for: 'listCategorie', class: 'labelModale2' }, ['Catégorie'])
    const optionCategories = createMarkup('select', listCategoriesModale2, { id: 'listCategorie', name: 'listCategorie' })
    createMarkup('option',optionCategories, {value: ""})
    categoriesList.forEach((project) => {
        createMarkup('option', optionCategories, { value: project.name }, [project.name])
    })
}
//Test pas sur que changemodal2 marche
const changeModal2 = function (e) {
    e.preventDefault()
    const target = document.getElementById('modal1')
    target.style.display = null;
    document.getElementById('modal2').style.display = 'none';
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.close').addEventListener('click', closeModal)
    modal.querySelector('.modalPropagation').addEventListener('click', stopPropagation)
    deleteListModal()
}

/*** TEST REQUEST FETCH POST ADD PROJECT ***/

//const answer = fetch('http://localhost:5678/api/works/', {
//    method: 'POST',
//    headers: { 'Authorization': `Bearer ${monToken}` },
//    body: formData
//})
//    .then(response => response.text())
//    .then(result => console.log(result))
//    .catch(error => console.log('error', error));
//
//var formdata = new FormData();
//formdata.append("image", "string($binary)");
//formdata.append("title", "string");
//formdata.append("category", "integer($int64)");

// 1. Pointer les 3 élements du modal 2
// 2. Les stocker dans formdata (comment ?)
// 3. faire la requête fetch post.



/** Set Up bannière noir, bouton modifier, (mode editeur) **/
console.log(monToken)
if (monToken === null){}
else{
    document.getElementById('logout').style.display = null;
    document.getElementById('login').style.display = 'none';
    document.getElementById('modifyButton').style.display = null;
    document.getElementById('blackBanner').style.display = null;
    document.getElementById('iconPen').style.display = null;
}
/** Deconnexion **/

document.getElementById('logout').addEventListener('click', function (e) {
    localStorage.clear()
    monToken = localStorage
    console.log(localStorage)
    document.getElementById('logout').style.display = 'none';
    window.location.reload()
    document.getElementById('login').style.display = null;
    document.getElementById('modifyButton').style.display = 'none';
})
/**Bouton retour modale 2 */ //PB FERMUTRE MODAL1 APRES ETRE RETOURNE
//document.getElementById('backLeft').addEventListener('click', function (e){
//    e.preventDefault()
//    document.getElementById('modal2').style.display='none';
//    deleteListModal()
//    document.getElementById('modal1').style.display=null;
//    modal.addEventListener('click', closeModal)
//    modal.querySelector('.close').addEventListener('click', closeModal)
//    modal = null
//    document.querySelector('.modalPropagation').addEventListener('click', stopPropagation)
//})


getProject()
getCategories()

//post -> ok add projects list, reset gallery
//Galerie modal qui se duplique à l'actualisation
// remplacer database.sqlite pour reset ma gallery
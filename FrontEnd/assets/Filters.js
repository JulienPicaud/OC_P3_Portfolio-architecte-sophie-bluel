let projectsList = []
let categoriesList = []
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
let modal = null;
let monToken = localStorage.getItem("token");

/*** get gallery and display ***/
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

/*** delete div .gallery */
function deleteGallery() {
    let gallery = document.querySelector('.gallery');
    gallery.remove();
}

/*** reset gallery */
function resetGallery() {
    deleteGallery()
    createGallery(projectsList)
}

/** Create gallery */
function createGallery(projectsList) {
    let portfolio = document.getElementById('portfolio')
    let gallery = createMarkup('div', portfolio, { class: 'gallery' })
    projectsList.forEach((project) => {
        const figure = createMarkup('figure', gallery);
        createMarkup('img', figure, { src: project.imageUrl, alt: project.title });
        createMarkup('figureCaption', figure, {}, project.title);
    })
}

/** creates filters according to fetched categories **/
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
/** Open modal and set up option */
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
/** Close modal and clean it */
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
    cleanPreviewModal2()
}

/** Get projects for modal */
function createGalleryModal(projectsList) {
    document.getElementById('allProjects').innerHTML = ''
    let portfolio = document.querySelector('.allProjects')
    projectsList.forEach((project) => {
        const divTrash = createMarkup('div', portfolio, { class: 'bins', Id: project.id })
        createMarkup('img', divTrash, { src: project.imageUrl, alt: project.title, });
        const poubs = createMarkup('i', divTrash, { class: 'fa-solid fa-trash-can', })

        poubs.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const idProject = divTrash.id;
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
            } else {
                alert("Echec de suppression");
            }
        });
    })
}

/** Clean modal gallery */
function deleteGalleryModal() {
    let portfolio = document.querySelector('.allProjects')
    portfolio.innerHTML = ''
}

function deleteListModal() {
    document.getElementById('listCategoriesModale2').innerHTML = ''
}

/******** Open Modale 2*******/
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
    document.getElementById('title').value = ''
    const listCategoriesModale2 = document.getElementById('listCategoriesModale2')
    createMarkup('label', listCategoriesModale2, { for: 'listCategorie', class: 'labelModale2' }, ['Catégorie'])
    const optionCategories = createMarkup('select', listCategoriesModale2, { id: 'listCategorie', name: 'listCategorie' })
    createMarkup('option', optionCategories, { value: "" })
    categoriesList.forEach((project) => {
        createMarkup('option', optionCategories, { value: project.id }, [project.name])
    })
    document.getElementById('buttonAddProject').setAttribute('style', "color:white; background-color: grey;")
    document.getElementById('buttonAddProject').setAttribute('disabled','')
}

/**Back modale 2 to 1 */
const changeModal2 = function (e) {
    e.preventDefault()
    const target = document.getElementById('modal1')
    target.style.display = null;
    document.getElementById('modal2').style.display = 'none';
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.close').addEventListener('click', closeModal)
    modal.querySelector('.modalPropagation').addEventListener('click', stopPropagation)
    
    cleanPreviewModal2()
    deleteListModal()
}

/** Set Up page index quand utilisateur connecté **/
console.log(monToken)
if (monToken === null) { }
else {
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

getProject()
getCategories()


/**Requete ajout de projet */

document.getElementById('buttonAddProject').addEventListener('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    const title = document.getElementById('title')
    console.log(title.value)
    const category = document.getElementById('listCategorie')
    console.log(category.value)
    let fileInput = document.getElementById('addPicture')
    console.log(fileInput.files[0])

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${monToken}`);


    let formdata = new FormData();
    formdata.append("image", fileInput.files[0]);
    formdata.append("title", title.value);
    formdata.append("category", category.value);

    let requestOptionsAdd = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://localhost:5678/api/works", requestOptionsAdd)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
})

/**Prévisualisation de la photo modale 2 */
function previewFiles() {
    const preview = document.querySelector("#preview");
    const files = document.querySelector("input[type=file]").files;

    function readAndPreview(file) {

        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            const reader = new FileReader();

            reader.addEventListener(
                "load",
                () => {
                    const image = new Image();
                    image.height = 250;
                    image.title = file.name;
                    image.src = reader.result;
                    image.id = "previewImgModal";
                    preview.appendChild(image);

                },
                false,
            );
            reader.readAsDataURL(file);
        }
    }
    if (files) {
        Array.prototype.forEach.call(files, readAndPreview);
        document.getElementById('tailleImg').style.display = "none";
        document.getElementById('imgIcon').style.display = "none";
        document.getElementById('labelAddPicture').style.display = "none";
        document.getElementById('buttonAddProject').removeAttribute('style','')
        document.getElementById('buttonAddProject').removeAttribute('disabled','')
    }
    else {
    }

}
/**Clean prévisualisation photo modale 2 */
function cleanPreviewModal2() {
    document.getElementById('tailleImg').style.display = null;
    document.getElementById('imgIcon').style.display = null;
    document.getElementById('labelAddPicture').style.display = null;
    document.querySelector("#preview").innerHTML = '';
}


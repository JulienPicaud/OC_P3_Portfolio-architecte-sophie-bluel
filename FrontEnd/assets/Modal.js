/**
 * get all pictures
 */
function getNewProject() {
    fetch("http://localhost:5678/api/works", requestOptions)
        .then(response => response.json())
        .then((result) => {
            projectsList = result
            console.log(result)
            createGalleryModal(projectsList)
        })
        .catch(error => console.log('error', error))
}
//const poubelle = document.createElement('i')
//poubelle.classList.add('fa-solid', 'fa-trash-can')

function createGalleryModal(projectsList) {
    let portfolio = document.querySelector('.allProjects')
    projectsList.forEach((project) => {
        createMarkup('img', portfolio, { src: project.imageUrl, alt: project.title });
    })
}
function deleteGalleryModal(){
    let portfolio = document.querySelector('.allProjects')
    portfolio.innerHTML=''
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
    getNewProject()
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

let buttonModal = document.querySelector('.boxModal')
buttonModal.addEventListener('click', openModal)

const stopPropagation = function (e) {
    e.stopPropagation()
}




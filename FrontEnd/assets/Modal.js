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
}

let buttonModal = document.querySelector('.boxModal')
buttonModal.addEventListener('click', openModal)

const stopPropagation = function (e) {
    e.stopPropagation()
}




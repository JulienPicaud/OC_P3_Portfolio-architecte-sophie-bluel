

fetch('http://localhost:5678/api/works').then(response => response.json)

// On récupère de la galerie
const gallery = document.querySelector('.gallery');
// On supprime l'HTML actuel
gallery.innerHTML='';

// Ajout des travaux à la galerie
projects.forEach(project =>{
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figCaption = document.createElement('figCaption');

img.src = project.imageUrl;
img.alt = project.title;
figCaption.textContent = project.title;

figure.appendChild(img)
figure.appendChild(figCaption)
gallery.appendChild(figure)
})



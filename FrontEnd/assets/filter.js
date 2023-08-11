
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

    monSet.forEach((filters) => {
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
getCategories()
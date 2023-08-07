
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

//function createFilters(filters) {}

getCategories()
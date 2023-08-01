function getProject() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://localhost:5678/api/works", requestOptions)
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      console.log(result)
      deleteGallery()
      createGallery(result)
    })
    .catch(error => console.log('error', error));
}

function deleteGallery() {
  let gallery = document.querySelector('.gallery');
  gallery.remove();
}

//projects.forEach(project =>{
//  
//  const figure = document.createElement('figure');
//  const img = document.createElement('img');
//  const figureCaption = document.createElement('figureCaption');
//  
//  img.src = project.imageUrl;
//  img.alt = project.title;
//  figCaption.textContent = project.title;
//  
//  figure.appendChild(img)
//  figure.appendChild(figureCaption)
//  gallery.appendChild(figure)  
//})


function createGallery(newGallery) {
  let gallery = document.createElement('div')
  
  const img = document.createElement('img');
  const figCaption = document.createElement('figCaption');

  gallery.appendChild(img)
  gallery.appendChild(figCaption)
  .document.body.appendChild(gallery)
}
  
  getProject()




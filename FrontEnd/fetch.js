function getProject() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://localhost:5678/api/works", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  deleteGallery()
  createGallery(result)
  .catch(error => console.log('error', error));
}


function deleteGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.remove();
}


function createGallery() {
  result.forEach(project => {
    const div = document.createElement('div')  
    const img = document.createElement('img');
    const figureCaption = document.createElement('figureCaption');
  
  
    img.src = result.imageUrl;
    img.alt = result.title
    figureCaption.textContent = result.title;
  
  div.appendChild(img)
  div.appendChild(figureCaption)
  document.body.appendChild(gallery)

  })
}

getProject()





    //const figure = document.createElement('figure');
    //const img = document.createElement('img');
    //const figureCaption = document.createElement('figureCaption');
//
    //img.src = project.imageUrl;
    //img.alt = project.title;
    //figureCaption.textContent = project.title;
//
    //figure.appendChild(img)
    //figure.appendChild(figureCaption)
    //gallery.appendChild(figure)


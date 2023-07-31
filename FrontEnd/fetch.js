function getProject() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://localhost:5678/api/works", requestOptions)
    .then(response => response.json())
    .then(result => {
      deleteGallery()
      createGallery(result)
    })
    .catch(error => console.log('error', error));
}

function deleteGallery() {

}

function createGallery(projects) {

}



getProject()


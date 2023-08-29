let requestOptions = {
    method: 'POST',
    redirect: 'follow'
};

fetch("http://localhost:5678/api/users/login", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

let connectButton = document.getElementById('connectButton')
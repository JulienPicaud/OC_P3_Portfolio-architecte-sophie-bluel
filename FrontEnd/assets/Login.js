let connectButton = document.getElementById('connectButton')
connectButton.addEventListener('click', () => {
    let myInput = document.querySelector('inputLog');
    console.log(myInput.value)
}) 

let formdata = new FormData(connectButton);
formdata.append("email", "string");
formdata.append("password", "string");

let requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
};

fetch("http://localhost:5678/api/users/login", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));






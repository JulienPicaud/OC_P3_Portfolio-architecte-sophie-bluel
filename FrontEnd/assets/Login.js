let connectButton = document.getElementById('connectButton')
connectButton.addEventListener('click', () => {
    let myEmail = document.getElementById('myEmail');
    let myPassword = document.getElementById('myPassword')
    console.log(myEmail.value)
    console.log(myPassword.value)

    //let formdata = new FormData(connectButton);
    //formdata.append("email", myEmail.value);
    //formdata.append("password", myPassword.value);
    const payload = { email: myEmail.value, password: myPassword.value };

    let requestOptions = {
        method: 'POST',
        //body: formdata,
        body: JSON.stringify(payload),
        redirect: 'follow'
    };

    fetch("http://localhost:5678/api/users/login", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result)) // réponse du serveur 200 rediriger sur la page d'accueil
        .catch(error => console.log('error', error)); // sinon 404 user non trouvé
})

// voir local storage pour stocker le token
// result -> result.body.token (a voir)




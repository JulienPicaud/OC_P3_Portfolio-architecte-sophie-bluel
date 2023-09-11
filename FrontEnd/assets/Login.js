let connectButton = document.getElementById('connectButton')
connectButton.addEventListener('click', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    let myEmail = document.getElementById('email');
    let myPassword = document.getElementById('password')
    console.log(myEmail.value)
    console.log(myPassword.value)

    /////////////////////FETCH PERSO///////
    const payload = {
        email: myEmail.value,
        password: myPassword.value
    };

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),

        //redirect: 'follow'
    };
    fetch("http://localhost:5678/api/users/login", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("")
            }
            return response.json()
        })
        .then(result => {
            window.location.href = "index.html"
            console.log(result)
        }) // réponse du serveur 200 rediriger sur la page d'accueil
        .catch(error => console.log('error', error)); // sinon 404 user non trouvé
})
    /////////////////////FETCH PERSO///////

//console.log(result)
// voir local storage pour stocker le token
// result -> result.body.token (a voir)




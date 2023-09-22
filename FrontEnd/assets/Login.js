let connectButton = document.getElementById('connectButton')
connectButton.addEventListener('click', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    let myEmail = document.getElementById('email');
    let myPassword = document.getElementById('password')
    console.log(myEmail.value)
    console.log(myPassword.value)

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

    };
    fetch("http://localhost:5678/api/users/login", requestOptions)
        .then(response => {
            console.log(response.ok)
            if (response.ok === true) {

                window.alert('Connexion réussie!');
                window.location.href = "index.html";
            }
            else {
                window.alert('Login ou mot de passe incorrect')
            }
            return response.json()
        })
        .then(result => { //result est l'objet token

            console.log(result);
            localStorage.setItem("userId", result.userId); //local storage a tendance à cumuler 
            localStorage.setItem("token", result.token); //les infos au fur et a mesure des connexions
            console.log(localStorage);
        })
})







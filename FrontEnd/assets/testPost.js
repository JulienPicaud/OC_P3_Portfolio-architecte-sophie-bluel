document.getElementById('loginForm').addEventListener('click', function (e) {
    //e.preventDefault(); // Empêche le rechargement de la page
    const email = document.getElementById('email').value;
    console.log(email)
    const password = document.getElementById('password').value;
    const payload = {
        email: email,
        password: password
    };
    console.log(password)

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(payload)
    }).then(response => response.json()).then(data => {
        if (data.success) {
            alert('Connexion réussie!');
            // Redirection, mise à jour de l'UI, etc. selon vos besoins
        } else { alert('Échec de la connexion!'); }
    }).catch(error => { console.error('Erreur:', error); });
});
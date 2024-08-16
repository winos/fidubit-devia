
const formUsuario = document.getElementById('form-usuario');
const usuariosDiv = document.getElementById('usuarios');

formUsuario.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const usuarioDiv = document.createElement('div');
        usuarioDiv.classList.add('usuario');

        usuarioDiv.textContent = 'Nombre: ' + username + ', Email: ' + email;

        usuariosDiv.appendChild(usuarioDiv);
    })
    .catch(error => console.error('Error:', error));
});

fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data => {
        const response = data.data;
        console.log(response);

        // Iterar sobre cada usuario en la respuesta
        response.forEach(usuario => {
            const usuarioDiv = document.createElement('div');
            usuarioDiv.classList.add('usuario');

            // Concatenar la información del usuario al div
            usuarioDiv.textContent = 'Nombre: ' + usuario.name + ', Email: ' + usuario.email;

            // Agregar el div al contenedor principal
            usuariosDiv.appendChild(usuarioDiv);
        });
    })
    .catch(error => console.error('Error:', error));

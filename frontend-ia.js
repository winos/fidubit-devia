
const fs = require('fs');
const path = require('path');

// Función para crear la ruta de la carpeta si no existe
const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
};

// Función para escribir el código en un archivo
const writeCodeToFile = (fileName, code) => {
    ensureDirectoryExistence(fileName); // Asegura que la ruta de la carpeta exista
    fs.writeFile(fileName, code, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo:', err);
        } else {
            console.log(`Código escrito en el archivo ${fileName} exitosamente.`);
        }
    });
};

// Código HTML
const codeIndex = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuarios</title>
    <link rel="stylesheet" href="style/style.css">
</head>
<body>
    <div class="container">
        <h1>Usuarios</h1>
        <div id="usuarios"></div>
        <form id="form-usuario">
            <label for="username">Nombre:</label>
            <input type="text" id="username" name="username"><br><br>
            <label for="email">Correo electrónico:</label>
            <input type="email" id="email" name="email"><br><br>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password"><br><br>
            <input type="submit" value="Guardar">
        </form>
    </div>
    <script src="script/script.js"></script>
</body>
</html>
`;

// Código CSS
const cssCode = `
body {
    background-color: #007bff;
    text-align: center;
}

.container {
    max-width: 500px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.usuario {
    margin-bottom: 20px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.usuario:last-child {
    border-bottom: none;
}

#form-usuario {
    margin-top: 20px;
}

#form-usuario input {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
}

#form-usuario input[type="submit"] {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#form-usuario input[type="submit"]:hover {
    background-color: #0056b3;
}
`;

// Código JavaScript
const jsCode = `
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
`;

// Nombres de archivo
const indexFileName = 'index.html';
const cssFileName = 'style/style.css';
const jsFileName = 'script/script.js';

// Llama a la función para escribir el código en los archivos respectivos
writeCodeToFile(indexFileName, codeIndex);
writeCodeToFile(cssFileName, cssCode);
writeCodeToFile(jsFileName, jsCode);

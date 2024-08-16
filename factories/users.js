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

// Generación del modelo (Users)
const codeModel = `
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    sex: { type: String, required: true }
});

const User = mongoose.model("User", UserSchema); // Asegúrate de usar mongoose.model aquí

module.exports = User; // Exporta solo el modelo User
`;

// Generación del controlador (users)
const codeController = `
const db = require("../models/users");
const User = db;
const config = require("../config/index");

exports.create = (req, res) => {
    const user = new User({
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex
    });

    user.save((err, _user) => {
        if (err) {
            res.status(500).send({ message: err, status: config.RES_STATUS_FAIL });
            return;
        }
        return res.status(200).send({
            message: config.RES_MSG_SAVE_SUCCESS,
            data: _user,
            status: config.RES_STATUS_SUCCESS,
        });
    });
};

exports.getAll = (req, res) => {
    User.find({})
        .exec((err, users) => {
            if (err) {
                res.status(500).send({ message: err, status: config.RES_STATUS_FAIL });
                return;
            }
            return res.status(200).send({
                message: "Estamos readys",
                data: users,
                status: config.RES_STATUS_SUCCESS,
            });
        });
};
`;

// Nombre del archivo en el que quieres escribir el código del controlador
const controllerFileName = 'controllers/users.js';
// Nombre del archivo en el que quieres escribir el código del modelo
const modelFileName = 'models/users.js';

// Llama a la función para escribir el código en los archivos respectivos
writeCodeToFile(controllerFileName, codeController);
writeCodeToFile(modelFileName, codeModel);

// Generación de las nuevas rutas en Express.js
const routerCode = `
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/users', usersController.create);
router.get('/users', usersController.getAll);

module.exports = router;
`;

// Nombre del archivo donde se escribirán las nuevas rutas
const routerFileName = 'routes/users.js';

// Llama a la función para escribir el código en el archivo de las nuevas rutas
writeCodeToFile(routerFileName, routerCode);

// Generación de la vista (views/users.ejs)
const viewCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado de Usuarios</title>
</head>
<body>
    <h1>Listado de Usuarios</h1>
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Sexo</th>
            </tr>
        </thead>
        <tbody>
            <% users.forEach(user => { %>
                <tr>
                    <td><%= user.name %></td>
                    <td><%= user.age %></td>
                    <td><%= user.sex %></td>
                </tr>
            <% }); %>
        </tbody>
    </table>
</body>
</html>
`;

// Nombre del archivo donde se escribirá la vista
const viewFileName = 'views/users.ejs';

// Llama a la función para escribir el código en el archivo de la vista
writeCodeToFile(viewFileName, viewCode);

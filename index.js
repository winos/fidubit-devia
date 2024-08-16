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

// Generación del modelo (Cats)
const codeModel = `
const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    sex: { type: String, required: true }
});

const Cat = mongoose.model("Cat", CatSchema);

module.exports = Cat;
`;

// Generación del controlador (Cats)
const codeController = `
const db = require("../models/cats");
const Cat = db;
const config = require("../config/index");

exports.create = (req, res) => {
    const cat = new Cat({
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex
    });

    cat.save((err, _cat) => {
        if (err) {
            res.status(500).send({ message: err, status: config.RES_STATUS_FAIL });
            return;
        }
        return res.status(200).send({
            message: config.RES_MSG_SAVE_SUCCESS,
            data: _cat,
            status: config.RES_STATUS_SUCCESS,
        });
    });
};

exports.getAll = (req, res) => {
    Cat.find({})
        .exec((err, cats) => {
            if (err) {
                res.status(500).send({ message: err, status: config.RES_STATUS_FAIL });
                return;
            }
            return res.status(200).send({
                message: config.RES_MSG_DATA_FOUND + " Estamos readys",
                data: cats,
                status: config.RES_STATUS_SUCCESS,
            });
        });
};
`;

// Generación de las nuevas rutas en Express.js
const routerCode = `
const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats');

router.post('/cats', catsController.create);
router.get('/cats', catsController.getAll);
// Agrega aquí las rutas para las funciones de actualización y eliminación según sea necesario

module.exports = router;
`;

// Generación de la vista (HTML)
const viewCode = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado de Gatos</title>
</head>
<body>
    <h1>Listado de Gatos</h1>
    <div id="cat-list"></div>

    <script>
        fetch('/cats')
            .then(response => response.json())
            .then(data => {
                const catList = document.getElementById('cat-list');
                if (data.status === 'success') {
                    data.data.forEach(cat => {
                        const catDiv = document.createElement('div');
                        catDiv.textContent = \`Nombre: \${cat.name}, Edad: \${cat.age}, Sexo: \${cat.sex}\`;
                        catList.appendChild(catDiv);
                    });
                } else {
                    catList.textContent = 'Error al cargar los gatos';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    </script>
</body>
</html>
`;

// Nombres de archivo
const controllerFileName = 'controllers/cats.js';
const modelFileName = 'models/cats.js';
const routerFileName = 'routes/cats.js';
const viewFileName = 'views/cats/index.html';

// Llama a la función para escribir el código en los archivos respectivos
writeCodeToFile(controllerFileName, codeController);
writeCodeToFile(modelFileName, codeModel);
writeCodeToFile(routerFileName, routerCode);
writeCodeToFile(viewFileName, viewCode);

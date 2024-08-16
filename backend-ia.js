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

// Nombres de archivo
const controllerFileName = 'controllers/cats.js';
const modelFileName = 'models/cats.js';
const routerFileName = 'routes/cats.js';
const viewFileName = 'views/cats/index.html';

// Modelo Cats
const codeModel = `
const mongoose = require('mongoose');

const catsSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sex: String
});

const Cats = mongoose.model('Cats', catsSchema);

module.exports = Cats;
`;

// Controlador Cats
const codeController = `
const Cats = require('../models/cats');

exports.getCats = async (req, res) => {
    try {
        const cats = await Cats.find();
        res.json({ message: 'Estamos readys', data: cats });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los gatos' });
    }
};

exports.createCat = async (req, res) => {
    try {
        const cat = new Cats(req.body);
        await cat.save();
        res.json({ message: 'Gato creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el gato' });
    }
};

exports.updateCat = async (req, res) => {
    try {
        const cat = await Cats.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Gato actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el gato' });
    }
};

exports.deleteCat = async (req, res) => {
    try {
        await Cats.findByIdAndRemove(req.params.id);
        res.json({ message: 'Gato eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el gato' });
    }
};
`;

// Rutas Cats
const routerCode = `
const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats');

router.get('/', catsController.getCats);
router.post('/', catsController.createCat);
router.put('/:id', catsController.updateCat);
router.delete('/:id', catsController.deleteCat);

module.exports = router;
`;

// Vista Cats
const viewCode = `
<!DOCTYPE html>
<html>
<head>
    <title>Cats</title>
</head>
<body>
    <h1>Cats</h1>
    <ul>
        <li><a href="/cats">Ver gatos</a></li>
        <li><a href="/cats/create">Crear gato</a></li>
    </ul>
</body>
</html>
`;

// Llama a la función para escribir el código en los archivos respectivos
writeCodeToFile(controllerFileName, codeController);
writeCodeToFile(modelFileName, codeModel);
writeCodeToFile(routerFileName, routerCode);
writeCodeToFile(viewFileName, viewCode);
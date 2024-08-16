
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

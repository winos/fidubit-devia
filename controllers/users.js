
const User = require('../models/users');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ message: 'Estamos readys', data: users });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const catsRoutes = require('./routes/users'); // Importa las rutas 
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors'); // Importa cors

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/constelacion', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Asegúrate de requerir 'path'


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usar las rutas de Cats
app.use('/api', catsRoutes); // Cambia la ruta base según lo necesites

// Otras rutas y middleware aquí
// ...

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

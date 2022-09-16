require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


// Crear el servidor de express
const app = express();

// CORS middleware
app.use(cors());


// Base de datos
dbConnection();

// Ruta de la app
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola mundo'
    });

});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
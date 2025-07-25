'use strict';

// importación de express
var express = require('express');
// importación del middleware bodyparse
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

// Inicialización de la app de express
var app = express();

// Puerto ejecución del servidor
var port = process.env.PORT || 4201;

const startServer = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/tienda');
        console.log('Conexión a la base de datos exitosa.');

        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
        });
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
};

startServer();

// exportación de la app de express 
module.exports = app;
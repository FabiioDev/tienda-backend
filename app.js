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

var cliente_route = require('./routes/cliente');
var admin_route = require('./routes/admin');

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

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', cliente_route);
app.use('/api', admin_route);

// exportación de la app de express 
module.exports = app;
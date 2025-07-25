'use strict';

var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');

const registro_admin = async function (req, res) {
    //
    var data = req.body; // se guarda los datos de la request en una variable
    var admin = [];

    // validación de correo existente
    admin = await Admin.find({ email: data.email }); // busqueda de email igual al enviado en la request

    if (admin.length == 0) { // email no existente
        if (data.password) { // password en request
            bcrypt.hash(data.password, null, null, async function (err, hash) { // encriptado de la password de la req
                if (hash) { // password se encuentra encriptada 
                    data.password = hash; // se guarda la password encriptada en la data de la req
                    var adminRegister = await Admin.create(data); //se registra un nuevo Admin con la data recibida de la request
                    res.status(201).send({ data: adminRegister }); // usuario registrado
                } else {
                    res.status(500).send({ data: 'ErrorServer', data: undefined }); // usuario registrado
                }
            });
        } else {
            res.status(400).send({ message: 'Dato inválido: contraseña', data: undefined }); // el campo password esta vacio
        }
    } else {
        res.status(409).send({ message: 'Este email ya se encuentra registrado', data: undefined }); // email ya existente
    }


};

module.exports = {
    registro_admin
};
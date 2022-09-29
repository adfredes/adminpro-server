const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');




const validarJwt = (req, res, next) => {

    // Leer el token
    const token = req.header('x-token');
    console.log(token);

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        // agregar uid al request
        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

};

const validarAdminRole = async(req, res, next) => {

    const uid = req.uid;
    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario inexistente'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer esto'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Token no válido'
        });
    }


};

const validarAdminRole_o_MismoUsuario = async(req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;


    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario inexistente'
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        }

        return res.status(403).json({
            ok: false,
            msg: 'No tiene privilegios para hacer esto'
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Token no válido'
        });
    }


};

module.exports = {
    validarJwt,
    validarAdminRole,
    validarAdminRole_o_MismoUsuario
};
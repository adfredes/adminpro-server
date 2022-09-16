const { response } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {

    //const usuarios = await Usuario.find({}, 'nombre email role google');
    const usuarios = await Usuario.find();

    return res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });

};

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correro ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar token
        const token = await generarJWT(usuario.id);


        return res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


};

const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }


        // Actualizaciones
        const { password, google, ...campos } = req.body;

        if (usuarioDB.email !== campos.email) {


            const existeEmail = await Usuario.findOne({ email: req.body.email });

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correro ya está registrado'
                });
            }

        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        await usuario.save();


        return res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


};


const borrarUsuario = async(req, res) => {

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        return res.json({
            ok: true,
            uid
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado... hable con el administrador'
        });
    }


};



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};
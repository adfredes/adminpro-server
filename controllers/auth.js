const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async(req, res = response) => {

    const { email, password } = req.body;
    try {

        // Verificar si el email existe
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        return res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const googleSignIn = async(req, res = response) => {

    const { token } = req.body;

    try {

        const { email, name, picture } = await googleVerify(token);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {

            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });

        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();

        // Generar el TOKEN - JWT
        const jwtToken = await generarJWT(usuario.id);

        return res.json({
            ok: true,
            email,
            name,
            picture,
            token: jwtToken,
            menu: getMenuFrontEnd(usuario.role)
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Token de google no es correcto'
        });
    }
};


const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const jwtToken = await generarJWT(uid);

    // obtener el usuario por uid

    const usuario = await Usuario.findById(uid);



    res.json({
        ok: true,
        token: jwtToken,
        usuario,
        menu: getMenuFrontEnd(usuario.role)
    });
};

module.exports = {
    login,
    googleSignIn,
    renewToken
};
const { response } = require('express');
const jwt = require('jsonwebtoken');



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

module.exports = {
    validarJwt
};
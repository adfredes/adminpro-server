/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJwt } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', validarJwt, getUsuarios);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email').isEmail().withMessage('El email no es válido'),
        validarCampos
    ],
    crearUsuario);

router.put('/:id', [
        validarJwt,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email').isEmail().withMessage('El email no es válido'),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario);

router.delete('/:id', validarJwt, borrarUsuario);

module.exports = router;
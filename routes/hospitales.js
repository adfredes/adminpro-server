/*
ruta: /api/hospitales
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const { validarJwt } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', [validarJwt], getHospitales);

router.post('/', [
        validarJwt,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital);

router.put('/:id', [

    ],
    actualizarHospital);

router.delete('/:id', borrarHospital);

module.exports = router;
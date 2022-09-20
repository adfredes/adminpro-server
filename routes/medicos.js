/*
ruta: /api/medicos
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

const { validarJwt } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', getMedicos);

router.post('/', [
        validarJwt,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico);

router.put('/:id', [

    ],
    actualizarMedico);

router.delete('/:id', borrarMedico);

module.exports = router;
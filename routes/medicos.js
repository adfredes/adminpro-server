/*
ruta: /api/medicos
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico, getMedicoById } = require('../controllers/medicos');

const { validarJwt } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', validarJwt, getMedicos);


router.post('/', [
        validarJwt,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico);

router.put('/:id', [
        validarJwt,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedico);

router.get('/:id', validarJwt, getMedicoById);

router.delete('/:id', borrarMedico);

module.exports = router;
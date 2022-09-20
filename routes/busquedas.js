/*
    Ruta: /api/todo
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { getTodo, getDocumentosColleccion } = require('../controllers/busquedas');


const { validarJwt } = require('../middleware/validar-jwt');

const router = Router();

router.get('/:busqueda', validarJwt, getTodo);

router.get('/colleccion/:tabla/:busqueda', validarJwt, getDocumentosColleccion);


module.exports = router;
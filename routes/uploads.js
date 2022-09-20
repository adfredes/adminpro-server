/*
    Ruta: /api/todo
*/

const { Router, application } = require('express');
const { check } = require('express-validator');
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarCampos } = require('../middleware/validar-campos');
const expressFileUpload = require('express-fileupload');



const { validarJwt } = require('../middleware/validar-jwt');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', validarJwt, fileUpload);

router.get('/:tipo/:foto', validarJwt, retornaImagen);




module.exports = router;
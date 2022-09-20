const { response } = require('express');

const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;

    const regex = new RegExp(busqueda, 'i');

    [hospitales, medicos, usuarios] = await Promise.all([
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Usuario.find({ nombre: regex })
    ]);

    res.json({
        ok: true,
        hospitales,
        medicos,
        usuarios
    });
};

const getDocumentosColleccion = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });


};


module.exports = {
    getTodo,
    getDocumentosColleccion
};
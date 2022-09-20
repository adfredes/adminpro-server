const { response } = require('express');

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
};

const crearMedico = async(req, res = response) => {

    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await Hospital.findById(medico.hospital);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }

        const medicoDB = await medico.save();

        return res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

};

const actualizarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
};

const borrarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarMedico'
    });
};



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
};
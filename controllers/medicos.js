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

const getMedicoById = async(req, res = response) => {

    try {

        const id = req.params.id;

        const medico = await Medico.findById(id)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        res.json({
            ok: true,
            medico
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

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

const actualizarMedico = async(req, res = response) => {

    try {
        const id = req.params.id;
        const uid = req.uid;

        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico con ese id'
            });
        }

        const hospitalDB = await Hospital.findById(req.body.hospital);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        return res.json({
            ok: true,
            medico: medicoActualizado
        });


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
};

const borrarMedico = async(req, res = response) => {

    try {
        const id = req.params.id;

        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico con ese id'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico eliminado'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
};
const { response, request } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
};

const crearHospital = async(req, res = response) => {

    const uid = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });



    try {

        const hospitalDB = await hospital.save();

        return res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const actualizarHospital = async(req = request, res = response) => {

    try {

        const id = req.params.id;
        const uid = req.uid;

        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            });
        }

        //hospitalDB.nombre = req.body.nombre;
        const cambiosHospitales = {
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospitales, { new: true });



        res.json({
            ok: true,
            hospital: hospitalActualizado
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const borrarHospital = async(req, res = response) => {

    try {

        const id = req.params.id;

        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            });
        }

        await Hospital.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
};
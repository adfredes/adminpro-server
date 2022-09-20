const fs = require('fs');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    switch (tipo) {
        case 'medicos':
            return await actualizar(Medico, tipo, id, nombreArchivo);
        case 'hospitales':
            return await actualizar(Hospital, tipo, id, nombreArchivo);
        case 'usuarios':
            return await actualizar(Usuario, tipo, id, nombreArchivo);
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }

};

async function actualizar(repositorio, tipo, id, nombreArchivo) {

    const registro = await repositorio.findById(id);

    if (!registro) {
        return false;
    }

    const pathViejo = `./uploads/${tipo}/${registro.img}`;

    // Si existe, elimina la imagen anterior
    if (fs.existsSync(pathViejo)) {
        // Borrar la imagen anterior
        fs.unlinkSync(pathViejo);
    }

    registro.img = nombreArchivo;

    await registro.save();

    return true;
}


module.exports = {
    actualizarImagen
};
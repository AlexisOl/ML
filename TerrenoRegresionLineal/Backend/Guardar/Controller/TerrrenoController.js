const { where } = require('sequelize');
const { Op } = require("sequelize");
const turf = require('@turf/turf');

const Departamento = require('../Model/Terreno');

const obtenerTodosDepartamentos = async(req, res) => {
    try {
        const datos = await Departamento.findAll()
        res.json(datos)
        console.log(datos);
        
    } catch (error) {
        res.status(500).json(
            {"error": error}
        )
    }
}

const terrenoUbicacion = async(req, res) => {

    const {ubicacion} = req.params
    console.log(ubicacion);
    
    try {
        const datos = await Departamento.findOne(
         {where: {
                denombre: {
                    [Op.iLike]: ubicacion
                }

            }}
        );
        
        res.json(datos)
        console.log(datos);
        
    } catch (error) {
        res.status(500).json(
            {"error": error}
        )
    }
}

const guardarNuevo = async (req, res) => {
    const elemento = req.body;
    console.log(req.body, elemento);

    try {
        const area = turf.area(elemento.geom);
        const centroide = turf.centroid(elemento.geom)

        const datos = await Departamento.create({
            decodigo: elemento.decodigo,
            denombre: elemento.denombre,
            dearea: area,
            denorma: elemento.denorma,
            geom: elemento.geom,
            precio: elemento.precio,
            centroide: centroide
        });

        res.json({ mensaje: "Ingreso con éxito" });
        console.log(datos);

    } catch (error) {
        res.status(500).json({ error: error.message || error });
    }
};


module.exports = {
    obtenerTodosDepartamentos: obtenerTodosDepartamentos,
    terrenoUbicacion: terrenoUbicacion,
    guardarNuevo: guardarNuevo
}
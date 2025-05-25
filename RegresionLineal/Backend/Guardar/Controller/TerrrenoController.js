const { where } = require('sequelize');
const { Op } = require("sequelize");
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

module.exports = {
    obtenerTodosDepartamentos: obtenerTodosDepartamentos,
    terrenoUbicacion: terrenoUbicacion
}
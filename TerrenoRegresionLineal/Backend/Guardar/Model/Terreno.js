const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../configs/Db');
const departamentos = sequelize.define(
    'departamentos',
    {
        gid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        decodigo: {
            type: DataTypes.STRING(6),
            allowNull: true
        },
        denombre: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        dearea: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        denorma: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        geom: {
            type: DataTypes.GEOMETRY('MULTIPOLYGON', 4326),
            allowNull: true
        },
        

    }, {
        timestamps: false,
        tableName: "departamentos"
    }

);

module.exports = departamentos;
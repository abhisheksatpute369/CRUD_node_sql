const { DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const Vehicle = sequelize.define('bikes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING
    },
    Company: {
        type: DataTypes.STRING
    },
    Milage: {
        type: DataTypes.STRING
    },
    Launchyear: {
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull: false
    }


}
);



module.exports = Vehicle;
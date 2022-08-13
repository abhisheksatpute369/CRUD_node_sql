const mysql = require('mysql');
const {Sequelize} = require('sequelize');

const sequalize = new Sequelize('nodetosql', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
}
);
  
module.exports = sequalize;
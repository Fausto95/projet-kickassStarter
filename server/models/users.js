const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/')
require('sequelize-isunique-validator')(Sequelize);
module.exports  = sequelize.define('user', {
    userId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    function: {
        type: Sequelize.STRING
    }
})

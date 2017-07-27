const Sequelize = require('sequelize');
const local     = 'postgres://localhost:5432/'
const prod      =  process.env.DATABASE_URL
const sequelize = new Sequelize(process.env.NODE_ENV === 'staging' ? prod : local)
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

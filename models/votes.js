const Sequelize = require('sequelize');
const local     = 'postgres://localhost:5432/'
const prod      =  process.env.DATABASE_URL
const sequelize = new Sequelize(process.env.NODE_ENV === 'staging' ? prod : local)
//require('sequelize-isunique-validator')(Sequelize);
module.exports  = sequelize.define('votes', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    projectId: {
        type: Sequelize.INTEGER
    },
    userName: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER,
        unique: true
    }
})
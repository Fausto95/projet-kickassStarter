const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:5432/')
//require('sequelize-isunique-validator')(Sequelize);
module.exports  = sequelize.define('projects', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    Name: {
        type: Sequelize.STRING
    },
    Description: {
        type: Sequelize.STRING
    },
    imageLink: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER
    },
    Pledged: {
        type: Sequelize.INTEGER
    },
    Goals: {
        type: Sequelize.INTEGER
    },
    Deadline: {
        type: Sequelize.INTEGER
    },
    UpVotes: {
        type: Sequelize.STRING
    },
    DownVotes: {
        type: Sequelize.STRING
    }
})
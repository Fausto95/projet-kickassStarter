const Sequelize  = require('sequelize');
const bcrypt     = require('bcrypt')
const saltRounds = 10;
const jwt        = require('jwt-simple')
const config     = require('../config/config')
const User       = require('../models/users')
const Projects   = require('../models/projects')
const Votes    = require('../models/votes')
const local      = 'postgres://localhost:5432/'
const prod       =  process.env.DATABASE_URL
const sequelize  = new Sequelize(process.env.NODE_ENV === 'staging' ? prod : local)

// TOKEN
function tokenForUser(user){
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user.userId, iat: timestamp }, config.secret)
}


// add query functions
function getAllUsers(req, res, next) {
    User.findAll().then(users => {
  console.log(users)
  res.send(users)
})
}


function login(req, res, next){
  console.log('the req user', req.user.userId)
  res.send({ token: tokenForUser(req.user), user: req.user})
}


function createUser(req, res, next) {
  /// can verify if pass empty in here

  User.findOne({where: { email: req.body.email}})
  .then((user) => {
    if(user){
      return res.status(422).json({ error: 'Email Already in use'})
    }
    return User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
      function: req.body.function
    })
  })
  .then(user => res.status(200).json({ status: 'success', message: 'Inserted one user', token: tokenForUser(user), user: user}))
  //.catch(err =>res.send({error: 'Email Already in use'}))
}

function createProject(req, res, next){
    Projects.create({
      Name: req.body.name,
      Description: req.body.description,
      userId: req.body.userId,
      imageLink: req.body.img,
      Pledged: req.body.pledged,
      Goals: req.body.goals,
      Deadline: req.body.deadline
    })
    .then(project => res.status(200).json({ status: 'success', message: 'Inserted one project', project: project }))
    .catch(err => res.send(err))
}



function deleteProject(req, res, next){
  Projects.destroy({
    where: {
      projectId: req.params.projectId
    }
  })
  .then(project => res.send({ message: `the project ${project.name} was deleted`, project: project}))
  .catch(err => res.send(err))
}

function getProjects(req, res, next){
  Projects.hasMany(Votes, { foreignKey: 'projectId'})
  Votes.belongsTo(Projects, { foreignKey: 'projectId'})

  Projects.findAll({
  include: [
    { model: Votes },
  ]})
  .then(projects => res.status(200).json({ status: 'success', message: 'Projects Gotten', projects: projects }))
  .catch(err => res.send(err))
}

function getUserProjects(req, res, next){
  User.hasMany(Projects, { foreignKey: 'userId'})
  Projects.belongsTo(User, { foreignKey: 'userId'})
  User.find({
  where:{
    userId: req.params.userId
  },
  include: [
    { model: Projects }
  ]
})
  .then(users => {
    res.send(users)
  })
}

function editProject(req, res, next){
  Projects.find({
    where: {
      projectId: req.params.projectId
    }
  })
  .then(project => 
    project.update({
      Name: req.body.name,
      Description: req.body.description,
      userId: req.body.userId,
      imageLink: req.body.img,
      Pledged: req.body.pledged,
      Goals: req.body.goals,
      Deadline: req.body.deadline
    }))
  .then(response => res.send(response))
  .catch(err => res.send(err))
}

function addVote(req, res, next){
  Votes.create({
      projectId: req.body.projectId,
      userName: req.body.userName,
      userId: req.body.userId
  })
    .then(vote => res.send(vote))
    .catch(err => res.send(err))
}

function deleteVote(req, res, next){
  Votes.destroy({
      where: {
        userId: req.params.userId,
        projectId: req.params.projectId
      }
  })
    .then(success => res.send(success))
    .catch(err => res.send(err))
}


function createProjectDB(req, res, next){
  Projects.sync({ force: true}).then(() => {
    return Projects.create({
      Name: req.body.name,
      Description: req.body.description,
      userId: req.body.userId,
      imageLink: req.body.img,
      Pledged: req.body.pledged,
      Goals: req.body.goals,
      Deadline: req.body.deadline
    })})
    .then(project => res.status(200).json({ status: 'success', message: 'Inserted one project and db created', project: project }))
    .catch(err => res.send(err))
}

function createVoteDB(req, res, next){
  Votes.sync({ force: true}).then(() =>{
     return Votes.create({
      projectId: req.body.projectId,
      userName: req.body.userName,
      userId: req.body.userId
  })})
    .then(vote => res.send(vote))
    .catch(err => res.send(err))

}

module.exports = {
  getAllUsers: getAllUsers,
  // getSingleUser: getSingleUser,
  createUser: createUser,
  createProject: createProject,
  deleteProject: deleteProject,
  getProjects: getProjects,
  getUserProjects: getUserProjects,
  addVote: addVote,
  deleteVote: deleteVote,
  createDBProjects: createProjectDB,
  createVoteDB: createVoteDB,
  // updateUser: updateUser,
  // removeUser: removeUser
  editProject: editProject,
  login: login
};
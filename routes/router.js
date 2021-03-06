const db               = require('../controllers/queries');
const passport         = require('passport')
const passportServices = require('../services/passport.js')
const path             = require('path')
const requireAuth      = passport.authenticate('jwt', {session: false })
const requireSignIn    = passport.authenticate('local', {session: false })

module.exports = function(app){
    app.get('/api/users', db.getAllUsers)
    app.get('/myprojects/:userId', db.getUserProjects)
    app.get('/projects', db.getProjects)
    app.post('/signin', requireSignIn, db.login)
    app.post('/signup', db.createUser)
    app.post('/createproject', db.createProject)
    app.delete('/deleteproject/:projectId', db.deleteProject)
    app.post('/editproject/:projectId', db.editProject)
    app.post('/vote', db.addVote)
    app.delete('/deletevote/:userId/:projectId', db.deleteVote)
    app.post('/createdb', db.createDBProjects)
    app.post('/createdbvote', db.createVoteDB)
    app.get('/*',  (req, res) =>{
        res.sendFile(path.join(__dirname, '../client/build/'));
        // res.send({ message: 'Hi, if u out here, is cuz u are auth'}) 
    })
}
const db               = require('../controllers/queries');
const passport         = require('passport')
const passportServices = require('../services/passport.js')
const path             = require('path')
const requireAuth      = passport.authenticate('jwt', {session: false })
const requireSignIn    = passport.authenticate('local', {session: false })

module.exports = function(app){
    app.get('/home', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build/'));
    })
    app.get('/',  (req, res) =>{
        res.sendFile(path.join(__dirname, '../../client/build/'));
        // res.send({ message: 'Hi, if u out here, is cuz u are auth'}) 
    })
    app.get('/api/users', db.getAllUsers)
    app.get('/myprojects/:userId', db.getUserProjects)
    // app.get('/api/user/:id', db.getSingleUser);
    app.get('/projects', db.getProjects)
    app.post('/signin', requireSignIn, db.login)
    app.post('/signup', db.createUser)
    app.post('/createproject', db.createProject)
    app.delete('/deleteproject/:id', db.deleteProject)
    app.post('/editproject/:id', db.editProject)

    // app.put('/api/user/:id', db.updateUser);
    // app.delete('/api/user/:id', db.removeUser);
}
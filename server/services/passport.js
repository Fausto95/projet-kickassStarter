const passport      = require('passport')
const config        = require('../config/config')
const JwtStrategy   = require('passport-jwt').Strategy
const ExtractJwt    = require('passport-jwt').ExtractJwt
const User          = require('../models/users')
const LocalStrategy = require('passport-local')
const bcrypt        = require('bcrypt')

/// Create local strategy
const localLogin = new LocalStrategy({ usernameField: 'email' }, (email, password, done) =>{
    // Verify if the users email and password are correct
    User.findOne({where: {email: email}})
    .then(user => {
        if(!user) return done(null, false)
        if(user){
            const unHashPass = bcrypt.compareSync(password, user.password)
            console.log('th pass des', unHashPass)
            unHashPass ? done(null, user) : done(null, false)
        }
    })
})

// Set up options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) =>{
    // See if the user ID in the payload exists in our db
    // If it does, call 'done' with that other 
    // otherwise, call done without a user object
    User.findById(payload.sub)
    .then(user => done(null, user))
    .catch(err => done(err, false))
})

// Tell passport to use this strategy

passport.use(jwtLogin)
passport.use(localLogin)
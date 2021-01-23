const passport = require('passport');
const {serializeUser, deserializeUser } = require('passport');
const Strategy = require('passport-local').Strategy;
const Users = require('../models/userPassport');

passport.serializeUser(function (user, done) { 
    done(null, user._id);
    console.log('serializeUser');
});

passport.deserializeUser(function (_id, done) { 
    Users.findById(_id, function (err, user) {
        done(err, user);
        console.log('deserializeUser');
    });
});

passport.use('local.signin' ,new Strategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
    // назначение имен полей для распознования
} , function(req, email, password , done){
    req.checkBody('email' , 'invaild Email').notEmpty().isEmail();
    req.checkBody('password' , 'password Invaild').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error) {
           messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    Users.findOne({'email' : email}, function(err, user){
        if(err){
            return done (err, false);
        }
        if(user){
          return done(null , false , (req.flash('error' , 'Email is already!')));
        }
        
        var newUser = new Users({
            email : email,
            password : password
        });
        // var newUser = new uzer();
        // newUser.email = email;
        // newUser.password = password;
        newUser.save(function(err, user){
            if(err){
                return done(err, false);
            }
            console.log('i in register')
            return done(null, newUser)
        });
    })
}));

passport.use('local.signup', new Strategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
}, function(req, email, password, done){
    req.checkBody('email', 'invaild Email').notEmpty().isEmail();
    req.checkBody('password', 'invaild password').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    Users.findOne({'email' : email}, function(err, user){
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, req.flash('error' , 'User not found' ));
        }
        if (!user.validPassword(password)) {
            return done(null, false, req.flash('error' , 'Wrong password' ));
        }
        return done(null, user, req.flash('success', user.email + 'sign up Succesccful!'));
    })
}))
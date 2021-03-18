const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(
    new localStrategy( { usernameField: 'login' },
    (username,password, done) => {
        User.findOne({ login: username },
            (err,user) => {
                if(err)
                    return done(err);
                //login non existant
                else if (!user)
                    return done(null, false, { message: "Ce pangolin n'existe pas" });
                //mauvais mdp
                else if (!user.verifyPassword(password))
                    return done(null, false, { message: "Mot de passe erroné" });
                //authentification valide
                else
                    return done(null, user);
            });
    })
);


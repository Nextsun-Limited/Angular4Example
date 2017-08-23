import passportJwt from 'passport-jwt';
import passport from 'passport';
import User from '../models/users';
import config from './database';

let passportCheck = () => {
    "use strict";
    let opts = {};
    opts.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new passportJwt.Strategy(opts, (jwt_playload, done) => {
        User.getUserById(jwt_playload._doc._id, (err, user) => {
            if(err) return done(err, false);
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        });
    }));
};

let auth = () => {
    return passport.authenticate('jwt', {session: false});
};

module.exports = {
    auth: auth,
    passportCheck: passportCheck
};
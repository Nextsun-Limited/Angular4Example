import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import User from '../models/users';
import config from '../config/database'
import passport from '../config/passport'

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    User.getUserByEmail(newUser.email, (err, user) => {
        "use strict";
        if (err) throw err;
        if (user) return res.json({success: false, msg: 'The email you are using is already registered.'});
    });

    User.addUser(newUser, (err, user) => {
        "use strict";
        if(err) {
            res.json({success: false, msg: 'There was an error during the registration process, please try again.'});
        } else {
            const token = jwt.sign(user, config.secret, {
                expiresIn: 600000 // 10 min
            });

            res.json({
                success: true,
                msg: user.name + ', welcome to your new account!',
                token: 'JWT ' + token,
                user: {
                    id: user._id,
                    name: user.name,
                    emal: user.email
                }
            });
        }
    })
});

// Login
router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        "use strict";
        if(err) throw err;
        if(!user) return res.json({success: false, msg: 'The email you are using is not registered.'});

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 600000 // 10 min
                });

                res.json({
                    success: true,
                    msg: 'Welcome back ' + user.name + '!',
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        emal: user.email
                    }
                });
            } else {
                res.json({success: false, msg: 'You are using the wrong password.'})
            }
        });
    });
});

// Profile
router.get('/profile', passport.auth(), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type : String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
    "use strict";
    User.findById(id, callback);
};

module.exports.getUserByEmail = (email, callback) => {
    "use strict";
    const query = {email: email};
    User.findOne(query, callback);
};

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        "use strict";
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    "use strict";
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
};
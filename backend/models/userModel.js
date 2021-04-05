const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config');


const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        creation_dt: { type:Date, require:true},
        countries: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'countries'
        }]
    },
    { toJSON: { virtuals: true } })

userSchema.virtual('uri').get(function () {
    return `/user/${this._id}`;
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getuserById = function (id, callback) {
    User.findById(id, callback)
};

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback)
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function (passwordEntered, hash, callback) {
    bcrypt.compare(passwordEntered, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}
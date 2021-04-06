const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
        username: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        creation_dt: { type:Date, require:true},
        role: { type: String, default: "user", enum: ["user", "admin"]},
        countries: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'countries'
        }]
    });

    module.exports = mongoose.model('user', userSchema);
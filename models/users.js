var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var crypto = require('crypto');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwt-config');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'], index: true,
        unique: true
    },
    username: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true,
        unique: true
    },
    // password: { type: String, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    admin: Boolean
}, {
    timestamps: true
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});


UserSchema.methods.setPassword = function (password) {
    console.log('password', password);
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');

    return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username
        // exp: parseInt(exp.getTime() / 1000)
      }, jwtConfig.secret);
};

UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT()
  };
};



mongoose.model('User', UserSchema);

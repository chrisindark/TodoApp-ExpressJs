var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = Promise;
var User = mongoose.model('User');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwt-config');

function getTokenFromHeader (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

router.post('/auth/login', function(req, res, next) {
    if(!req.body.username){
        return res.status(422).json({errors: {username: "can't be blank"}});
    }

    if(!req.body.password){
        return res.status(422).json({errors: {password: "can't be blank"}});
    }

    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }

        if (user) {
            user.token = user.generateJWT();
            return res.json({user: user.toAuthJSON()});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

router.post('/auth/register', function (req, res) {
    var user = new User();

    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save().then(function (user) {
        res.json({user: user.toAuthJSON()});
    }).catch(function (err) {
        if (err) {
            res.send(err);
        }
    });
});

module.exports = router;

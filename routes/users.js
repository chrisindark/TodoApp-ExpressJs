var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');


// get all users
router.get('/users', function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.status(400).send(err);
        }
        res.json(users);
    });
});

router.get('/users/:id', function (req, res) {
    User.find({
        _id: req.params.id
    }, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

router.delete('/users/:id', function (req, res) {
    User.remove({
        _id: req.params.id
    }, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

module.exports = router;

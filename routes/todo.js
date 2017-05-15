var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

// get all todos
router.get('/todos', function (req, res) {
    // use mongoose to get all todos in the database
    Todo.find(function (err, todos) {
        if (err) {
            res.status(400).send(err);
        }
        res.json(todos);
    });
});

// create todo and send back all todos after creation
router.post('/todos', function (req, res) {
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err) {
            res.send(err);
        }
        res.json(todo);
    });
});

router.get('/todos/:id', function (req, res) {
    Todo.find({
        _id: req.params.id
    }, function (err, todo) {
        if (err) {
            res.send(err);
        }
        res.json(todo);
    });
});

// delete a todo
router.delete('/todos/:id', function (req, res) {
    Todo.remove({
        _id: req.params.id
    }, function (err, todo) {
        if (err) {
            res.send(err);
        }
        res.json(todo);
    });
});

module.exports = router;

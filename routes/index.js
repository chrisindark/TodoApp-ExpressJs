var express = require('express');
var router = express.Router();

router.get('*', function (req, res) {
    // load the single view file (angular will handle the page changes on the front-end)
    res.sendFile('index.html', {root: 'public'});
});

module.exports = router;

var express = require('express');

var controller = require('../controller/user.controller');


var router = express.Router();

router.get('/', controller.index)

router.get('/search', controller.search)

router.get('/create', function (req, res) {
    res.render('users/create');
});

router.get('/:id', controller.get);

router.post('/create', controller.postCreate);

module.exports = router;
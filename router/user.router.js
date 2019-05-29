var express = require('express');
var validate = require('../validate/user.validate');

var controller = require('../controller/user.controller');


var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;
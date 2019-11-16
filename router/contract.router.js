var express = require('express');

var validate = require('../validate/contract.validate');
var controller = require('../controller/contract.controller');


var router = express.Router();

router.get('/', controller.index);

router.get('/search',validate.search, controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.getView);

router.get('/edit/:id', controller.get);

router.post('/create',
    validate.postCreate,
    controller.postCreate
);

router.post('/edit', controller.updateContract);

module.exports = router;
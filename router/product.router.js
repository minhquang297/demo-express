var express = require('express');

var validate = require('../validate/product.validate');
var controller = require('../controller/product.controller');


var router = express.Router();

router.get('/', controller.index);

router.get('/list', controller.list);

router.get('/search', controller.search);

router.get('/searchToList', controller.searchToList);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;
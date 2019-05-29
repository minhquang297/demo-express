var express = require('express');

var controller = require('../controller/user.controller');


var router = express.Router();

router.get('/', controller.index)

<<<<<<< HEAD
router.get('/search', function (req, res) {
    var q = req.query.q
    var matchedUsers = db.get('users').value().filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        // Hàm indexOf sẽ tìm kiếm một phần tử trong mảng dựa vào giá trị của 
        // phần tử, hàm sẽ trả về vị trị( khóa) của phần tử nếu tìm thấy và 
        // trả về -1 nếu không tìm thấy.
    })
    res.render('users/index', {
        users: matchedUsers
    });
})
=======
router.get('/search', controller.search)
>>>>>>> demo

router.get('/create', function (req, res) {
    res.render('users/create');
});

router.get('/:id', controller.get);

router.post('/create', controller.postCreate);

module.exports = router;
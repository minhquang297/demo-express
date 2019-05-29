var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = 3000;
var shortid = require('shortid');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
db = low(adapter);

app.set('view engine', 'pug');
app.set('views', './views');

// Set some defaults
db.defaults({ users: [] })
    .write()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index', {
        name: 'Quang'
    });
})

app.get('/users', function (req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

app.get('/users/search', function (req, res) {
    var q = req.query.q
    var matchedUsers = users.filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        // Hàm indexOf sẽ tìm kiếm một phần tử trong mảng dựa vào giá trị của 
        // phần tử, hàm sẽ trả về vị trị( khóa) của phần tử nếu tìm thấy và 
        // trả về -1 nếu không tìm thấy.
    })
    res.render('users/index', {
        users: matchedUsers
    });
})

app.get('/users/create', function (req, res) {
    res.render('users/create');
});

app.get('/users/:id', function (req, res) {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: user
    })
});

app.post('/users/create', function (req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));


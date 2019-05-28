const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var users = [
    { id: 1, name: 'Quang' },
    { id: 2, name: 'Ha' },
];


app.get('/', function (req, res) {
    res.render('index', {
        name: 'Quang'
    });
})

app.get('/users', function (req, res) {
    res.render('users/index', {
        users: users
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

app.post('/users/create', function (req, res) {
    console.log(req.body);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));


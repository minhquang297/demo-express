var express = require('express');
var bodyParser = require('body-parser');
var userRouter = require('./router/user.router');

var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index', {
        name: 'Minh Quang'
    });
})

app.use('/users', userRouter);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));


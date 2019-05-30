require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var port = 3000;
var app = express();

var userRouter = require('./router/user.router');
var authRouter = require('./router/auth.router');

var authMiddleware = require('./middlewares/auth.middleware');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use('/auth', authRouter);
app.use('/users', authMiddleware.requireAuth, userRouter);

app.get('/', authMiddleware.requireAuth, function (req, res) {
    res.render('index', {
        name: 'Minh Quang'
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


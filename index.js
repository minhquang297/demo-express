require('dotenv').config();

var express = require('express');
var ConnectDB = require('./config/connectDB');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')


var port = 3000;
var app = express();
ConnectDB();

var userRouter = require('./router/user.router');
var productRouter = require('./router/product.router');
var authRouter = require('./router/auth.router');
var contractRouter = require('./router/contract.router');

// var cartRouter = require('./router/cart.router');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware)

app.use('/auth', authRouter);
app.use('/users', authMiddleware.requireAuth, userRouter);
app.use('/products', authMiddleware.requireAuth, productRouter);
app.use('/contracts', authMiddleware.requireAuth, contractRouter);

// app.use('/cart', cartRouter);


app.get('/', authMiddleware.requireAuth, function(req, res) {
    res.render('index', {
        name: 'Minh Quang'
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
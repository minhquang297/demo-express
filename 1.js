const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', function (req, res) {
    res.render('index', {
        name: 'Quang'
    });
})

app.get('/users', function (req, res) {
    res.render('users/index', {
        users: [
            {
                id: 1,
                name: 'Quang'
            },
            {
                id: 2,
                name: 'Ha'
            }
        ]
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


var md5 = require('md5');

var User = require('../models/user.model');

module.exports.login = function(req, res) {
    res.render('auth/login');
};

module.exports.postLogin =  function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = User.find({ email: email }, function(err, userFound){
        if (!user) {
            res.render('auth/login', {
                errors: [
                    'User does not exists.'
                ],
                values: req.body
            });
            return;
        }
        //console.log(md5("123456"));
        if (userFound[0].password !== md5(password)) {
            res.render('auth/login', {
                errors: [
                    'Wrong password.'
                ],
                values: req.body
    
            });
            return;
        }
        res.cookie('userId', userFound[0].id, { signed: true })
        res.redirect('/users');
    });

   

   
 
};
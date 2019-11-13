var User = require('../models/user.model');

module.exports.requireAuth = function (req, res, next) {
    if (!req.signedCookies.userId) {
        res.redirect('/auth/login');
        return;
    }
    var user = User.find({ id: req.signedCookies.userId }, function(err, id){
        if (!user) {

            res.redirect('/auth/login');
            return;
        }
        res.locals.user = user;
        next();

    })
};

    // var user = db.get('users').find({ id: req.signedCookies.userId }).value();
    // if (!user) {

    //     res.redirect('/auth/login');
    //     return;
    // }
    // res.locals.user = user;
    // next();

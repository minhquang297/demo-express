var User = require('../models/user.model');

module.exports.index = async function(req, res) {
    var users = await User.find();
    res.render('users/index', {
        users: users
    })
};
module.exports.search = async function(req, res) {
    var q = req.query.q;
    var users = await User.find();
    var matchedUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    res.render('users/index', {
        users: matchedUsers
    });
};

module.exports.create = function(req, res) {
    res.render('users/create');
};

module.exports.get = function(req, res) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) throw err;
        res.render('users/view', {
            user: user
        })
    });
}

module.exports.postCreate = function(req, res) {
    req.body.avatar = req.file.path.split('/').slice(1).join('\\');
    var user = new User({
        name: req.body.name,
        phone: req.body.phone,
        avatar: req.body.avatar
    })
    user.save(function(err) {
        if (err) {
            return handleError(err);
        }
    })
    res.redirect('/users')
}
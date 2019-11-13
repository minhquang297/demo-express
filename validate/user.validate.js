module.exports.postCreate = function(req, res, next) {
    //validation(login)
    var errors = [];

    if (!req.body.name) {
        errors.push('Name is required.')
    }
    if (!req.body.phone) {
        errors.push('Phone is required.')
    }
    // if (!req.body.avatar) {
    //     errors.push('Avatar is required.')
    // }
    if (errors.length) { //falsy truthy
        res.render('users/create', {
            errors: errors,
            values: req.body
        })
        return;
    }
    next();
}
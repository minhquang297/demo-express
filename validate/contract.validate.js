module.exports.postCreate = function(req, res, next) {
    //validation(login)
    var errors = [];

    if (!req.body.address) {
        errors.push('Address is required.')
    }
    if (!req.body.clientName) {
        errors.push('Client name is required.')
    }
    if (!req.body.status) {
        errors.push('Status is required.')
    }
    if (errors.length) { //falsy truthy
        res.render('contracts/create', {
            errors: errors,
            values: req.body
        })
        return;
    }
    next();
}
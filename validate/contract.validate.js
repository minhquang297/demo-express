var Contract = require('../models/contract.model');

module.exports.postCreate = function(req, res, next) {
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
module.exports.search = async function(req, res, next) {
    var errorsSearch = [];
    var regex = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/;
    var isValid = regex.test(req.query.date) && req.query.date !== "";
    if (isValid == false) {
        errorsSearch.push('Please take date from calender form !')
    }
    if (errorsSearch.length) { //falsy truthy
        var contracts = await Contract.find();
        res.render('contracts/index', {
            errorsSearch: errorsSearch,
            contracts: contracts
        })
        return;
    }
    next();
}
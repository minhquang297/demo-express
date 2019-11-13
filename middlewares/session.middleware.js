// var db = require('../db')

// var shortid = require('shortid');

// module.exports = function (req, res, next) {
//     var sessionId = shortid.generate()
//     if (!req.signedCookies.sessionId) {
//         res.cookie('sessionId', sessionId, { signed: true })
//     }
//     db.get('sessions').push({
//         id: sessionId,
//     }).write();
//     next();
// }
var shortid = require('shortid');

var Session = require('../models/session.model');
module.exports = function (req, res, next) {
    var sessionId = shortid.generate()

    if (!req.signedCookies.sessionId) {
        res.cookie('sessionId', sessionId, { signed: true })
    }
    var session = new Session({
        id: sessionId,

    })
    session.save(function(err) {
        if (err) {
            return handleError(err);
        }
    })
    next();
}
var db = require('../db')

var shortid = require('shortid');

module.exports = function (req, res, next) {
    var sessionId = shortid.generate()
    if (!req.signedCookies.sessionId) {
        res.cookie('sessionId', sessionId, { signed: true })
    }
    db.get('sessions').push({
        id: sessionId,
    }).write();
    next();
}
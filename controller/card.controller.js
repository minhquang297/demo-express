var db = require('../db')

module.exports.addToCard = function (req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.redirect('/products/list');
        return;
    }

    var count = db.get('sessions')
        .find({ id: sessionId })
        .get('card.' + productId, 0).value();

    db.get('sessions')
        .find({ id: sessionId })
        .set('cart.' + productId, count + 1)
        .write();
    res.redirect('/products/list');

};
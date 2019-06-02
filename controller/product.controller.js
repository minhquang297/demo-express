var Product = require('../models/product.model')
// var shortid = require('shortid');

module.exports.index = async function (req, res) {
    // res.render('products/index', {
    //     products: db.get('products').value()
    // });
    var products = await Product.find();
    res.render('products/index', {
        products: products
    });
};

module.exports.list = async function (req, res) {
    //Pagination (Phan trang)
    var page = parseInt(req.query.page) || 1;//n
    var perPage = 9 //x

    var start = (page - 1) * perPage;
    var end = page * perPage;

    // var drop = (page - 1) * perPage;

    // res.render('products/list', {
    //     // products: db.get('products').value().slice(start, end)
    //     //cach 2 
    //     // doc thu vien lodash
    //     products: db.get('products').drop(drop).take(perPage).value()

    // });
    var products = await Product.find();
    res.render('products/list', {
        products: products.slice(start, end)
    });
};

module.exports.search = async function (req, res) {
    var products = await Product.find();

    var q = req.query.q
    var matchedProducts = products.filter(function (product) {
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        // Hàm indexOf sẽ tìm kiếm một phần tử trong mảng dựa vào giá trị của 
        // phần tử, hàm sẽ trả về vị trị( khóa) của phần tử nếu tìm thấy và 
        // trả về -1 nếu không tìm thấy.
    })
    res.render('products/index', {
        products: matchedProducts
    });
};

module.exports.searchToList = async function (req, res) {
    var products = await Product.find();

    var q = req.query.q
    var matchedProducts = products.filter(function (product) {
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        // Hàm indexOf sẽ tìm kiếm một phần tử trong mảng dựa vào giá trị của 
        // phần tử, hàm sẽ trả về vị trị( khóa) của phần tử nếu tìm thấy và 
        // trả về -1 nếu không tìm thấy.
    })
    res.render('products/list', {
        products: matchedProducts
    });
};

module.exports.create = function (req, res) {
    res.render('products/create');
};

module.exports.get = function (req, res) {
    var id = req.params.id;
    var product = db.get('products').find({ id: id }).value();
    res.render('products/view', {
        product: product
    })
}

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    db.get('products').push(req.body).write();
    res.redirect('/products')
}

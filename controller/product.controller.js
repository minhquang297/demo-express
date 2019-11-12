var Product = require('../models/product.model');

module.exports.index = async function(req, res) {
    var products = await Product.find();
    console.log(products + "eweqwe");

    res.render('products/index', {
        products: products
    })
};

module.exports.list = function(req, res) {
    //Pagination (Phan trang)
    // var page = parseInt(req.query.page) || 1; //n
    // var perPage = 9 //x

    // var start = (page - 1) * perPage;
    // var end = page * perPage;

    // var drop = (page - 1) * perPage;

    // res.render('products/list', {
    //     // products: db.get('products').value().slice(start, end)
    //     //cach 2 
    //     // doc thu vien lodash
    //     products: db.get('products').drop(drop).take(perPage).value()

    // });

    const options = {
        sort: { _id: -1 },
        limit: parseInt(req.query.limit || 20, 10),
        page: parseInt(req.query.page || 1, 10)
    }
    Product.paginate({}, options).then(function(products) {
        res.render('products/list', {
            products: products
        })
        console.log(products);
    })
};

module.exports.search = async function(req, res) {
    var q = req.query.q
    var products = await Product.find();
    var matchedProducts = products.filter(function(product) {
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        // Hàm indexOf sẽ tìm kiếm một phần tử trong mảng dựa vào giá trị của 
        // phần tử, hàm sẽ trả về vị trị( khóa) của phần tử nếu tìm thấy và 
        // trả về -1 nếu không tìm thấy.
    })
    res.render('products/index', {
        products: matchedProducts
    });
};

module.exports.searchToList = async function(req, res) {
    var q = req.query.q
    var products = await Product.find();
    var matchedProducts = products.filter(function(product) {
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        // Hàm indexOf sẽ tìm kiếm một phần tử trong mảng dựa vào giá trị của 
        // phần tử, hàm sẽ trả về vị trị( khóa) của phần tử nếu tìm thấy và 
        // trả về -1 nếu không tìm thấy.
    })
    res.render('products/list', {
        products: matchedProducts
    });
};

module.exports.create = function(req, res) {
    res.render('products/create');
};

module.exports.get = function(req, res) {
    var id = req.params.id;
    Product.findById(id, function(err, product) {
        if (err) throw err;
        res.render('products/view', {
            product: product
        })
    });
}

module.exports.postCreate = function(req, res) {
    // req.body.image = req.file.path.split('/').slice(1).join('\\');
    var product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        // image: req.body.image

    })
    product.save(function(err) {
        if (err) {
            return handleError(err);
        }
    })
    res.redirect('/products')
}
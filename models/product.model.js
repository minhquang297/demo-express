var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var productSchema = new mongoose.Schema({
    name: String,
    // image: String,
    price: String,
    description: String,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

productSchema.plugin(mongoosePaginate)

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
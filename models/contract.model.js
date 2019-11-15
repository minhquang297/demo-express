var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var contractSchema = new mongoose.Schema({
    address: String,
    clientName: String,
    status: String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

contractSchema.plugin(mongoosePaginate)


var Contract = mongoose.model('Contract', contractSchema, 'contracts');

module.exports = Contract;
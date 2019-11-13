var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    avatar: String,
    phone: String,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.plugin(mongoosePaginate)


var User = mongoose.model('User', userSchema, 'users');

module.exports = User;
var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    id: String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;
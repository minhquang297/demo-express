var mongoose = require('mongoose');
var bluebird = require('bluebird');
// connect to mongooseDB

let connectDB = () => {
    mongoose.Promise = bluebird;
    let URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    return mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
};

module.exports = connectDB;
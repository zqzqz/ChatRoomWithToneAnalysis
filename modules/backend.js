/**
 * Created by hevlhayt@foxmail.com
 * Date: 2016/8/30
 * Time: 10:04
 */

//const mongoose = require('mongoose');
const session = require('express-session');
//const MongoStore = require('connect-mongo/es5')(session);

/*
// connect mongodb, must be in front of router
mongoose.connect('mongodb://127.0.0.1/chat2x');
var db = mongoose.connection;
db.on('error', function () {
    console.error.bind(console, 'Connected to mongodb error');
    throw 'Connected to mongodb error';
});
db.once('open', function() {
    console.log('Connected to mongodb')
});
*/

var sessionMiddleware = session({
    secret: 'bdvstUP53hS110xN7DW8FE4NS2NdAw7X',
    store: null,
    cookie: {
        maxAge: 2 * 60 * 999999
    },
    resave: false,
    saveUninitialized: true,
    // Todo: ???
    ttl: 7 * 24 * 60 * 60
});

module.exports = sessionMiddleware;
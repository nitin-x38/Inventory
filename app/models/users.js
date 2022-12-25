'use strict';

var mongoose = require('mongoose');

var users = mongoose.Schema({
    UserId: {
        type: 'String',
        required: true,
    },
    mobileNo: {
        type: 'String',
        required: true
    },
    emailId: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        required: true
    },
    date: {
        type: 'Date',
        required: true,
        default : Date.now
    }
});

var connection = mongoose.createConnection('mongodb://localhost:27017/sales', { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

module.exports = connection.model('users', users, 'users');
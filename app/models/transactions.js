'use strict';

var mongoose = require('mongoose');

var transactions = mongoose.Schema({
    lotId: {
        type: 'String'
    },
    productId: {
        type: 'String',
        required: true
    },
    title: {
        type: 'String',
        required: true
    },
    qty: {
        type: 'Number',
        required: true
    },
    sellingDiscount: {
        type: 'Number',
        required: true
    },
    shopName: {
        type: 'String',
        required: true
    },
    customerMobile: {
        type: 'String',
        required: true
    },
    amount: {
        type: 'Number',
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

module.exports = connection.model('transactions', transactions, 'transactions');
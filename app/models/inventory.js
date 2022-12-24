'use strict';

var mongoose = require('mongoose');

var inventory = mongoose.Schema({
    lotId: {
        type: 'String',
        required: true,
    },
    productId: {
        type: 'String',
        required: true
    },
    brandName: {
        type: 'String',
        required: true
    },
    imgUrl: {
        type: 'String',
        required: true
    },
    mrp: {
        type: 'Number',
        required: true
    },
    vendorDiscount: {
        type: 'Number',
        required: true
    },
    approxSellingDiscount: {
        type: 'Number',
        required: true
    },
    titleOrModel: {
        type: 'String',
        required: true
    },
    productQty: {
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

module.exports = connection.model('inventory', inventory, 'inventory');
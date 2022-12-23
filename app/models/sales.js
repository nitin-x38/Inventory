'use strict';

var mongoose = require('mongoose');

var sales = mongoose.Schema({
    lotId: {
        type: 'String',
        required: true,
        unique: true
    },
    lotName: {
        type: 'String',
        required: true
    },
    vendorName: {
        type: 'String',
        required: true
    },
    lotDetails: {
        type: 'String',
        required: true
    },
    lotBrand: {
        type: "Mixed",
        required: true
    },
    lotPrice: {
        type: 'Number',
        required: true
    },
    appQty: {
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

module.exports = connection.model('sales', sales, 'sales');
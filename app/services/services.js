"use strict";

const SALES_MODEL = require("../models/sales");
const INVENTORY_MODEL = require("../models/inventory");
const TRANSACTIONS_MODEL = require("../models/transactions");
const UUID = require("uuid");

var saleServices = {

    addlot: async function(lotData) {
        try {

            let lotId = await UUID.v4();
            lotData.lotId = lotId;
            let lotObj = new SALES_MODEL(lotData);
            let newLot = await lotObj.save();
            return newLot;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },


    addinventory: async function(lotData) {
        try {

            let lotId = await UUID.v4();
            lotData.lotId = lotId;
            let lotObj = new INVENTORY_MODEL(lotData);
            let newLot = await lotObj.save();
            return newLot;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },


    addtransaction: async function(lotData) {
        try {

            let lotId = await UUID.v4();
            lotData.lotId = lotId;
            let lotObj = new TRANSACTIONS_MODEL(lotData);
            let newLot = await lotObj.save();
            return newLot;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },


    search: async function(findQuery, selectQuery, sort, skip, limit) {

        var data = [];
        try {

            data = await INVENTORY_MODEL
                .find(findQuery, selectQuery)
                .read("secondaryPreferred")
                .sort(sort)
                .limit(limit)
                .skip(skip) 
                .lean();
        } catch (error) {
            console.log(error);
        }

        return data;

    },
    
    getLots: async function(findQuery, selectQuery, sort, skip, limit) {

        var data = [];
        try {

            data = await SALES_MODEL
                .find(findQuery, selectQuery)
                .read("secondaryPreferred")
                .sort(sort)
                .limit(limit)
                .skip(skip) 
                .lean();
        } catch (error) {
            console.log(error);
        }

        return data;

    },
    
    getTransaction: async function(findQuery, selectQuery, sort, skip, limit) {

        var data = [];
        try {

            data = await TRANSACTIONS_MODEL
                .find(findQuery, selectQuery)
                .read("secondaryPreferred")
                .sort(sort)
                .limit(limit)
                .skip(skip) 
                .lean();
        } catch (error) {
            console.log(error);
        }

        return data;

    },
    
    getInventory: async function(findQuery, selectQuery, sort, skip, limit) {

        var data = [];
        try {

            data = await INVENTORY_MODEL
                .find(findQuery, selectQuery)
                .read("secondaryPreferred")
                .sort(sort)
                .limit(limit)
                .skip(skip) 
                .lean();
        } catch (error) {
            console.log(error);
        }

        return data;

    },
};

module.exports = saleServices;

'use strict';

const SERVICES = require("../services/services");

var controllers = {

    addLot: async function (req, res) {

        try {
            let lotName = req.body.lotName;
            let vendorName = req.body.vendorName;
            let lotDetails = req.body.lotDetails;
            let lotBrands = req.body.lotBrands;
            let lotPrice = req.body.lotPrice;
            let approxQty = req.body.approxQty;
            let lotData = req.body;

            if (lotName == null || lotName == undefined || lotName.length == 0) {
                throw new Error("Lot Name must be filled out.");
            }

            if (vendorName == null || vendorName == undefined || vendorName.length == 0) {
                throw new Error("Vendor Name must be filled out.");
            }

            if (lotDetails == null || lotDetails == undefined || lotDetails.length == 0) {
                throw new Error("Lot Details must be filled out.");
            }

            if (lotBrands == null || lotBrands == undefined && !Array.isArray(lotBrands)) {
                throw new Error("Lot Brand must be filled out.");
            }

            if (lotPrice == null || lotPrice == undefined || isNaN(lotPrice)) {
                throw new Error("Lot Price must be filled out.");
            }

            if (approxQty == null || approxQty == undefined || isNaN(approxQty)) {
                throw new Error("Appoximate Quantity must be filled out.");
            }
            let data = await SERVICES.addlot(lotData);
            let response = {
                success: 1,
                data: data
            }
            return res.send(response);

        } catch (e) {
            console.error(e);

            let response = {
                success: 0,
                message: e.message
            }

            return res.send(response);
        }
    },

    addInventory: async function (req, res) {

        try {
            let lotId = req.body.lotId;
            let brandName = req.body.brandName;
            let imgUrl = req.body.imgUrl;
            let mrp = req.body.mrp;
            let vendorDiscount = req.body.vendorDiscount;
            let approxSellingDiscount = req.body.approxSellingDiscount;
            let titleOrModel = req.body.titleOrModel;
            let productQty = req.body.productQty;
            let lotData = req.body;

            if (lotId == null || lotId == undefined || lotId.length == 0) {
                throw new Error("LotId must be filled out.");
            }

            if (brandName == null || brandName == undefined || brandName.length == 0) {
                throw new Error("Brand Name must be filled out.");
            }

            if (imgUrl == null || imgUrl == undefined || imgUrl.length == 0) {
                throw new Error("Img URL must be filled out.");
            }

            if (mrp == null || mrp == undefined || isNaN(mrp)) {
                throw new Error("MRP must be filled out.");
            }

            if (vendorDiscount == null || vendorDiscount == undefined || isNaN(vendorDiscount)) {
                throw new Error("Vendor Discount must be filled out.");
            }

            if (approxSellingDiscount == null || approxSellingDiscount == undefined || isNaN(approxSellingDiscount)) {
                throw new Error("Approximate Selling Discount must be filled out.");
            }

            if (titleOrModel == null || titleOrModel == undefined || titleOrModel.length == 0) {
                throw new Error("Title of Model must be filled out.");
            }

            if (productQty == null || productQty == undefined || isNaN(productQty)) {
                throw new Error("Product Quantity must be filled out.");
            }

            let findQuery = { lotId: lotId };
            let fdata = await SERVICES.getLots(findQuery, { lotId: 1 }, {}, 0, 0)
            if (fdata.length < 0) {
                throw new Error("The lotId is not exist.")
            }

            let data = await SERVICES.addinventory(lotData);
            let response = {
                success: 1,
                data: data
            }
            return res.send(response);

        } catch (e) {
            console.error(e);

            let response = {
                success: 0,
                message: e.message
            }

            return res.send(response);
        }
    },

    search: async function (req, res) {

        let titleOrModel = req.body.titleOrModel;
        let brandName = req.body.brandName;
        try {
            let findQuery = { $or: [{ titleOrModel: titleOrModel }, { brandName: brandName }] };
            let sdata = await SERVICES.search(findQuery, { _id: 1, productId: 1, lotId: 1, brandName: 1, imgUrl: 1, mrp: 1, vendorDiscount: 1, appSellingDiscount: 1, titleofModel: 1, productQty: 1 }, {}, 0, 100);

            let response = {
                success: 1,
                data: sdata
            }

            return res.send(response);

        } catch (e) {
            console.error(e);

            let response = {
                success: 0,
                message: e.message
            }

            return res.send(response);
        }
    },

    addTransaction: async function (req, res) {

        try {
            let productId = req.body.productId;
            let title = req.body.title;
            let qty = req.body.qty;
            let sellingDiscount = req.body.sellingDiscount;
            let shopName = req.body.shopName;
            let customerMobile = req.body.customerMobile;
            let amount = req.body.amount;
            let lotData = req.body;

            if (productId == null || productId == undefined || productId.length == 0) {
                throw new Error("ProductId must be filled out.");
            }

            if (title == null || title == undefined || title.length == 0) {
                throw new Error("Title must be filled out.");
            }

            if (qty == null || qty == undefined || isNaN(qty)) {
                throw new Error("Quantity must be filled out.");
            }

            if (sellingDiscount == null || sellingDiscount == undefined || isNaN(sellingDiscount)) {
                throw new Error("Selling Discount must be filled out.");
            }

            if (shopName == null || shopName == undefined || shopName.length == 0) {
                throw new Error("Shop Name must be filled out.");
            }

            if (customerMobile == null || customerMobile == undefined || isNaN(customerMobile)) {
                throw new Error("Number must be filled out.");
            }

            if (amount == null || amount == undefined || isNaN(amount)) {
                throw new Error("Amount must be filled out.");
            }

            //---------------- Quantity Decrement-----------------------

            let findQuery = { productId: productId };
            let qdata = await SERVICES.getInventory(findQuery, {}, {}, 0, 1)
            if (qdata.length == 0) {
                throw new Error("There is no Quantity available in Inventory");
            }

            if (qdata[0].productQty <= qty) {
                throw new Error("Qyantity not Valid");
            }
            qty = 0-qty;
            let filter = { productId: productId };
            let updateData = { $inc: { productQty: qty } };
            let udata = await SERVICES.updateInventory(filter, updateData);

            // ---------------------------------------------------------

            let data = await SERVICES.addtransaction(lotData);
            let response = {
                success: 1,
                data: data,
                update: udata
            }
            return res.send(response);

        } catch (e) {
            console.error(e);

            let response = {
                success: 0,
                message: e.message
            }

            return res.send(response);
        }
    },

    getAllLots: async function (req, res) {

        try {
            let findQuery = {}
            let sdata = await SERVICES.getLots(findQuery, {}, {}, 0, 100);

            let response = {
                success: 1,
                data: sdata
            }

            return res.send(response);

        } catch (e) {
            console.error(e);

            let response = {
                success: 0,
                message: e.message
            }

            return res.send(response);
        }
    },

    getAllTransaction: async function (req, res) {

        try {
            let findQuery = {}
            let sdata = await SERVICES.getTransaction(findQuery, {}, {}, 0, 100);

            let response = {
                success: 1,
                data: sdata
            }

            return res.send(response);

        } catch (e) {
            console.error(e);

            let response = {
                success: 0,
                message: e.message
            }

            return res.send(response);
        }
    },

    getAllInventory: async function (req, res) {

        try {
            let findQuery = {}
            let sdata = await SERVICES.getInventory(findQuery, {}, {}, 0, 100);

            let response = {
                success: 1,
                data: sdata
            }

            return res.send(response);

        } catch (e) {
            console.error(e);

            let response = {
                success: 0,
                message: e.message
            }

            return res.send(response);
        }
    },

    getAllInventoryOfLots: async function (req, res) {
        
            let lotId = req.body.lotId;
        try {
            let findQuery = {lotId:lotId}
            let sdata = await SERVICES.getInventory(findQuery, {}, {}, 0, 100);

            let response = {
                success: 1,
                data: sdata
            }

            return res.send(response);

        } catch (e) {
            console.error(e);

            let response = {
                success: 0,
                message: e.message
            }

            return res.send(response);
        }
    },
};


module.exports = controllers;
'use strict';

const Controller = require('./controllers/controller');

module.exports = function (app) {

    app.route('/sale/addLot').post(Controller.addLot);
    app.route('/sale/addInventory').post(Controller.addInventory);
    app.route('/sale/addTransaction').post(Controller.addTransaction);
    app.route('/sale/search').post(Controller.search);
    app.route('/sale/getallLots').post(Controller.getAllLots);
    app.route('/sale/getallTransaction').post(Controller.getAllTransaction);
    app.route('/sale/getallInventory').post(Controller.getAllInventory);
    app.route('/sale/getallInventoryofLots').post(Controller.getAllInventoryOfLots);
    app.route('/sale/getAllTransactionOfLots').post(Controller.getAllTransactionOfLots);
    app.route('/sale/getUserLogin').post(Controller.getUserLogin);

}

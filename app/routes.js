'use strict';

const Controller = require('./controllers/controller');

module.exports = function (app) {

    app.route('/sale/addLot').post(Controller.addLot);
    app.route('/sale/addInventory').post(Controller.addInventory);
    app.route('/sale/addTransaction').post(Controller.addTransaction);
    app.route('/sale/search').get(Controller.search);
    app.route('/sale/getallLots').get(Controller.getallLots);
    app.route('/sale/getallTransaction').get(Controller.getallTransaction);
    app.route('/sale/getallInventory').get(Controller.getallInventory);

}

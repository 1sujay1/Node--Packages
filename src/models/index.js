let db = {};

db.user = require('./UserModel');
db.track = require('./TrackModel');
db.order = require('./OrdersModel.js');
db.inventory = require('./InventoryModel.js');

module.exports = db;
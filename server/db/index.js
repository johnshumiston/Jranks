'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user')(db);
var Inventory = require('./models/inventory')(db);
var Order = require('./models/order')(db);
var Address = require('./models/address')(db);
var BillingInfo = require('./models/billingInfo')(db);
var OrderItem = require('./models/orderItem')(db);
var Review = require('./models/review')(db);


console.log("Helloooooooooooooo");
//Review relationships
Review.belongsTo(Inventory);
//Billing Info relationships
BillingInfo.belongsTo(User, {as: 'cardholder'});

//Order Item relationships
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Inventory, {as: 'item'});

//Order relationships
Order.belongsTo(User);
Order.belongsTo(Address);

//Address relationships
Address.belongsTo(User);


db.sync();
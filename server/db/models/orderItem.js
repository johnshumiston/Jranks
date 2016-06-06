'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('orderItem', {
        quantity: {
            type: Sequelize.INTEGER
        }
    });

  return db.orderItem;

};

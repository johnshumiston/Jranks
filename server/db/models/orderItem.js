'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('orderItem', {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
};

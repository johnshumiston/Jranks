'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('orderItem', {
        quantity: {
            type: Sequelize.INTEGER,
            min: 1,
            allowNull: false
        }
    } 
    );
};

'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('orderItem', {
        quantity: {
            type: Sequelize.INTEGER,
            min: 1,
            allowNull: false
        }
    } // not sure how to keep track of calculated price so that if price changes elsewhere, it doesn't change here #JP
    // {
    // 	instanceMethods: {

    // 	}
    // }
    );
};

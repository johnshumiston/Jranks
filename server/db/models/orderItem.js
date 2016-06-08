'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('orderItem', {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false  //restrict to being greater than 1 as well CdV/OB
        }
        //this model should also keep track of calculated price so that if price changes elsewhere, it doesn't change here CdV/OB
    });
};

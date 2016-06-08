'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('inventory', {
        item: { //title/product name, should be unique CdV/OB
            type: Sequelize.STRING,
            allowNull: false //watch out for empty string again CdV/OB
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false //minimum zero as well (don't want negative) CdV/OB
        },
        type: {
            type: Sequelize.ENUM,
            values: ['side', 'food', 'drink', 'alcoholic_drink']
        },
        price: {
            type: Sequelize.FLOAT, //make it an integer CdV/OB
            allowNull: false //some numeric minimum CdV/OB
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false //watch out for empty string again CdV/OB
        },
        image_url: {
            type: Sequelize.STRING
        }
    });

};
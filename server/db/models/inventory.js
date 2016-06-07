'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('inventory', {
        item: {
            type: Sequelize.STRING,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM,
            values: ['side', 'food', 'drink', 'alcoholic_drink']
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        image_url: {
            type: Sequelize.STRING
        }
    });

};
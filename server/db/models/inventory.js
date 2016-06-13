'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {


    return db.define('inventory', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            min: 0,
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM,
            values: ['side', 'food', 'drink', 'alcoholic_drink'],
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            min: 50,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            notEmpty: true
        },
        image_url: {
            type: Sequelize.STRING
        }
    }, {
        getterMethods: {
            displayPrice: function() {
                var priceStr = String(this.price);
                if (priceStr.length < 3) priceStr = ("00" + priceStr).slice(-3)
                return "$" + priceStr.slice(0, -2) + "." + priceStr.slice(-2);
            }
        }
    });

};
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
            min: 1,
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
    });

};
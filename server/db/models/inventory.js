'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('inventory', {
        item: {
            type: Sequelize.STRING,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        food: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        drink: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        alcoholic_drink: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    });

    return db.inventory;
};
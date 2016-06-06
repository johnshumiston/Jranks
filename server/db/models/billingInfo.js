'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('billingInfo', {
        card_number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expiration: {
            type: Sequelize.DATE,
            allowNull: false
        },
        street_1: {
            type: Sequelize.STRING,
            allowNull: false
        },
        street_2: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        zip: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return db.billingInfo;

};


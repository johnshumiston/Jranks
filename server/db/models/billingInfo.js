'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('billingInfo', {
        card_number: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        expiration: {
            type: Sequelize.DATE
        },
        street_1: {
            type: Sequelize.STRING
        },
        street_2: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        }
    });

    return db.billingInfo;

};


'use strict';
var Sequelize = require('sequelize');
var Review = require('./review');

module.exports = function (db) {

    return db.define('orderItem', {
        quantity: {
            type: Sequelize.INTEGER,
            min: 1,
            allowNull: false
        }
    },
        {
        defaultScope: {
            include: [Review(db)]
        }
    }
    );
};

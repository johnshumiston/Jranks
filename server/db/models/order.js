// 'use strict';
var Sequelize = require('sequelize');
var OrderItem = require('./orderItem');

module.exports = function (db) {

    return db.define('order', {
        date: {
            type: Sequelize.DATE,
            defaultValue: function (){ return new Date(); }
        },
        status: {
            type: Sequelize.ENUM,
            values: ['complete', 'cancelled', 'pending'],
            defaultValue: 'pending'
        }
    },
    {
        defaultScope: {
            include: [OrderItem(db)]
        }
    }
    );
};
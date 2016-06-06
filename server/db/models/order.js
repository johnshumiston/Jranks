// 'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('order', {
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        is_complete: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return db.order;

};
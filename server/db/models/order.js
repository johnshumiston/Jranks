// 'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('order', {
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        is_complete: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

};
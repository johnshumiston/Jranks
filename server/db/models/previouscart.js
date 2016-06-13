'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('previouscart', {
        items: {
            type: Sequelize.JSON,
            defaultValue: {}
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: function (){ return new Date(); }
        }
    });
};

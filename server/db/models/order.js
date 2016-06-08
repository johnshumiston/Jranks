// 'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) { //default scope, include orderItems (eagerly load) CdV/OB

    return db.define('order', {
        date: {
            type: Sequelize.DATE,
            allowNull: false, //don't need to worry about null if there is a default value CdV/OB
            defaultValue: new Date() //should be a function, otherwise it will always use the same date (when new Date is first run) CdV/OB
        },
        is_complete: {
            type: Sequelize.BOOLEAN,  //need more statuses related to order (still in cart/ordered/shipped/cancelled) CdV/OB
            allowNull: false
        }
    });

};
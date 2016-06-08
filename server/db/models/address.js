// 'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('address', {
        instructions: {
            type: Sequelize.TEXT
        },
        is_primary: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        street_1: {
            type: Sequelize.STRING,
            allowNull: false
        },
        street_2: {
            type: Sequelize.STRING
        },        
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        zip: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
    // , {
    //     hooks: {
    //         beforeUpdate: function (address) {
    //             if (address.changed('is_primary')) {
    //                 user.salt = user.Model.generateSalt();
    //                 user.password = user.Model.encryptPassword(user.password, user.salt);
    //             }
    //         }
    //     }
    // }
    );
};

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
            allowNull: false,
            notEmpty: true
        },
        street_2: {
            type: Sequelize.STRING
        },        
        state: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        zip: {
            type: Sequelize.STRING,
            len: [5, 10],
            allowNull: false
        }
    },
    {
        instanceMethods: { //#JP
            reconcilePrimary: function(){
                if (this.is_primary){
                    Address.findAll({where: {id: {$ne: this.id}, userId: this.userId}})
                    .then(function(addresses){
                        addresses.forEach(function(address){
                            address.update({is_primary: false});
                        });
                    })
                }
                return this;
            }
        }
    });
};
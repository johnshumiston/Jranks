var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('review', {
        name: {
            type: Sequelize.STRING,
            notEmpty: true,
            defaultValue: "Anonymous"
        },
        title: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        review_body: {
            type: Sequelize.TEXT,
            allowNull: false,
            notEmpty: true
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: function (){ return new Date(); }
        },
        stars: {
            type: Sequelize.INTEGER,
            validate: { min: 1, max: 5 }
        }
    });

};
var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('review', {
        name: {
            type: Sequelize.STRING
        },
        review_body: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        stars: {
            type: Sequelize.INTEGER,
            validate: { min: 0, max: 5 }
        }
    });

};
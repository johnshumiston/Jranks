var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('review', {
        name: {     //maybe rename title CdV/OB
            type: Sequelize.STRING
        },
        review_body: {
            type: Sequelize.TEXT,
            allowNull: false    //watch out for empty strings (not null) CdV/OB
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false, //don't need to worry about null if there is a default value CdV/OB
            defaultValue: new Date()    //should be a function, otherwise it will always use the same date (when new Date is first run) CdV/OB
        },
        stars: {
            type: Sequelize.INTEGER,
            validate: { min: 0, max: 5 }
        }
    });

};
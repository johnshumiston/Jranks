/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Inventory = db.model('inventory');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            first_name: 'John',
            last_name: 'Humiston',
            birth: 10/15/1988,
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            first_name: 'John2',
            last_name: 'Humiston2',
            birth: 10/15/1983,
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedInventory = function () {

    var items = [
        {
            item: 'The Best Burger',
            quantity: 5,
            type: 'food',
            price: 23,
            description: 'Perfect combination of the best burger in town, lettuce, tomatoes and a special sauce'
        },
        {
            item: 'The Italian Dream',
            quantity: 2,
            type: 'food',
            price: 233,
            description: "Pastrami sandwich with Italian mozzarella cheese and salad"
        },
        {
            item: 'The Magic Carpet',
            quantity: 8,
            type: 'food',
            price: 225,
            description: 'Falafel sandwich with mediterranean sauce and hummus'
        },
        {
            item: 'The Mexican Vacation',
            quantity: 9,
            type: 'food',
            price: 29,
            description: 'Spicy chicken salad sandwich with jalapeno pepper and avocado'
        },
        {
            item: 'The Veggie Sandwich',
            quantity: 5,
            type: 'food',
            price: 23,
            description: 'One of the best veggie sandwiches in town! Eat healthy and tasty with our salad sandwich'
        },
        {
            item: 'The Vegan Bratwurst Sandwich',
            quantity: 5,
            type: 'food',
            price: 23,
            description: 'Hot dog with German sausage and swiss cheese! It is somehow vegan.'
        },
        {
            item: 'The French Fries',
            quantity: 5,
            type: 'side',
            price: 23,
            description: 'Our french fries are made with sea salt and the best spices in town!'
        },
        {
            item: 'The Spicy Sauce',
            quantity: 5,
            type: 'side',
            price: 23,
            description: 'A combination'
        },
        {
            item: 'The Alloco',
            quantity: 5,
            type: 'side',
            price: 23,
            description: 'An African famous fried plantain snack, often served with chili pepper and onions.'
        },
        {
            item: 'The Let Me Be',
            quantity: 5,
            type: 'side',
            price: 23,
            description: 'Mini burgers prepared with our special spices.'
        }
    ]

    var creatingInventory = items.map(function (item) {
        return Inventory.create(item);
    });

    return Promise.all(creatingInventory);

};

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function (){
        return seedInventory();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });

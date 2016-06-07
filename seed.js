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

var seedUsers = function() {

  var users = [{
    first_name: 'John',
    last_name: 'Humiston',
    birth: 10 / 15 / 1988,
    email: 'testing@fsa.com',
    password: 'password'
  }, {
    first_name: 'John2',
    last_name: 'Humiston2',
    birth: 10 / 15 / 1983,
    email: 'obama@gmail.com',
    password: 'potus'
  }];

  var creatingUsers = users.map(function(userObj) {
    return User.create(userObj);
  });

  return Promise.all(creatingUsers);

};

var seedInventory = function() {

  var items = [{
    item: 'The Best Burger',
    quantity: 5,
    type: 'food',
    price: 7.50,
    description: 'Perfect combination of the best burger in town, lettuce, tomatoes and a special sauce',
    image_url: 'http://i.imgur.com/HM6tQW2.jpg'
  }, {
    item: 'The Italian Dream',
    quantity: 2,
    type: 'food',
    price: 8.50,
    description: "Plump frankfurter wrapped in a calzone crust",
    image_url: 'http://i.imgur.com/Q9LwYRk.jpg'
  }, {
    item: 'The Magic Carpet',
    quantity: 8,
    type: 'food',
    price: 8.50,
    description: 'Falafel sandwich with mediterranean sauce and hummus',
    image_url: 'http://i.imgur.com/sZ16zr3.jpg'
  }, {
    item: 'The Mexican Vacation',
    quantity: 9,
    type: 'food',
    price: 7.00,
    description: 'Spicy beef tacos with avocado',
    image_url: 'http://i.imgur.com/LHAUCmJ.jpg'
  }, {
    item: 'The Chicken Fingers',
    quantity: 5,
    type: 'food',
    price: 6.50,
    description: 'Fried chicken served on a bed of lettuce',
    image_url: 'http://i.imgur.com/LJJ4rN0.jpg'
  }, {
    item: 'The Double Dog',
    quantity: 5,
    type: 'food',
    price: 5.50,
    description: 'Hot dog with German sausage and swiss cheese! It is somehow vegan.',
    image_url: 'http://i.imgur.com/buRrvfr.jpg'
  }, {
    item: 'The French Fries',
    quantity: 5,
    type: 'side',
    price: 5.00,
    description: 'Our french fries are made with sea salt and the best spices in town!',
    image_url: 'http://i.imgur.com/VJaBd7H.jpg'
  }, {
    item: 'The Tempura Mozzarella',
    quantity: 5,
    type: 'side',
    price: 5.00,
    description: 'Japanese Italian fusion at its best',
    image_url: 'http://i.imgur.com/IZZW0OZ.jpg'
  }, {
    item: 'The Alloco',
    quantity: 5,
    type: 'side',
    price: 5.00,
    description: 'An African famous fried plantain snack, often served with chili pepper and onions.',
    image_url: 'http://i.imgur.com/RgKJwyd.jpg'
  }, {
    item: 'The Let Me Be',
    quantity: 5,
    type: 'side',
    price: 5.00,
    description: 'Mini burgers prepared with our special spices.',
    image_url: "http://i.imgur.com/oXSGQTx.jpg"
  }, {
    item: 'The Berry Christmas',
    quantity: 100,
    type: 'drink',
    price: 7.00,
    description: "The perfect combination of watermelon and strawberry. It's like Christmas for your mouth!",
    image_url: "http://i.imgur.com/yyqyD2d.jpg"
  }, {
    item: 'The Citrus Curprise',
    quantity: 100,
    type: 'drink',
    price: 7.00,
    description: "Sweetened lime and orange in one drink. Outstanding!",
    image_url: "http://i.imgur.com/gvh0lIk.jpg"
  }, {
    item: 'The Mango Mix',
    quantity: 100,
    type: 'drink',
    price: 7.00,
    description: "Fresh magoes and pineapple come together in a single delicious beverage!",
    image_url: "http://i.imgur.com/bQ8Ip5W.jpg"
  }, {
    item: 'The Cherry Apple Cobbler',
    quantity: 100,
    type: 'drink',
    price: 7.00,
    description: "We threw two pies in a blender and this happened!",
    image_url: "http://i.imgur.com/bppwp9P.jpg"
  }, {
    item: 'The Blueberry Bubbly',
    quantity: 100,
    type: 'drink',
    price: 7.00,
    description: "A local favorite since 2016.",
    image_url: "http://i.imgur.com/KleYqtC.jpg"
  }, {
    item: 'The Oranger Creamer',
    quantity: 100,
    type: 'drink',
    price: 7.00,
    description: "Amazing Orange and Vanilla.  Very yummy, soon to be in your tummy.",
    image_url: "http://i.imgur.com/2Q3Ftrx.jpg"
  }, {
    item: 'The Original Phrosty',
    quantity: 100,
    type: 'alcoholic_drink',
    price: 12.00,
    description: 'The Phrosty that started it all... and almost ended it all! The Original Phrosty is now officially kind of safe, yet still tastes just as good as ever! Do not drink if you ever plan to travel to a country that requires a yellow fever vaccination or if you ever plan to receive a yellow fever vaccination for any reason.',
    image_url: 'http://i.imgur.com/unv7Pcq.jpg'
  }, {
    item: "The I'm Not Getting Involved",
    quantity: 100,
    type: 'alcoholic_drink',
    price: 12.00,
    description: 'Shove a straw in your mouth and skip out on the drama! Who needs bad vibes when you can sip your way into banana-coconut bliss.',
    image_url: 'http://i.imgur.com/unv7Pcq.jpg'
  }, {
    item: 'The Thank You Berry Much, But No Thanks',
    quantity: 100,
    type: 'alcoholic_drink',
    price: 12.00,
    description: 'If something sounds sketchy, then you have to say "No Thanks". Unless, of course, someone is offering you a berry-infused, and berry delicious, Phrosty.',
    image_url: 'http://i.imgur.com/unv7Pcq.jpg'
  }, {
    item: "The I'm My Own Date",
    quantity: 100,
    type: 'alcoholic_drink',
    price: 12.00,
    description: 'Bring on the dates, cacao nibs, chocolate, and secret ingredient just released in the US. With this Phrosty in hand, you can forget other guys and girls and date yourself!',
    image_url: 'http://i.imgur.com/unv7Pcq.jpg'
  }, {
    item: 'The Hair of the Dog',
    quantity: 100,
    type: 'alcoholic_drink',
    price: 12.00,
    description: "Now available all day! Yesterday's Phrosty got you feeling under the weather? Suck another one down and you'll be feeling fine in no time. Officially no longer has any hair.",
    image_url: 'http://i.imgur.com/unv7Pcq.jpg'
  }, {
    item: "The That's My Bag",
    quantity: 100,
    type: 'alcoholic_drink',
    price: 12.00,
    description: "Who cares if it isn't your bag? Who cares if you're making a scene? After this grey-colored dream of a Phrosty, you deserve any damn bag you want! Made with pears and (pretty) edible stones.",
    image_url: 'http://i.imgur.com/unv7Pcq.jpg'
  }];

  var creatingInventory = items.map(function(item) {
    return Inventory.create(item);
  });

  return Promise.all(creatingInventory);

};

db.sync({ force: true })
  .then(function() {
    return seedUsers();
  })
  .then(function() {
    return seedInventory();
  })
  .then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  })
  .catch(function(err) {
    console.error(err);
    process.kill(1);
  });

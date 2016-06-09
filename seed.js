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

const chalk = require('chalk');
const db = require('./server/db');
const User = db.model('user');
const Inventory = db.model('inventory');
const Address = db.model('address');
const Review = db.model('review');
const Order = db.model('order');
const Promise = require('sequelize').Promise;


var seedAddress = function() {

  var addresses = [{
    instructions: "Take the x Road",
    is_primary: true,
    street_1: "First North",
    state: "NY",
    city: "NYC",
    zip: "11211",
    userId: 1
  }, {
    instructions: "Take the y Road",
    is_primary: false,
    street_1: "Second North",
    state: "UT",
    city: "Provo",
    zip: "2435", //testing if min length is working #JP
    userId: 2
  }];

  var creatingAddresses = addresses.map(function(address) {
    return Address.create(address);
  });

  return Promise.all(creatingAddresses);

};

var seedUsers = function() {

  var users = [{
    name: 'John Humiston2',
    birth: 10 / 15 / 1988,
    email: 'testing@fsa.com',
    password: 'password'
  }, {
    name: 'John2 Hummingstoned',
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
    title: 'The Best Burger',
    quantity: 5,
    type: 'food',
    price: 750,
    description: 'Perfect combination of the best burger in town, lettuce, tomatoes and a special sauce',
    image_url: 'http://i.imgur.com/HM6tQW2.jpg'
  }, {
    title: 'The Italian Dream',
    quantity: 2,
    type: 'food',
    price: 850,
    description: "Plump frankfurter wrapped in a calzone crust",
    image_url: 'http://i.imgur.com/Q9LwYRk.jpg'
  }, {
    title: 'The Magic Carpet',
    quantity: 8,
    type: 'food',
    price: 850,
    description: 'Falafel sandwich with mediterranean sauce and hummus',
    image_url: 'http://i.imgur.com/sZ16zr3.jpg'
  }, {
    title: 'The Mexican Vacation',
    quantity: 9,
    type: 'food',
    price: 700,
    description: 'Spicy beef tacos with avocado',
    image_url: 'http://i.imgur.com/LHAUCmJ.jpg'
  }, {
    title: 'The Chicken Fingers',
    quantity: 5,
    type: 'food',
    price: 650,
    description: 'Fried chicken served on a bed of lettuce',
    image_url: 'http://i.imgur.com/LJJ4rN0.jpg'
  }, {
    title: 'The Double Dog',
    quantity: 5,
    type: 'food',
    price: 550,
    description: 'Hot dog with German sausage and swiss cheese! It is somehow vegan.',
    image_url: 'http://i.imgur.com/buRrvfr.jpg'
  }, {
    title: 'The French Fries',
    quantity: 5,
    type: 'side',
    price: 500,
    description: 'Our french fries are made with sea salt and the best spices in town!',
    image_url: 'http://i.imgur.com/VJaBd7H.jpg'
  }, {
    title: 'The Tempura Mozzarella',
    quantity: 5,
    type: 'side',
    price: 500,
    description: 'Japanese Italian fusion at its best',
    image_url: 'http://i.imgur.com/IZZW0OZ.jpg'
  }, {
    title: 'The Alloco',
    quantity: 5,
    type: 'side',
    price: 500,
    description: 'An African famous fried plantain snack, often served with chili pepper and onions.',
    image_url: 'http://i.imgur.com/RgKJwyd.jpg'
  }, {
    title: 'The Let Me Be',
    quantity: 5,
    type: 'side',
    price: 500,
    description: 'Mini burgers prepared with our special spices.',
    image_url: "http://i.imgur.com/oXSGQTx.jpg"
  }, {
    title: 'The Berry Christmas',
    quantity: 100,
    type: 'drink',
    price: 700,
    description: "The perfect combination of watermelon and strawberry. It's like Christmas for your mouth!",
    image_url: "http://i.imgur.com/yyqyD2d.jpg"
  }, {
    title: 'The Citrus Curprise',
    quantity: 100,
    type: 'drink',
    price: 700,
    description: "Sweetened lime and orange in one drink. Outstanding!",
    image_url: "http://i.imgur.com/gvh0lIk.jpg"
  }, {
    title: 'The Mango Mix',
    quantity: 100,
    type: 'drink',
    price: 700,
    description: "Fresh mangoes and pineapple come together in a single delicious beverage!",
    image_url: "http://i.imgur.com/bQ8Ip5W.jpg"
  }, {
    title: 'The Cherry Apple Cobbler',
    quantity: 100,
    type: 'drink',
    price: 700,
    description: "We threw two pies in a blender and this happened!",
    image_url: "http://i.imgur.com/bppwp9P.jpg"
  }, {
    title: 'The Blueberry Bubbly',
    quantity: 100,
    type: 'drink',
    price: 700,
    description: "A local favorite since 2016.",
    image_url: "http://i.imgur.com/KleYqtC.jpg"
  }, {
    title: 'The Oranger Creamer',
    quantity: 100,
    type: 'drink',
    price: 700,
    description: "Amazing Orange and Vanilla.  Very yummy, soon to be in your tummy.",
    image_url: "http://i.imgur.com/2Q3Ftrx.jpg"
  }, {
    title: 'The Original Phrosty',
    quantity: 100,
    type: 'alcoholic_drink',
    price: 1200,
    description: 'The Phrosty that started it all... and almost ended it all! The Original Phrosty is now officially kind of safe, yet still tastes just as good as ever! Do not drink if you ever plan to travel to a country that requires a yellow fever vaccination or if you ever plan to receive a yellow fever vaccination for any reason.',
    image_url: 'http://i.imgur.com/unv7Pcq.jpg'
  }, {
    title: "The I'm Not Getting Involved",
    quantity: 100,
    type: 'alcoholic_drink',
    price: 1200,
    description: 'Shove a straw in your mouth and skip out on the drama! Who needs bad vibes when you can sip your way into banana-coconut bliss.',
    image_url: 'http://i.imgur.com/unv7Pcq.jpg'
  }, {
    title: 'The Thank You Berry Much, But No Thanks',
    quantity: 100,
    type: 'alcoholic_drink',
    price: 1200,
    description: 'If something sounds sketchy, then you have to say "No Thanks". Unless, of course, someone is offering you a berry-infused, and berry delicious, Phrosty.',
    image_url: 'http://i.imgur.com/unv7Pcq.jpg'
  }, {
    title: "The I'm My Own Date",
    quantity: 100,
    type: 'alcoholic_drink',
    price: 1200,
    description: 'Bring on the dates, cacao nibs, chocolate, and secret ingredient just released in the US. With this Phrosty in hand, you can forget other guys and girls and date yourself!',
    image_url: 'http://i.imgur.com/unv7Pcq.jpg'
  }, {
    title: 'The Hair of the Dog',
    quantity: 100,
    type: 'alcoholic_drink',
    price: 1200,
    description: "Now available all day! Yesterday's Phrosty got you feeling under the weather? Suck another one down and you'll be feeling fine in no time. Officially no longer has any hair.",
    image_url: 'http://i.imgur.com/unv7Pcq.jpg'
  }, {
    title: "The That's My Bag",
    quantity: 100,
    type: 'alcoholic_drink',
    price: 1200,
    description: "Who cares if it isn't your bag? Who cares if you're making a scene? After this grey-colored dream of a Phrosty, you deserve any damn bag you want! Made with pears and (pretty) edible stones.",
    image_url: 'http://i.imgur.com/unv7Pcq.jpg'
  }];

  var creatingInventory = items.map(function(item) {
    return Inventory.create(item);
  });

  return Promise.all(creatingInventory);

};

var seedReviews = function(){
  var reviews = [
  {
    inventoryId: 1,
    title: "I wish I could give 0 stars",
    review_body: "this product sucks",
    stars: 5
  },
  {
    inventoryId: 2,
    title: "I cancelled my cart",
    review_body: "best decision ever",
    stars: 5
  },
  {
    inventoryId: 3,
    title: "I love it",
    review_body: "Just kidding",
    stars: 5
  },
  {
    inventoryId: 4,
    title: "Coffee with shit tastes better",
    review_body: "This sucks",
    stars: 3
  },
  {
    inventoryId: 5,
    title: "Yabadabadoo",
    review_body: "I hate the owners",
    stars: 2
  }]
  var creatingReviews = reviews.map(function(review) {
    return Review.create(review);
  });

  return Promise.all(creatingReviews);
}

var seedOrders = function(){
  var orders = [
  {
    status: "complete",
    userId: 1,
    addressId: 2
  },
  {
    status: "cancelled",
    userId: 2,
    addressId: 2
  },
  {
    status: "complete",
    userId: 1,
    addressId: 1
  }]

  var creatingOrders = orders.map(function(order) {
    return Order.create(order);
  });

  return Promise.all(creatingOrders);
}

db.sync({ force: true })
  .then(function() {
    return seedUsers();
  })
  .then(function() {
    return seedInventory();
  })
  .then(function() {
    return seedReviews();
  })
  .then(function(){
    return seedAddress();
  })
  .then(function(){
    return seedOrders();
  })
  .then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  })
  .catch(function(err) {
    console.error(err);
    process.kill(1);
  });

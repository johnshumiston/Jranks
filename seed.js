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



var seedUsers = function() {

  var users = [{
    name: 'John Humiston2',
    birth: '1988-12-31',
    email: 'testing@fsa.com',
    password: 'password'
  }, {
    name: 'John2 Hummingstoned',
    birth: '1987-09-01',
    email: 'obama@gmail.com',
    password: 'potus',
    is_admin: true
  }];

  var creatingUsers = users.map(function(userObj) {
    return User.create(userObj);
  });

  return Promise.all(creatingUsers);

};

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

var seedInventory = function() {

  var items = [{
    title: 'The Best Burger',
    quantity: 5,
    type: 'food',
    price: 750,
    description: 'Best combination of the best burger in town, best lettuce, best tomatoes and best special sauce. Comes with best french fries.',
    image_url: 'http://media2.s-nbcnews.com/i/newscms/2016_11/1017896/pawpa-twitter-sad-today-tease-1-160318_b1449db6f64e0c3371911ee963ef3633.jpg'
  }, {
    title: 'The Italian Dream',
    quantity: 8,
    type: 'food',
    price: 850,
    description: "Plump frankfurter wrapped in a calzone crust. Very low in gluten and very high in Italian authenticity. Forget pizza and pasta. Make your dream a reality with this Italian sandwich!",
    image_url: 'http://t.fod4.com/t/b8e5e6ed87/c1920x1080_40.jpg'
  }, {
    title: 'The Magic Carpet',
    quantity: 8,
    type: 'food',
    price: 850,
    description: 'Falafel sandwich with mediterranean sauce and hummus',
    image_url: 'http://www.traderjoes.com/images/fearless-flyer/uploads/article-1180/98020-falafel-wrap450%20copy.png'
  }, {
    title: 'The Mexican Vacation',
    quantity: 9,
    type: 'food',
    price: 700,
    description: 'Spicy beef tacos with a normal avocado.',
    image_url: 'http://65.media.tumblr.com/ab3038a612836ce04793e91ced740264/tumblr_nmvnvqQbW91re0c97o1_1280.jpg'
  }, {
    title: 'The Chicken Fingers',
    quantity: 5,
    type: 'food',
    price: 650,
    description: 'Fried chicken served on a piece of lettuce served on a plate.',
    image_url: 'http://img03.deviantart.net/a58b/i/2013/009/1/3/chicken_nugget_from_jack_in_the_box_by_violetfireflies-d5r0k56.jpg'
  }, {
    title: 'The Double Dog',
    quantity: 5,
    type: 'food',
    price: 550,
    description: 'Two for you, none for your friend! (Unless you order more than one order haha!) Hot dog with German sausage and swiss cheese!',
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
    description: "Santa came early with this perfect combination of watermelon and apple. It's like Christmas for your mouth! Even if you have been a bad homo sapien.",
    image_url: "http://i.imgur.com/yyqyD2d.jpg"
  }, {
    title: 'The Citrus Curprise',
    quantity: 100,
    type: 'drink',
    price: 700,
    description: "Sweetened lime and orange in one drink. How did we do it? Outstanding! But how did we do it? It's so good!",
    image_url: "http://i.imgur.com/gvh0lIk.jpg"
  }, {
    title: 'The Mango Mix',
    quantity: 100,
    type: 'drink',
    price: 700,
    description: "Fresh mangoes and pineapple come together in a single delicious beverage! We now only use the yellow part of the pineapple when making this delicious drink.",
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
    stars: 1
  },
  {
    inventoryId: 1,
    title: "I, too, wish I could give 0 stars",
    review_body: "This isn't a hamburger. This is a poison goop between two soggy buns. It is an assault on your mouth and it should be illegal.",
    stars: 1
  },
  {
    inventoryId: 1,
    title: "DO NOT ORDER",
    review_body: "I found this website because I mistyped the address of a different restaurant I was looking for. I am a naturally adventurous person so I thought I would live a little and just give it a try. Big mistake. I ordered the 'best burger' last night and am still dealing with problems from the meal. First of all, the burger sucks. It's just plain not good. The patty was really gooey and was a softer consistency than the buns- something that should have been impossible because they were literally falling apart. I almost had to cut it with a knife and fork. Degrading. Next, I found a bone or a pebble or something very hard in the burger. Not cool. I decided to forge on because, as I said, I am a naturally adventurous person. The final straw came on bite 4 when I pulled a needle out of my mouth. I had to go to the ER and wait around for 3 hours before a doctor saw me. The staff there were also very rude, but I guess that is unrelated to this restaurant. Overall, very bad experience and would not recommend. I used to say I would try anything twice but now I am not so sure. The fries were good though!",
    stars: 2
  },
  {
    inventoryId: 1,
    title: "Awesome burger!",
    review_body: "Other commenters are crazy. This burger was the best one I have ever had. I called to thank the owners and spoke with three awesome guys. I didn't see them but I could tell from their voices that they were really cute and overall just awesome homo sapiens!",
    stars: 5
  },
  {
    inventoryId: 2,
    title: "Not authentic",
    review_body: "I don't really understand how a frankfurter is Italian. That's german. Either way, didn't taste good.",
    stars: 2
  },
  {
    inventoryId: 2,
    title: "Ridiculous",
    review_body: "I literally received an empty calzone crust. How and why? They never gave me a refund, but to their credit, I never really asked for one since they NEVER ANSWERED THE PHONE.",
    stars: 1
  },
  {
    inventoryId: 2,
    title: "Really good",
    review_body: "Please excuse my imperfect English. I am from Italy and am not great writing in languages other than my natural one, Italian. I was very homesick for Italy, where I am from, and this sandwich made me feel just at home. It was delicious and similar to what my Nona made when I was a child in the Italian countryside.",
    stars: 5
  },
  {
    inventoryId: 3,
    title: "Picture does not deceive",
    review_body: "I thought the trader joes picture was a weird joke but I actually received a box of a premade trader joe's falafel wrap. To be fair, the wrap was pretty good. But still, who does that?!",
    stars: 3
  },
  {
    inventoryId: 4,
    title: "No",
    review_body: "When I was in college, I got blackout drunk and bought a gross burrito from 7-11. I didn't find it until 3 pm the next day, when I realized that I had slept on top of it all night. In my delusional hangover, I decided to just eat it. It made me sick for 3 hours and I considered going to the hospital. I would rather eat 3 of those than ever have to take another bite of the Mexican Vacation. Truly vile.",
    stars: 1
  },
  {
    inventoryId: 4,
    title: "Don't understand",
    review_body: "I ordered this burrito last week. Apparently delivery can take a very long time because the delivery guy never showed up. My card was still charged so I tried all week to get in touch with them to get a refund. I finally talked to some guy a few hours ago and was assured that I would be taken care of. I assumed my card would be refunded, but instead, I hear my buzzer go off 30 minutes later and open the door to find a delivery guy with the damn burrito... at 930 in the morning. What the hell. Who does that? On top of it all, the burrito was nasty as hell.",
    stars: 1
  },
  {
    inventoryId: 4,
    title: "Me encanta!",
    review_body: "Yum this burrito is so good! I am typing this review as I eat it! I called the restaurant to let them know i loved it and I talked to this blonde guy who sounded like he was a really attractive and confident person.",
    stars: 5
  },
  {
    inventoryId: 5,
    title: "Had to cook them",
    review_body: "The nuggets were not done when they arrived. I had to microwave them for another 3 minutes. I ate two and then had a dawning realization that I was doing somethign incredibly pathetic and gross so I chucked them. Boo!",
    stars: 2
  },
   {
    inventoryId: 5,
    title: "Terrible",
    review_body: "I hate the owners. So rude. I called to complain about my frozen chicken nugget and there was lots of random yelling and shouting in the background. Kind of scary to be honest.",
    stars: 2
  },
   {
    inventoryId: 5,
    title: "Yabadabadoo",
    review_body: "I love the owners",
    stars: 5
  },
  {
    inventoryId: 6,
    title: "I don't get it",
    review_body: "I know I already have very little credibility considering the fact that I ordered this double hotdog thing, but I thought it looked funny and might be kind of good. This was literally a white hotdog bun with two kind of gross hot dogs in it. No condiments or anything. I could make this myself and do a much better job.",
    stars: 2
  },
  {
    inventoryId: 6,
    title: "Ashamed",
    review_body: "I ordered this item and then ate it while watching the West Wing on my computer. After I finished, I walked to the bathroom and stared at my face in the mirror for 20 straight minutes, desperately trying to figure where I had taken a wrong turn and why my life has been filled with horrible choices, among them the decision to order this double hotdog.",
    stars: 1
  },
  {
    inventoryId: 6,
    title: "What could be better",
    review_body: "Only thing that could be better than a double hotdog would be a TRIPLE hotdog. Just like how THREE owners is better than two. I called the restaurant to tell them I loved the dogs and the guys on the phone sounded really handsome and successful. It would be so cool to meet them one day.",
    stars: 5
  },
  {
    inventoryId: 7,
    title: "I cancelled my cart",
    review_body: "best decision ever",
    stars: 5
  },
  {
    inventoryId: 8,
    title: "I cancelled my cart",
    review_body: "best decision ever",
    stars: 5
  },
  {
    inventoryId: 9,
    title: "I cancelled my cart",
    review_body: "best decision ever",
    stars: 5
  },
  {
    inventoryId: 10,
    title: "I cancelled my cart",
    review_body: "best decision ever",
    stars: 5
  },
  {
    inventoryId: 11,
    title: "I cancelled my cart",
    review_body: "best decision ever",
    stars: 5
  },
  {
    inventoryId: 12,
    title: "I cancelled my cart",
    review_body: "best decision ever",
    stars: 5
  }]
  var creatingReviews = reviews.map(function(review) {
    return Review.create(review);
  });

  return Promise.all(creatingReviews);
}


db.sync({ force: true })
  .then(function() {
    return seedUsers();
  })
  .then(function() {
    return seedInventory();
  })
  .then(function(){
    return seedAddress();
  })
  .then(function() {
    return seedReviews();
  })
  .then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  })
  .catch(function(err) {
    console.error(err);
    process.kill(1);
  });

'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const User = db.model('user');
const Order = db.model('order');
const OrderItem = db.model('orderItem');
const Address = db.model('address');
const Inventory = db.model('inventory');

module.exports = router;


function updateInventory(cart){
  for (var key in cart){
    Inventory.findById(key)
    .then(function(item){
      return item.update({quantity: item.quantity - cart[key]})
    })
  }
}

function createOrderItems(key, qty, orderId){
  OrderItem.create({quantity: qty, orderId: orderId})
  .then(function(item){
    return item.setItem(key);
  })
}

router.post('/', function(req, res, next) {

  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here https://dashboard.stripe.com/account/apikeys
  var stripe = require("stripe")("sk_test_6iuyDpMMyTWKZB4PVOvcCA3P");

  // (Assuming you're using express - expressjs.com)
  // Get the credit card details submitted by the form
  var stripeToken = req.body.stripeToken;

  var charge = stripe.charges.create({
    amount: +req.body.amount, // amount in cents, again
    currency: "usd",
    source: stripeToken,
    description: "Example charge"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
    }
  });
  
  updateInventory(req.session.cart);

  User.findById(req.session.passport.user)
  .then(function(user){
    if (user){
    		return user.update({cart: {}})
    }
    else {
  	 return; 
    }
  })
  .then(function(updatedUser){
    if(updatedUser){
      return Order.create({status: "complete"}, {userId: req.session.passport.user})
    }
    else {
      return Order.create({status: "complete"});
    }
  })
  .then(function(order){
    if (req.session.passport.user){
      return order.setUser(req.session.passport.user);
    }
    else {
      return order;
    }
  })
  .then(function(order){
    if (order){
      for (var key in req.session.cart){
        createOrderItems(key, req.session.cart[key], order.id);
      }
      return true;
    }
  })
  .then(function(newCart){
    if (newCart){
      return Address.bulkCreate([{
        userId: req.session.passport.user,
        is_primary: true,
        street_1: req.body.stripeShippingAddressLine1,
        state: req.body.stripeShippingAddressState,
        city: req.body.stripeShippingAddressCity,
        zip: req.body.stripeShippingAddressZip
      },
      {
        userId: req.session.passport.user,
        is_primary: false,
        street_1: req.body.stripeBillingAddressLine1,
        state: req.body.stripeBillingAddressState,
        city: req.body.stripeBillingAddressCity,
        zip: req.body.stripeBillingAddressZip
      }])
    }
    return;
  })
  .then(function(){
    return User.findById(req.session.passport.user)
  })
  .then(function(){
    for (var key in req.session.cart){
      delete req.session.cart[key];
    }
  })
  .then(function(){
  	req.session.cart = {};
    res.redirect('/');
  })
  .catch(next);
});

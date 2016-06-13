'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const User = db.model('user');
const Order = db.model('order');
const Address = db.model('address');
const PreviousCart = db.model('previouscart');

module.exports = router;

router.post('/', function(req, res, next) {
  console.log(req.body);

  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here https://dashboard.stripe.com/account/apikeys
  var stripe = require("stripe")("sk_test_6iuyDpMMyTWKZB4PVOvcCA3P");

  // (Assuming you're using express - expressjs.com)
  // Get the credit card details submitted by the form
  var stripeToken = req.body.stripeToken;

  var charge = stripe.charges.create({
    amount: 1000, // amount in cents, again
    currency: "usd",
    source: stripeToken,
    description: "Example charge",
    receipt_email: req.body.stripeEmail
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      console.log("card declined"); // The card has been declined
    }
  });

  User.findById(req.session.passport.user)
  .then(function(user){
    if (user){
    		return user.update({cart: {}});
    }
  	return;
  })
  .then(function(updatedUser){
    if(updatedUser){
      return PreviousCart.create({items: req.session.cart}, {userId: updatedUser.id})
    }
    return;
  })
  .then(function(){
    req.session.cart = {};
  	res.redirect('/');
  })
  .catch(next);
});
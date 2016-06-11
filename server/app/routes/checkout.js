'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const User = db.model('user');

module.exports = router;

router.post('/', function(req, res, next) {
  console.log(req.session);

  User.findById(req.session.passport.user)
  .then(function(user){
  	if (user){
		req.session.cart = {};
		return user.update({cart: {}});
  	}
  	req.session.cart = {};
  	return;
  })
  .then(function(updatedUser){
  	res.redirect('/');
  })
  .catch(next);
});
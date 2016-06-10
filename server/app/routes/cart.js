'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Inventory = db.model('inventory');
const Review = db.model('review');

module.exports = router;

router.post('/add', function(req, res, next) {
  if (!req.session.cart) req.session.cart = {};
  var qty = req.session.cart[req.body.id] || 0; 
  req.session.cart[req.body.id] = qty + 1;
  console.log(req.session.cart);
  res.status(200).send(req.session.cart);
});
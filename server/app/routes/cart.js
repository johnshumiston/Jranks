'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Inventory = db.model('inventory');
const Review = db.model('review');

module.exports = router;

router.get('/', function(req, res, next) {
  res.send(req.session);
});

router.get('/myCart', function(req, res, next) {
  Inventory.findAll({
    where: {
      id: {
        $in: Object.keys(req.session.cart) 
      }
    }
  })
  .then(function(items){
    var qtys = [];
    for (var key in req.session.cart) {
      qtys.push(req.session.cart[key])
    }
    var updatedItems = items.map(function(item, index) {
      item.dataValues.qty = qtys[index]
      return item;
    })
    res.send(updatedItems);
  })
});

router.post('/add', function(req, res, next) {
  if (!req.session.cart) req.session.cart = {};
  var qty = req.session.cart[req.body.id] || 0; 
  req.session.cart[req.body.id] = qty + 1;
  res.status(200).send(req.session.cart);
});
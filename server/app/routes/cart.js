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
  Inventory.findById(req.body.id)
  .then(function(item){
    // console.log(item);
    if (item.quantity < qty + req.body.qty){
      console.log("Not enough items on inventory", item.quantity);
      // req.session.cart[req.body.id] = item.quantity;
      return res.status(200).send(false);  
      // return item.quantity;
    }
    else {
      console.log("We have enough items on inventory: ", item.quantity);
      req.session.cart[req.body.id] = qty + req.body.qty;
      return res.status(200).send(true);
      // return qty;
    }
  })
});

router.put('/update', function(req, res, next) {
  req.session.cart=req.body;
  res.status(200).send(req.session.cart);
});

router.put('/delete', function(req, res, next) {
  delete req.session.cart[req.body.id];
  res.status(200).send(req.session.cart);
});
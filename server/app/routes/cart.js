'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Inventory = db.model('inventory');
const Review = db.model('review');
const PreviousCart = db.model('previouscart');
const Order = db.model('order');
const OrderItem = db.model('orderItem');

module.exports = router;

function transformIntoItem(inventoryId, qty){
  return Inventory.findById(inventoryId)
  .then(function(item){
    if (inventory){
      return {item: inventory, quantity: qty};
    }
    return;
  })
}

function createFullCart (cartId){
  return PreviousCart.findById(cartId)
  .then(function(cart){
    var carts = [];
    for (var key in cart){
      carts.push(transformIntoItem(key, cart[key]));
    }
    return carts;
  })
}

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
  if (!req.session.cart) {
    req.session.cart = {};
  }

  var qty = req.session.cart[req.body.id] || 0;
  Inventory.findById(req.body.id)
  .then(function(item){
    if (item.quantity < qty + req.body.qty){
      return res.status(200).send(false);  
    }
    else {
      req.session.cart[req.body.id] = qty + req.body.qty;
      return res.status(200).send(true);
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

// Previous Carts Routes --------------------------------------------

router.get('/all', function(req, res, next) {
  var isAdmin = false
  if(req.user){
    isAdmin = req.user.is_admin;
  }
  if (isAdmin){
    Order.findAll({})
    .then(function(carts){
      res.send(carts);
    })
  }
  else {
    res.redirect('/');
  }
});

router.get('/singleuser/:userId', function(req, res, next){
  var isAdmin = false;
  if(req.user){
    isAdmin = req.user.is_admin;
  }
  if(isAdmin){
    Order.findAll({where: {userId: req.params.userId}})
    .then(function(orders){
      res.send(orders);
    })
  }
  else {
    res.redirect('/');
  }
})

router.get('/:orderId/items', function(req, res, next){
  var isAdmin = false;
  if(req.user){
    isAdmin = req.user.is_admin;
  }
  if(isAdmin){
    OrderItem.findAll({where: {orderId: +req.params.orderId}})
    .then(function(items){
      res.send(items);
    })
  }
  else {
    res.redirect('/');
  }
})

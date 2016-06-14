'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Inventory = db.model('inventory');
const Review = db.model('review');
const User = db.model('user');

module.exports = router;

// Review routes -----------------------------------------------------------

router.get('/reviews', function(req, res, next) {
  Review.findAll()
    .then(reviews => res.send(reviews))
    .catch(next);
});

router.post('/reviews', function(req, res, next) {   
  Review.create(req.body)
  .then(function(review) {
    return review.save();
  })
  .then(review => res.sendStatus(201))
  .catch(next);
});

router.param('reviewId', function (req, res, next, id) {
  Review.findById(id)
  .then(function(review){
    if(review){
      req.review = review;
      next();
    } else {
      next(new Error('failed to load review'));
    }
  })
  .catch(next);
});

router.get('/reviews/:reviewId', function(req, res, next) {
  res.send(req.review);
});

router.put('/reviews/:reviewId', function(req, res, next) {
  var isAdmin = false
  if(req.user){
    isAdmin = req.user.is_admin;
  }
  if (isAdmin){
    req.review.update(req.body)
    .then(updatedReview => res.status(200).send(updatedReview))
    .catch(next);
  }
  else {
    res.redirect('/');
  }
});

router.delete('/reviews/:reviewId', function(req, res, next) {
  var isAdmin = false
  if(req.user){
    isAdmin = req.user.is_admin;
  } 
  if (isAdmin){
    req.review.destroy({})
    .then(response => res.status(204).send(response))
    .catch(next);
  }
  else {
    res.redirect('/');
  }
});

// Inventory routes -----------------------------------------------------------

router.get('/', function (req, res, next) {
  Inventory.findAll({ 
    where: 
      req.query
      
    })
  .then(items => res.send(items))
  .catch(next);
});

router.post('/', function (req, res, next) {
  var isAdmin = false
  if(req.user){
    isAdmin = req.user.is_admin;
  }
  if (isAdmin){
    Inventory.create(req.body)
    .then(item => res.sendStatus(201))
    .catch(next);
  }
  else {
    res.redirect('/');
  }
});

router.param('id', function (req, res, next, id) {
  Inventory.findById(id)
  .then(function(inventory){
    if(inventory){
      req.inventory = inventory;
      next();
    } else {
      next(new Error('failed to load inventory item'));
    }
  })
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  res.send(req.inventory);
});

router.get('/available/:id', function (req, res, next) {
  if (!req.session.cart) req.session.cart = {};
  var qty = req.session.cart[req.params.id] || 0;
  if (req.inventory.dataValues.quantity <= qty) {
    res.send(false);
  }
  else {
    res.send(true);
  }
});

router.get('/:id/reviews', function (req, res, next) {
  Review.findAll({
    where: {
      inventoryId: req.inventory.id
    }, 
    include: [
      {
        model: User,
        attributes: ['name']
      }
    ]
  })
  .then(function(reviews){
    res.send(reviews);
  })
  .catch(next);
});

router.put('/:id', function (req, res, next) {
  var isAdmin = false
  if(req.user){
    isAdmin = req.user.is_admin;
  }
  if (isAdmin){
    req.inventory.update(req.body)
    .then(updatedItem => res.status(200).send(updatedItem))
    .catch(next);
  }
  else {
    res.redirect('/');
  }
});

router.delete('/:id', function (req, res, next) {
  var isAdmin = false
  if(req.user){
    isAdmin = req.user.is_admin;
  }
  if (isAdmin){
    req.inventory.destroy({})
    .then(response => res.status(204).send(response))
    .catch(next);
  }
  else {
    res.redirect('/');
  }
});

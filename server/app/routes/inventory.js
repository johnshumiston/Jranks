'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../db/_db');

const Inventory = db.model("inventory");
const Review = db.model("review");
module.exports = router;

router.get('/', function (req, res, next) {
  Inventory.findAll()
  .then(items => res.send(items))
  .catch(next);
});

router.post('/', function (req, res, next) {
  return Inventory.create(req.body)
  .then(item => res.sendStatus(201))
  .catch(next);
});

router.get('/:inventoryId', function (req, res, next) {
  return Inventory.findById(req.params.inventoryId)
  .then(item => res.send(item))
  .catch(next);
});

router.put('/:inventoryId', function (req, res, next) {
  return Inventory.findById(req.params.inventoryId)
  .then(function(item) {
    return item.update(req.body)
  })
  .then(updatedItem => res.sendStatus(200))
  .catch(next);
});

router.delete('/:inventoryId', function (req, res, next) {
  return Inventory.destroy({
    where: {
      id: req.params.inventoryId
    }
  })
  .then(response => res.sendStatus(204))
  .catch(next);
});

router.post('/:inventoryId/reviews', function(req, res, next) {   
  return Review.create(req.body)
  .then(function(review) {
    review.inventoryId = req.params.inventoryId;
    return review.save();
  })
  .then(review => res.sendStatus(201))
  .catch(next);
});

router.get('/type/:type', function (req, res, next) {
  var type = req.params.type;
  Inventory.findAll({ 
    where: {
      type: type
      } 
    })
  .then(items => res.send(items))
  .catch(next);
});

// router.put('/:inventoryId/reviews/:reviewId', function(req, res, next) {   
//   return Review.findById(req.params.reviewId)
//   .then(function(review) {
//     return review.update(req.body)
//   })
//   .then(updatedReview => res.sendStatus(200))
//   .catch(next);
// });

// router.delete('/:inventoryId/reviews/:reviewId', function(req, res, next) {   
//   return Review.destroy({
//     where: {
//       id: req.params.reviewId
//     }
//   })
//   .then(response => res.sendStatus(204))
//   .catch(next);
// });
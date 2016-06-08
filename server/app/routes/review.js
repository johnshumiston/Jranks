const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Review = db.model('review');
const Inventory = db.model('inventory');
module.exports = router;

router.get('/', function(req, res, next) {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next);
});

router.post('/:inventoryId', function(req, res, next) {   
  return Review.create(req.body)
  .then(function(review) {
    review.inventoryId = req.params.inventoryId;
    return review.save();
  })
  .then(review => res.status(201).send(review))
  .catch(next);
});

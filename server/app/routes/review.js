const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Review = db.model('review');
const Inventory = db.model('inventory');
module.exports = router;

router.get('/', function(req, res, next) {
  Review.findAll()
    .then(reviews => res.send(reviews))
    .catch(next);
});

router.get('/:reviewId', function(req, res, next) {
  Review.findById(req.params.reviewId)
    .then(review => res.send(review))
    .catch(next);
});

router.put('/:reviewId', function(req, res, next) {
  return Review.findById(req.params.reviewId)
  .then(function(review) {
    return review.update(req.body)
  })
  .then(updatedReview => res.sendStatus(200))
  .catch(next);
});

router.delete('/:reviewId', function(req, res, next) {
  return Review.destroy({
    where: {
      id: req.params.reviewId
    }
  })
  .then(response => res.sendStatus(204))
  .catch(next);
});
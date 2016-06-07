const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Review = require('../../db/models/review')(db);
module.exports = router;

router.get('/', function(req, res, next) {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next);
});

router.post('/:inventoryId', function(req, res, next) {
  Review.create(
    req.body
    // name: req.body.name,
    // review_body: req.body.review_body,
    // date: new Date(),
    // stars: req.body.stars,
    // inventoryId: req.params.inventoryId
  )
  .then(function(review) {return review.setInventory(req.params.inventoryId)})
  .then(review => res.status(201).send(review))
  .catch(next);
})

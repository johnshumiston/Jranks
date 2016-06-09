'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../db/_db');

const Inventory = db.model("inventory");
const Review = db.model("review");
module.exports = router;

router.get('/', function (req, res, next) {
  Inventory.findAll({ 
    where: 
      req.query
      
    })
  .then(items => res.send(items))
  .catch(next);
});

router.post('/', function (req, res, next) {
  Inventory.create(req.body)
  .then(item => res.sendStatus(201))
  .catch(next);
});

router.param('id', function (req, res, next, id) { //check if it is correct #JP
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

router.put('/:id', function (req, res, next) {
  req.inventory.update(req.body)
  .then(updatedItem => res.status(200).send(updatedItem))
  .catch(next);
});

router.delete('/:id', function (req, res, next) {
  req.inventory.destroy({})
  .then(response => res.status(204).send(response))
  .catch(next);
});

router.post('/:inventoryId/reviews', function(req, res, next) {   
  Review.create(req.body)
  .then(function(review) {
    review.inventoryId = req.params.inventoryId;
    return review.save();
  })
  .then(review => res.sendStatus(201))
  .catch(next);
});

const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Order = db.model('order');

module.exports = router;

router.get('/', function (req, res, next) {
  Order.findAll()
  .then(orders => res.json(orders))
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  Order.findById(req.params.id)
  .then(orders => res.json(orders))
  .catch(next);
});

router.post('/', function (req, res, next){
  Order.create(req.body)
  .then(function(order){
  	return order.save();
  })
  .then(order => res.status(201).send(order))
  .catch(next);
});

router.delete('/:id', function (req, res, next){
  Order.destroy({where: {id: req.params.id}})
  .then(response => res.sendStatus(204));
});

router.put('/:id', function(req, res, next){
  Order.findById(req.params.id)
  .then(function(order){
    return order.update(req.body)
  })
  .then (updatedOrder => res.sendStatus(200))
  .catch(next);
})
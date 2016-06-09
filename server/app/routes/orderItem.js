const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const OrderItem = db.model("orderItem");
module.exports = router;

router.get('/:id', function (req, res, next) {
  OrderItem.findById(req.params.id)
  .then(orderItems => res.json(orderItems))
  .catch(next);
});

router.post('/', function (req, res, next){
  OrderItem.create(req.body)
  .then(function(item){
  	return item.save();
  })
  .then(item => res.status(201).send(item))
  .catch(next);
});

router.delete('/:id', function (req, res, next){
  OrderItem.destroy({where: {id: req.params.id}})
  .then(response => res.sendStatus(204));
});

router.put('/:id', function(req, res, next){
	OrderItem.findById(req.params.id)
	.then(function(item){
		return item.update(req.body)
	})
	.then (updatedItem => res.sendStatus(200))
	.catch(next);
})
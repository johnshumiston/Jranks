const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const OrderItem = db.model("orderItem");
module.exports = router;

router.get('/', function (req, res, next) {
  OrderItem.findAll()
  .then(orderItems => res.json(orderItems))
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  OrderItem.findById(req.params.id)
  .then(orderItems => res.json(orderItems))
  .catch(next);
});

router.post('/:orderId/:inventoryId', function (req, res, next){
  return OrderItem.create(req.body)
  .then(function(item){
  	item.orderId = req.params.orderId;
  	item.itemId = req.params.inventoryId;
  	return item.save();
  })
  .then(item => res.status(201).send(item))
  .catch(next);
});

router.delete('/:id', function (req, res, next){
  OrderItem.findById(req.params.id)
  .then(function(item){
    if(item){
      OrderItem.destroy({where: {id: req.params.id}})
      return res.status(204).send(item);
    }
    else {
      return res.status(404).send('not found');
    }
  })
  .catch(next);
});

router.put('/:id', function(req, res, next){
	OrderItem.findById(req.params.id)
	.then(function(item){
		if (item){
			item.update(req.body)
			.then (function(item){
				return res.status(200).send(item);
			})
		}
		else {
			return res.status(404).send('not found');
		}
	})
	.catch(next);
})

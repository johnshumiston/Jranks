const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Order = db.model('order');
const OrderItem = db.model('orderItem');
const User = db.model('user');
const Inventory = db.model('inventory');

module.exports = router;

function updateInventory(orderItem, changedAmount){
  Inventory.findById(orderItem.itemId)
  .then(function(item){
    return item.update({quantity: item.quantity - changedAmount})
  })
}

// Order Routes ------------------------------------------------------
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

router.get('/user/:userId/', function (req, res, next) {
  Order.findAll({
    where: {userId: req.params.userId}
  })
  .then(orders => res.json(orders))
  .catch(next);
});

router.get('/address/:addressId/', function (req, res, next) {
  Order.findAll({
    where: {addressId: req.params.addressId}
  })
  .then(orders => res.json(orders))
  .catch(next);
});

router.post('/', function (req, res, next){
  Order.create(req.body)
  .then(order => res.status(201).send(order))
  .catch(next);
});

router.delete('/:id', function (req, res, next){
  OrderItem.findAll({where: {orderId: req.params.id}})
  .then(function(items){
    items.forEach(function(item){
      updateInventory(item, -item.quantity);
      item.destroy();
    });
  })
  .then(function(){
    return Order.findById(req.params.id)
  })
  .then(function(order){
    order.destroy();
  })
  .then(response => res.sendStatus(204));


  // Order.destroy({where: req.body})
  // .then(response => res.sendStatus(204));
});

router.put('/:id', function(req, res, next){
  Order.findById(req.params.id)
  .then(function(order){
    return order.update(req.body)
  })
  .then (updatedOrder => res.sendStatus(200))
  .catch(next);
})


// Order Item Routes ------------------------------------------------
router.get('/orderItem/:id', function (req, res, next) {
  OrderItem.findById(req.params.id)
  .then(orderItems => res.json(orderItems))
  .catch(next);
});

router.post('/orderItem', function (req, res, next){
  OrderItem.create(req.body)
  .then(function(item){
    return item.setOrder(req.body.orderId);
  })
  .then(item => res.status(201).send(item))
  .catch(next);
});

router.post('/admin/orderItem', function (req, res, next){
  OrderItem.create(req.body)
  .then(function(item){
    return item.setOrder(req.body.orderId);
  })
  .then(function(item){
    return updateInventory(item, req.body.quantity)
  })
  .then(item => res.status(201).send(item))
  .catch(next);
});

router.delete('/orderItem/:id', function (req, res, next){
  OrderItem.findById(req.params.id)
  .then(function(item){
    return updateInventory(item, -item.quantity);
  })
  .then(function(item){
    OrderItem.destroy({where: {id: req.params.id}})
  })
  .then(response => res.sendStatus(204));
});

router.put('/orderItem/:id', function(req, res, next){
  OrderItem.findById(req.params.id)
  .then(function(item){
    return item.update(req.body)
  })
  .then (updatedItem => res.sendStatus(200))
  .catch(next);
})

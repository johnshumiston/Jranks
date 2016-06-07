const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const OrderItem = require('../../db/models/orderItem')(db);
module.exports = router;

router.get('/', function (req, res, next) {
  OrderItem.findAll()
  .then(orderItems => res.json(orderItems))
  .catch(next);
});
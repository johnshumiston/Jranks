const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Order = require('../../db/models/order')(db);
module.exports = router;

router.get('/', function (req, res, next) {
  Order.findAll()
  .then(orders => res.json(orders))
  .catch(next);
});
const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Order = db.model("order");
module.exports = router;

router.get('/', function (req, res, next) {
  Order.findAll()
  .then(orders => res.json(orders))
  .catch(next);
});
const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const BillingInfo = require('../../db/models/billingInfo')(db);
module.exports = router;

router.get('/', function (req, res, next) {
  BillingInfo.findAll()
  .then(info => res.json(info))
  .catch(next);
});
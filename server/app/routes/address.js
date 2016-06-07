const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Address = require('../../db/models/address')(db);
module.exports = router;

router.get('/', function (req, res, next) {
  Address.findAll()
  .then(addresses => res.json(addresses))
  .catch(next);
});
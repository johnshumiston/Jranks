const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Review = require('../../db/models/review')(db);
module.exports = router;

router.get('/', function (req, res, next) {
  Review.findAll()
  .then(reviews => res.json(reviews))
  .catch(next);
});
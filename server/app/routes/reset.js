const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const User = db.model('user');

module.exports = router;


    router.put('/', function (req, res, next) {
      console.log(req.user.id)
      console.log(req.body)
        req.user.update(req.body)
        .then(user => res.sendStatus(200))
        .catch(next);
    });
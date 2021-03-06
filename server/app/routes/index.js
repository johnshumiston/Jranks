'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/inventory', require('./inventory'));
router.use('/address', require('./address'));
router.use('/order', require('./order'));
router.use('/cart', require('./cart'));
router.use('/reset', require('./reset'));
// router.use('/checkout', require('./checkout'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

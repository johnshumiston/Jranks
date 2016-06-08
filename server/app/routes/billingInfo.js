const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const BillingInfo = db.model("billingInfo");
module.exports = router;

router.get('/', function (req, res, next) {
  BillingInfo.findAll()
  .then(info => res.json(info))
  .catch(next);
});

router.get('/:userId', function (req, res, next) {
	BillingInfo.findAll({
		where: {
			userId: req.params.userId
		}
	})
	.then(function(userBillingInfos){
		res.json(userBillingInfos);
	})
	.catch(next);
});

router.get('/:userId/:billingInfoId', function (req, res, next) {
	BillingInfo.findOne({
		where: {
			billingInfoId: req.params.billingInfoId
		}
	})
	.then(function(userBillingInfo){
		res.json(userBillingInfo);
	})
	.catch(next);
});

router.post('/:userId', function (req, res, next) {
	BillingInfo.create(req.body)
	.then(function(billingInfo){
		billingInfo.userId = req.params.userId;
		return billingInfo.save();
	})
	.then(function(newBillingInfo){
		res.status(201).send(newBillingInfo);
	})
	.catch(next);
});

router.put('/:userId/:billingInfoId', function (req, res, next) {
	BillingInfo.findOne({
		where: {
			billingInfoId: req.params.billingInfoId
		}
	})
	.then(function(userBillingInfo){
		userBillingInfo.update(req.body);
	})
	.then(function(updatedBillingInfo){
		res.status(200).send(updatedBillingInfo);
	})
	.catch(next);
});

router.delete('/:userId/:billingInfoId', function (req, res, next) {
	BillingInfo.destroy({
		where: {
			billingInfoId: req.params.billingInfoId
		}
	})
	.then(function(deletedBillingInfo){
		res.sendStatus(204);
	})
	.catch(next);
});
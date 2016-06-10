const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Address = db.model("address");

module.exports = router;

router.get('/', function (req, res, next) {
  Address.findAll()
  .then(addresses => res.json(addresses))
  .catch(next);
});

router.get('/:userId/all', function (req, res, next) {
	Address.findAll({
		where: {userId: req.params.userId}
	})
	.then(function(userAddresses){
		res.json(userAddresses);
	})
	.catch(next);
});

router.get('/:userId/primary', function (req, res, next) {
	Address.findOne({
		where: {
			userId: req.params.userId,
			is_primary: true
		}
	})
	.then(function(userAddress){
		res.json(userAddress);
	})
	.catch(next);
});

router.post('/', function (req, res, next) {
	Address.create(req.body)
	.then(function(createdAddress){
		return createdAddress.reconcilePrimary();
	})
	.then(function(newAddress){
		res.status(201).send(newAddress);
	})
	.catch(next);
});

router.put('/:addressId', function (req, res, next) {
	Address.findById(req.params.addressId)
	.then(function(userAddress){
		return userAddress.update(req.body);
	})
	.then(function(updatedAddress){
		return updatedAddress.reconcilePrimary();
	})
	.then(function(updatedAddress){
		res.status(200).send(updatedAddress);
	})
	.catch(next);
});

router.delete('/:addressId', function (req, res, next) {
	Address.findById(req.params.addressId)
	.then(function(address){
		return address.update({userId: null});
	})
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
});

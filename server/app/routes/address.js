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

router.get('/:userId', function (req, res, next) {
	 return Address.findAll({
		where: {
			userId: req.params.userId
		}
	})
	.then(function(userAddresses){
		res.json(userAddresses);
	})
	.catch(next);
});

router.get('/:userId/:addressId/', function (req, res, next) {
	Address.findOne({
		where: {
			addressId: req.params.addressId
		}
	})
	.then(function(userAddress){
		res.json(userAddress);
	})
	.catch(next);
});

router.post('/:userId', function (req, res, next) {
	Address.create(req.body)
	.then(function(address){
		address.userId = req.params.userId;
		return address.save();
	})
	.then(function(createdAddress){
		var addressId = createdAddress.id;
		var userId = req.params.userId;
		if (createdAddress.is_primary === true) {
			Address.update(
				{
					is_primary: false
				},
			{
				where: {
					userId: userId,
					id: {
						$ne: addressId
					}
				}
			})
			.then(function(){
				return "yes";
			});
		}
		return createdAddress;
	})
	.then(function(newAddress){
		res.status(201).send(newAddress);
	})
	.catch(next);
});

router.put('/:userId/:addressId', function (req, res, next) {
	Address.findOne({
		where: {
			addressId: req.params.addressId
		}
	})
	.then(function(userAddress){
		return userAddress.update(req.body);
	})
	.then(function(updatedAddress){
		var addressId = updatedAddress.id;
		var userId = req.params.userId;
		if (updatedAddress.is_primary === true) {
			Address.update(
				{
					is_primary: false
				},
			{
				where: {
					userId: userId,
					id: {
						$ne: addressId
					}
				}
			})
			.then(function(){
				return "yes";
			});
		}
		return updatedAddress;
	})
	.then(function(updatedAddress){
		res.status(200).send(updatedAddress);
	})
	.catch(next);
});

// router.put('/:userId/:addressId/make', function (req, res, next) {
// 	Address.findOne({
// 		where: {
// 			addressId: req.params.addressId
// 		}
// 	})
// 	.then(function(userAddress){
// 		userAddress.update(req.body);
// 	})
// 	.then(function(updatedAddress){
// 		res.status(200).send(updatedAddress);
// 	})
// 	.catch(next);
// });

router.delete('/:userId/:addressId', function (req, res, next) {
	Address.destroy({
		where: {
			addressId: req.params.addressId
		}
	})
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
});

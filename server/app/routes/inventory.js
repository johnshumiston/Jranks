'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Inventory = db.model("inventory");
const Review = db.model("review");
module.exports = router;

router.get('/', function (req, res, next) {
  Inventory.findAll()
  .then(items => res.json(items))
  .catch(next);
});

router.get('/:type', function (req, res, next) {
  var type = req.params.type;
  Inventory.findAll({ 
    where: {
      type: type
      } 
    })
  .then(items => res.json(items))
  .catch(next);
});

router.post('/:inventoryId/reviews', function(req, res, next) {   
  return Review.create(req.body)
  .then(function(review) {
    review.inventoryId = req.params.inventoryId;
    return review.save();
  })
  .then(review => res.status(201).send(review))
  .catch(next);
});

// router.param('albumId', function (req, res, next, id) {
//   Album.scope('defaultScope', 'populated').findById(id)
//   .then(function (album) {
//     if (!album) throw new Error('not found!');
//     req.album = album;
//     next();
//     return null; // silences bluebird warning about promises inside of next
//   })
//   .catch(next);
// });

// router.get('/:albumId', function (req, res) {
//   res.json(req.album);
// });

// router.get('/:albumId/image', function (req, res, next) {
//   Album.findById(req.params.albumId, {
//     attributes: ['cover', 'coverType']
//   })
//   .then(function (album) {
//     if (!album.cover || !album.coverType) return next(new Error('no cover'));
//     res.set('Content-Type', mime.lookup(album.coverType));
//     res.send(album.cover);
//   })
//   .catch(next);
// });

// router.get('/:albumId/songs/', function (req, res) {
//   res.json(req.album.songs);
// });

// router.get('/:albumId/songs/:songId', function (req, res) {
//   const songToSend = req.album.songs.find(song => {
//     return song.id === Number(req.params.songId);
//   });
//   if (!songToSend) return res.sendStatus(404);
//   res.json(songToSend);
// });

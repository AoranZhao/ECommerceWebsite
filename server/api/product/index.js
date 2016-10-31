'use strict';

var express = require('express');
var controller = require('./product.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

// upload img
var uploadOptions = { autoFile: true, uploadDir: 'client/assets/uploads/' }
var multiparty = require('connect-multiparty');
router.post('/:id/upload', multiparty(uploadOptions), controller.upload);

module.exports = router;

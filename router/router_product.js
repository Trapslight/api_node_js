var express = require('express');
var router = express.Router();
var product = require('../controllers/product.controller');

// Parti Product
router.get('/', product.findAll );
router.get('/:id', product.findOne);
router.put('/:id',product.update);
router.post('/', product.create);
router.delete('/:id', product.delete);

module.exports = router;
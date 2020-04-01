var express = require('express');
var router = express.Router();
var orders = require('../controllers/order.controller');


router.get('/', orders.findAll);
router.get('/:id',orders.findOne);
router.put('/:id', orders.update)
router.delete('/:id', orders.delete);
router.post('/', orders.create);

module.exports = router;
var express = require('express');
var router = express.Router();
var user = require('../controllers/user.controllers');


router.get('/', user.findAll);
router.get('/:id', user.findOne);
router.put('/:id', user.update);
router.post('/', user.create);
router.delete('/:id', user.delete);


module.exports = router;
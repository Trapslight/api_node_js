var express = require('express');
var router = express.Router();

var router_users = require('../router/router_user');
var router_products = require('../router/router_product');
var router_orders = require('../router/router_order');


router.use('/users', router_users);
router.use('/products', router_products);
router.use('/orders', router_orders);
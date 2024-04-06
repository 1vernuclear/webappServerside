const express = require('express');
const controller = require('../controllers/orderController');
const router = express.Router();

router.get('/all-orders', controller.getOrders);
router.get('/', controller.getOrders);

router.get('/:id', controller.getOrder);

router.post('/', controller.createOrder);

router.delete('/:id', controller.deleteOrder);

module.exports = router;
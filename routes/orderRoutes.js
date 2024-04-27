const express = require('express');
const orderController = require('../controllers/orderController');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/all-orders', orderController.getOrders);
router.get('/', orderController.getOrders);

router.get('/:id', orderController.getOrder);

router.post('/', orderController.createOrder);

router.delete('/:id', orderController.deleteOrder);

router.put('/:id', productController.updateProduct);

module.exports = router;
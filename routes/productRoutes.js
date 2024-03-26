const express = require('express');
const controller = require('../controllers/productController');
const router = express.Router();

router.post('/', controller.createProduct);
router.get('/:id', controller.getProduct);
router.get('/', controller.getProducts);
router.get('/all-products', controller.getProducts);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
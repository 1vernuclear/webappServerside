const express = require('express');
const controller = require('../controllers/productController');
const router = express.Router();

router.get('/all-products', controller.getProducts);
router.get('/:id', controller.getProduct);
router.post('/', controller.createProduct);
router.get('/', controller.getProducts);
router.delete('/:id', controller.deleteProduct);
router.put('/:id', controller.updateProduct);

module.exports = router;
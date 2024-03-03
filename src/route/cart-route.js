const express = require('express');
const cartController = require('../controller/cart-controller');
const router = express.Router();

router.get('/', cartController.getCartByUser);
router.get('/:cartId', cartController.getProductInCart);
router.post('/:cartId/:productId', cartController.addProductToCart);
router.patch('/', cartController.updateCart);
router.delete('/:cpId', cartController.deleteProductInCart);

// create cart for old user
router.post('/:userId', cartController.createCart);

module.exports = router;
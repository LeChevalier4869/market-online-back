const express = require('express');
const orderController = require('../controller/order-controller');
const router = express.Router();

router.get('/', () => {});
router.post('/', () => {});
router.post('/:orderId/:productId', () => {});
router.patch('/:opId', () => {});
router.delete('/:opId', () => {});

module.exports = router;
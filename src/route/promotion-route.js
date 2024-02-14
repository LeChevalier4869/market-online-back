const express = require('express');
const promotionController = require('../controller/promotion-controller');
const router = express.Router();

router.get('/landing', promotionController.getPromotionLanding);
router.get('/:promotionId', promotionController.getPromotionById);

module.exports = router;
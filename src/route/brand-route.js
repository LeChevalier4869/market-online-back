const express = require('express');
const brandController = require('../controller/brand-controller');
const router = express.Router();

router.get('/landing', brandController.getBrandLanding);
router.get('/:brandId', brandController.getBrandById);

module.exports = router;
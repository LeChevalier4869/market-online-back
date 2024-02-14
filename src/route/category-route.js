const express = require('express');
const categoryController = require('../controller/category-controller');
const router = express.Router();

router.get('/landing', categoryController.getCategoryLanding);
router.get('/:categoryId', categoryController.getCategoryById);

module.exports = router;
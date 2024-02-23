const express = require('express');
const prisma = require('../config/prisma');
const addressController = require('../controller/address-controller');
const router = express.Router();

router.get('/', addressController.getAllAddressByUser);
router.get('/:addressId', addressController.getAddressById);
router.post('/new', addressController.createAddress);
router.patch('/:addressId', addressController.updateAddress);
router.delete('/:addressId', addressController.deleteAddress);

module.exports = router;
const express = require('express');
const authenticate = require('../middlewares/authenticate');
const authController = require('../controller/auth-controller');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.getMe);
router.post('/forget-password', authController.forgetPassword);
router.get('/forget-password/:token', authController.verifyForgetPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
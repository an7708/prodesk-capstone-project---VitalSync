    const express = require('express');
    const router = express.Router();
    const protect = require('../middleware/auth.middleware');
    const { createCheckoutSession, verifyPayment } = require('../controllers/payment.controller');

    router.post('/create-checkout-session', protect, createCheckoutSession);
    router.get('/verify/:sessionId', protect, verifyPayment);

    module.exports = router;
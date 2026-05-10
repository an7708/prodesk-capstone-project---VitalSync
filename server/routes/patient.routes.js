const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const { getPatientStats } = require('../controllers/patient.controller');

router.get('/:id/stats', protect, getPatientStats);

module.exports = router;
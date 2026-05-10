// server/routes/doctor.routes.js — NEW FILE
// This route was missing, which caused BookAppointment to fall into
// the catch block and use fake _id: '1' data → BSONError

const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const { getDoctors } = require('../controllers/doctor.controller');

// GET /api/doctors — any logged-in user can fetch the doctor list
router.get('/', protect, getDoctors);

module.exports = router;
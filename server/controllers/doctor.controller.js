    // server/controllers/doctor.controller.js — NEW FILE
    // Fetches users with role: 'doctor' from your existing User model.
    // No new model needed — doctors are just Users with role === 'doctor'.

    const User = require('../models/User.model');

    // GET /api/doctors
    // Returns all doctors with their availability status
    const getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' })
        .select('name email specialty availabilityStatus')  // never expose password
        .lean();

        res.status(200).json({ success: true, doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    };

    module.exports = { getDoctors };
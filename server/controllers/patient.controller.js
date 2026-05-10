    const Appointment = require('../models/Appointment.model');

    const getPatientStats = async (req, res) => {
    try {
        const patientId = req.user.id;
        const now = new Date();

        const [upcoming, past] = await Promise.all([
        Appointment.find({
            patientId,
            scheduledAt: { $gte: now },
            status: { $in: ['pending', 'confirmed'] },
        }).populate('doctorId', 'name'),

        Appointment.find({
            patientId,
            $or: [
            { scheduledAt: { $lt: now } },
            { status: { $in: ['completed', 'cancelled'] } },
            ],
        })
            .sort({ scheduledAt: -1 })
            .limit(1)
            .populate('doctorId', 'name'),
        ]);

        res.status(200).json({
        success: true,
        upcomingAppointments: upcoming.length,
        activePrescriptions: 0,
        lastVisit: past[0]
            ? new Date(past[0].scheduledAt).toLocaleDateString()
            : null,
        lastDoctor: past[0]?.doctorId?.name || '',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    };

    module.exports = { getPatientStats };
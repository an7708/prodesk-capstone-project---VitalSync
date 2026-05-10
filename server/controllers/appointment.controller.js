const Appointment = require('../models/Appointment.model');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

const createAppointment = async (req, res, next) => {
try {
    const { doctorId, scheduledAt, reason, duration } = req.body;
    const appointment = await Appointment.create({
    patientId: req.user.id,
    doctorId,
    scheduledAt,
    reason,
    duration: duration || 30,
    });
    const populated = await appointment.populate('doctorId', 'name email');
    res.status(201).json({ success: true, appointment: populated });
} catch (error) {
    logger.error('Create appointment error', { message: error.message });
    next(error);
}
};

const getAppointments = async (req, res, next) => {
try {
    let query = {};
    if (req.user.role === 'patient') query = { patientId: req.user.id };
    else if (req.user.role === 'doctor') query = { doctorId: req.user.id };

    const appointments = await Appointment.find(query)
    .populate('patientId', 'name email')
    .populate('doctorId', 'name email')
    .sort({ scheduledAt: -1 });

    res.status(200).json({ success: true, count: appointments.length, appointments });
} catch (error) {
    next(error);
}
};

const getAppointmentById = async (req, res, next) => {
try {
    const appointment = await Appointment.findById(req.params.id)
    .populate('patientId', 'name email')
    .populate('doctorId', 'name email');

    if (!appointment) {
    return next(new AppError('Appointment not found', 404));
    }

    const isPatient = appointment.patientId._id.toString() === req.user.id;
    const isDoctor = appointment.doctorId._id.toString() === req.user.id;

    if (!isPatient && !isDoctor) {
    return next(new AppError('You are not authorized to view this appointment', 403));
    }

    res.status(200).json({ success: true, appointment });
} catch (error) {
    next(error);
}
};

const updateAppointment = async (req, res, next) => {
try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
    return next(new AppError('Appointment not found', 404));
    }

    const isPatient = appointment.patientId.toString() === req.user.id;
    const isDoctor = appointment.doctorId.toString() === req.user.id;

    if (!isPatient && !isDoctor) {
    return next(new AppError('You are not authorized to update this appointment', 403));
    }

    let allowedUpdates = {};
    if (req.user.role === 'patient') {
    const { scheduledAt, reason } = req.body;
    if (scheduledAt) allowedUpdates.scheduledAt = scheduledAt;
    if (reason) allowedUpdates.reason = reason;
    }
    if (req.user.role === 'doctor') {
    const { status, notes } = req.body;
    if (status) allowedUpdates.status = status;
    if (notes) allowedUpdates.notes = notes;
    }

    const updated = await Appointment.findByIdAndUpdate(
    req.params.id,
    allowedUpdates,
    { new: true, runValidators: true }
    ).populate('patientId', 'name email').populate('doctorId', 'name email');

    res.status(200).json({ success: true, appointment: updated });
} catch (error) {
    next(error);
}
};

const deleteAppointment = async (req, res, next) => {
try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
    return next(new AppError('Appointment not found', 404));
    }

    if (appointment.patientId.toString() !== req.user.id) {
    return next(new AppError('You can only cancel your own appointments', 403));
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({ success: true, message: 'Appointment cancelled successfully', appointment });
} catch (error) {
    next(error);
}
};

module.exports = { createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment };
    const mongoose = require('mongoose');

    const appointmentSchema = new mongoose.Schema(
    {
        patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        },
        doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        },
        scheduledAt: {
        type: Date,
        required: [true, 'Please provide a date and time'],
        },
        duration: {
        type: Number,
        default: 30,
        },
        status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
        },
        reason: {
        type: String,
        required: [true, 'Please provide a reason for the visit'],
        trim: true,
        },
        notes: {
        type: String,
        trim: true,
        },
        isPaid: {
        type: Boolean,
        default: false,
        },
    },
    { timestamps: true }
    );

    module.exports = mongoose.model('Appointment', appointmentSchema);
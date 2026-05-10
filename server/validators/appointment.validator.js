const Joi = require('joi');

const createAppointmentSchema = Joi.object({
doctorId: Joi.string().required().messages({
    'any.required': 'Please select a doctor',
}),
scheduledAt: Joi.date().min('now').required().messages({
    'date.min': 'Appointment must be scheduled in the future',
    'any.required': 'Please select a date and time',
}),
reason: Joi.string().min(10).max(500).trim().required().messages({
    'string.min': 'Please describe your reason in at least 10 characters',
    'any.required': 'Reason for visit is required',
}),
duration: Joi.number().valid(15, 20, 30, 60).default(30),
});

const updateAppointmentSchema = Joi.object({
status: Joi.string().valid('pending', 'confirmed', 'completed', 'cancelled'),
notes: Joi.string().max(1000).trim(),
scheduledAt: Joi.date().min('now'),
reason: Joi.string().min(10).max(500).trim(),
}).min(1).messages({
'object.min': 'Please provide at least one field to update',
});

module.exports = { createAppointmentSchema, updateAppointmentSchema };
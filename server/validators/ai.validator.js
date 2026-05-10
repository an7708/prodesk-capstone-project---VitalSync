const Joi = require('joi');

const suggestSchema = Joi.object({
    symptoms: Joi.string().min(10).max(1000).trim().required().messages({
    'string.min': 'Please describe your symptoms in at least 10 characters',
    'string.max': 'Symptom description cannot exceed 1000 characters',
    'any.required': 'Symptoms description is required',
    }),
});

module.exports = { suggestSchema };
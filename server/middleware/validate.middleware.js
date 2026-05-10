    const Joi = require('joi');

    // This is a middleware factory — it takes a schema and returns a middleware function
    const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
        abortEarly: false,   
        stripUnknown: true,   
        });

        if (error) {
        const message = error.details.map((d) => d.message).join(', ');
        return res.status(400).json({
            success: false,
            status: 400,
            message,
        });
        }

        req.body = value;
        next();
    };
    };

    module.exports = validate;
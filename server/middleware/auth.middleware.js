    const jwt = require('jsonwebtoken');
    const User = require('../models/User.model');

    const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
        success: false,
        message: 'Access denied. Please log in to continue.',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || !user.isActive) {
        return res.status(401).json({
            success: false,
            message: 'User account not found or has been deactivated.',
        });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
        success: false,
        message: 'Token is invalid or has expired. Please log in again.',
        });
    }
    };

    module.exports = protect;
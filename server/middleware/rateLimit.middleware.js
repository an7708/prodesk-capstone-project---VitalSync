    const rateLimit = require('express-rate-limit');

    // General API limiter — applies to all routes
    const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,    
    max: 100,                      
    standardHeaders: true,
    legacyHeaders: false,
    message: {
    success: false,
    status: 429,
    message: 'Too many requests from this IP. Please try again in 15 minutes.',
    },
    });

    // Strict limiter for auth routes — prevents brute force attacks
    const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,   
    max: 10,                     
    standardHeaders: true,
    legacyHeaders: false,
    message: {
    success: false,
    status: 429,
    message: 'Too many login attempts. Please try again in 15 minutes.',
    },
    });

    // Strict limiter for AI endpoint — protects your Gemini API quota
    const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,  
    max: 20,                    
    standardHeaders: true,
    legacyHeaders: false,
    message: {
    success: false,
    status: 429,
    message: 'AI suggestion limit reached. You can make 20 requests per hour.',
    },
    });

    module.exports = { generalLimiter, authLimiter, aiLimiter };
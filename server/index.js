    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    require('dotenv').config();
    const logger = require('./utils/logger');

    const app = express();
    
    // Middleware
    //app.use(cors({ origin: 'http://localhost:3000' }));

    const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://capstoneproject-umber.vercel.app',
    'https://capstoneproject-umber.vercel.app/',
    'https://capstoneproject-git-main-an7708s-projects.vercel.app',
    //'https://capstoneproject-*.vercel.app'
];

    app.use(cors({
    // origin: (origin, callback) => {
    //     console.log('Request Origin:', origin);   

    //     if (!origin || allowedOrigins.includes(origin)) {
    //     callback(null, true);
    //     } else {
    //     console.log('Blocked Origin:', origin); 
    //     callback(new Error('Not allowed by CORS'));
    //     }
    // },
    origin: true, // Allow all origins (for development; restrict in production)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

    const { generalLimiter, authLimiter, aiLimiter } = require('./middleware/rateLimit.middleware');
    app.use('/api', generalLimiter);
    app.use('/api/auth/login', authLimiter);
    app.use('/api/ai/suggest', aiLimiter);
    app.use('/api/ai', require('./routes/ai.routes'));
    app.use('/api/patients', require('./routes/patient.routes'));
    // Database connection
    mongoose.connect(process.env.MONGODB_URI)
    // .then(() => console.log('MongoDB connected successfully'))
    // .catch((err) => console.error('MongoDB connection error:', err));

        .then(() => logger.info('MongoDB connected successfully'))
        .catch((err) => logger.error('MongoDB connection failed', { message: err.message }));

    const errorHandler = require('./middleware/error.middleware');

    app.use('/api/auth', require('./routes/auth.routes'));
    app.use('/api/payments', require('./routes/payment.routes')); 
    app.use('/api/appointments', require('./routes/appointment.routes'));
    app.use('/api/doctors', require('./routes/doctor.routes'));

    // Health check
    app.get('/', (req, res) => {
    res.json({ message: 'VitalSync API is running' });
    });

    // 404 handler — for routes that don't exist
    app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: `Route ${req.originalUrl} not found`,
    });
    });
    
    app.use(errorHandler);

    app.use((err, req, res, next) => { 
    console.error(err.stack);
    res.status(500).json({ success: false, message: err.message });
    });


    const PORT = process.env.PORT || 5000;
    //app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
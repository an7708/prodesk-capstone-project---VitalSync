    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    require('dotenv').config();

    const app = express();

    // Middleware
    app.use(cors({ origin: 'http://localhost:3000' }));
    app.use(express.json());

    // Database connection
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

    // Routes (we will add these next)
    app.use('/api/auth', require('./routes/auth.routes'));

    // Health check
    app.get('/', (req, res) => {
    res.json({ message: 'VitalSync API is running' });
    });

    // Add this AFTER all your routes
    app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: err.message });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
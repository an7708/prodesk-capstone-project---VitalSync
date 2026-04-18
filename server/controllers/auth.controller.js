    const jwt = require('jsonwebtoken');
    const User = require('../models/User.model');

    const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    };

    const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'An account with this email already exists',
        });
        }

        const user = await User.create({ name, email, password, role });
        const token = generateToken(user._id);

        res.status(201).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
    };

    const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please provide email and password',
        });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
        }

        const token = generateToken(user._id);

        res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
    };

    const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    };

    module.exports = { register, login, getMe };
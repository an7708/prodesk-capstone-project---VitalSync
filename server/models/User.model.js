  // server/models/User.model.js — FIXED
  // Added: specialty, availabilityStatus
  // Fixed: missing next() call in pre-save hook (causes hang on register)

  const mongoose = require('mongoose');
  const bcrypt = require('bcryptjs');

  const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false,
      },
      role: {
        type: String,
        enum: ['patient', 'doctor'],
        default: 'patient',
      },

      // ✅ ADDED — required for doctor list in BookAppointment
      specialty: {
        type: String,
        default: '',
        trim: true,
      },
      availabilityStatus: {
        type: String,
        enum: ['online', 'busy', 'offline'],
        default: 'online',
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  );

  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // ✅ FIXED — was commented out, caused register to hang forever
  });

  userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  module.exports = mongoose.model('User', userSchema);
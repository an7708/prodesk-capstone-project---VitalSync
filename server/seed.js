    // server/seed.js — paste this in your server/ folder and run: node seed.js

    require('dotenv').config();
    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');

    const userSchema = new mongoose.Schema(
    {
        name:               { type: String, required: true, trim: true },
        email:              { type: String, required: true, unique: true, lowercase: true },
        password:           { type: String, required: true, select: false },
        role:               { type: String, enum: ['patient', 'doctor'], default: 'patient' },
        specialty:          { type: String, default: '' },
        availabilityStatus: { type: String, enum: ['online', 'busy', 'offline'], default: 'online' },
        isActive:           { type: Boolean, default: true },
    },
    { timestamps: true }
    );

    const appointmentSchema = new mongoose.Schema(
    {
        patientId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        doctorId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        scheduledAt: { type: Date, required: true },
        reason:      { type: String, default: '' },
        status:      { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
        duration:    { type: Number, default: 30 },
    },
    { timestamps: true }
    );

    const User        = mongoose.models.User        || mongoose.model('User', userSchema);
    const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

    // ─── UPDATE THIS to your patient login email ──────────────────────────────
    const PATIENT_EMAIL = 'anisha@example.com'; // ← change this!
    // ─────────────────────────────────────────────────────────────────────────

    const doctorsToSeed = [
    { name: 'Dr. A. Patel',  email: 'apatel@vitalsync.com',  specialty: 'General Physician', availabilityStatus: 'online'  },
    { name: 'Dr. S. Rao',    email: 'srao@vitalsync.com',    specialty: 'Cardiologist',       availabilityStatus: 'busy'    },
    { name: 'Dr. M. Khan',   email: 'mkhan@vitalsync.com',   specialty: 'Neurologist',        availabilityStatus: 'online'  },
    { name: 'Dr. P. Sharma', email: 'psharma@vitalsync.com', specialty: 'Dermatologist',      availabilityStatus: 'online'  },
    { name: 'Dr. R. Verma',  email: 'rverma@vitalsync.com',  specialty: 'Orthopedic Surgeon', availabilityStatus: 'offline' },
    ];

    async function seed() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected\n');

    const hashedPw = await bcrypt.hash('Doctor@123', 10);
    const createdDoctors = [];

    for (const doc of doctorsToSeed) {
        const updated = await User.findOneAndUpdate(
        { email: doc.email },
        {
            $set: { name: doc.name, role: 'doctor', specialty: doc.specialty, availabilityStatus: doc.availabilityStatus, isActive: true },
            $setOnInsert: { password: hashedPw },
        },
        { upsert: true, new: true }
        );
        console.log(`✅ Doctor upserted: ${doc.name} (${doc.specialty}) — ${doc.availabilityStatus}`);
        createdDoctors.push(updated);
    }

    const patient = await User.findOne({ email: PATIENT_EMAIL });
    if (!patient) {
        console.log(`\n⚠️  Patient not found: "${PATIENT_EMAIL}"`);
        console.log('   Update PATIENT_EMAIL in seed.js to your login email.');
        console.log('   Doctors were created — booking should work now.\n');
        await mongoose.disconnect();
        return;
    }

    await Appointment.deleteMany({ patientId: patient._id });
    console.log(`\n🗑  Cleared old appointments for ${patient.name}`);

    const samples = [
        { patientId: patient._id, doctorId: createdDoctors[0]._id, scheduledAt: new Date(Date.now() + 2*24*60*60*1000), reason: 'Routine checkup and blood pressure monitoring', status: 'confirmed' },
        { patientId: patient._id, doctorId: createdDoctors[1]._id, scheduledAt: new Date(Date.now() + 5*24*60*60*1000), reason: 'Heart palpitations follow-up', status: 'pending' },
        { patientId: patient._id, doctorId: createdDoctors[2]._id, scheduledAt: new Date(Date.now() - 5*24*60*60*1000), reason: 'Chest pain evaluation', status: 'completed' },
        { patientId: patient._id, doctorId: createdDoctors[3]._id, scheduledAt: new Date(Date.now() - 12*24*60*60*1000), reason: 'Recurring headaches and migraines', status: 'completed' },
    ];

    for (const appt of samples) {
        await Appointment.create(appt);
        const doc = createdDoctors.find(d => d._id.equals(appt.doctorId));
        console.log(`📅 Appointment: ${doc.name} — ${appt.status} — ${new Date(appt.scheduledAt).toDateString()}`);
    }

    console.log('\n🎉 Seed complete! 5 doctors + 4 appointments created.');
    console.log('   Restart your server then refresh the app.\n');
    await mongoose.disconnect();
    }

    seed().catch(err => { console.error('❌', err.message); mongoose.disconnect(); });
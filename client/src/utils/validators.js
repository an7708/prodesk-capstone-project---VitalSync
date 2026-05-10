    import { z } from 'zod';

    export const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    });

    export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['patient', 'doctor']),
    });

    export const appointmentSchema = z.object({
    doctorId: z.string().min(1, 'Please select a doctor'),
    scheduledAt: z.string().min(1, 'Please select a date and time'),
    reason: z.string().min(10, 'Please describe your reason for the visit'),
    });
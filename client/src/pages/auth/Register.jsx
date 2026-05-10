    import { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import api from '../../api/axios';
    import useAuthStore from '../../store/useAuthStore';
    import { registerSchema } from '../../utils/validators';

    export default function Register() {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);
    const [serverError, setServerError] = useState('');

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: { role: 'patient' },
    });

    const selectedRole = watch('role');

    const onSubmit = async (data) => {
        setServerError('');
        try {
        const res = await api.post('/auth/register', data);
        login(res.data.user, res.data.token);
        navigate(`/${res.data.user.role}/dashboard`);
        } catch (err) {
        setServerError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    const inputStyle = (hasError) => ({
        width: '100%', border: hasError ? '1.5px solid #EF4444' : '1.5px solid #E2E8F0',
        borderRadius: '9px', padding: '10px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
    });

    return (
        <div style={{ minHeight: '100vh', background: '#F0FDF9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '40px 36px', width: '100%', maxWidth: '420px' }}>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Create account</div>
            <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '28px' }}>Join VitalSync today</div>

            {serverError && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#991B1B', marginBottom: '16px' }}>
                {serverError}
            </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {['patient', 'doctor'].map((r) => (
                <label key={r} style={{ border: selectedRole === r ? `2px solid ${r === 'patient' ? '#0D9488' : '#4F46E5'}` : '1.5px solid #E2E8F0', background: selectedRole === r ? (r === 'patient' ? '#F0FDF9' : '#EEF2FF') : '#fff', borderRadius: '10px', padding: '12px', cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <input {...register('role')} type="radio" value={r} style={{ display: 'none' }} />
                    <span style={{ fontSize: '13px', fontWeight: '600', color: selectedRole === r ? (r === 'patient' ? '#065F46' : '#3730A3') : '#0F172A' }}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                    </span>
                </label>
                ))}
            </div>

            <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>Full name</label>
                <input {...register('name')} placeholder="Sarah Khan" style={inputStyle(errors.name)} />
                {errors.name && <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>{errors.name.message}</p>}
            </div>

            <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>Email address</label>
                <input {...register('email')} type="email" placeholder="you@example.com" style={inputStyle(errors.email)} />
                {errors.email && <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>{errors.email.message}</p>}
            </div>

            <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>Password</label>
                <input {...register('password')} type="password" placeholder="Minimum 6 characters" style={inputStyle(errors.password)} />
                {errors.password && <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting}
                style={{ background: '#0D9488', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '15px', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1, marginTop: '4px' }}>
                {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748B', marginTop: '20px' }}>
            Already have an account? <Link to="/login" style={{ color: '#0D9488', fontWeight: '500', textDecoration: 'none' }}>Sign in</Link>
            </p>
        </div>
        </div>
    );
    }
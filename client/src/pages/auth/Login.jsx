    import { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import api from '../../api/axios';
    import useAuthStore from '../../store/useAuthStore';
    import { loginSchema } from '../../utils/validators';

    export default function Login() {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);
    const [role, setRole] = useState('patient');
    const [serverError, setServerError] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    // const onSubmit = async (data) => {
    //     setServerError('');
    //     try {
    //     const res = await api.post('/auth/login', { ...data, role });
    //     login(res.data.user, res.data.token);
    //     navigate(`/${res.data.user.role}/dashboard`);
    //     } catch (err) {
    //     setServerError(err.response?.data?.message || 'Login failed. Please try again.');
    //     }
    // };
//     const onSubmit = async (data) => {
//     setServerError('');
    
//     try {
//         console.log("Sending login request with:", { ...data, role }); // Debugging

//         const res = await api.post('/auth/login', { 
//             email: data.email, 
//             password: data.password, 
//             role 
//         });

//         console.log("Login Response:", res.data); // ← Yeh console mein dekho

//         if (res.data?.token && res.data?.user) {
//             login(res.data.user, res.data.token);
//             const userRole = res.data.user.role || role;
//             navigate(`/${userRole}/dashboard`);
//         } else {
//             throw new Error("Invalid response from server");
//         }

//     } catch (err) {
//         console.error("Login Error Full:", err);
//         const errorMsg = err.response?.data?.message || 
//                         err.response?.data?.error || 
//                         'Login failed. Please try again.';
//         setServerError(errorMsg);
//     }
// };

const onSubmit = async (data) => {
    setServerError('');
    
    try {
        console.log("Login Request Sending:", { email: data.email, role });

        const res = await api.post('/auth/login', { 
            email: data.email, 
            password: data.password, 
            role 
        });

        console.log("Login Success Response:", res.data);

        login(res.data.user, res.data.token);
        
            setTimeout(() => {
            const userRole = res.data.user.role || role;
            navigate(`/${userRole}/dashboard`);
            }, 300);
            
        navigate(`/${res.data.user.role}/dashboard`);

    } catch (err) {
        console.error("Full Login Error:", err);
        console.error("Response Data:", err.response?.data);
        console.error("Status Code:", err.response?.status);

        const errorMsg = err.response?.data?.message 
                        || err.response?.data?.error 
                        || err.message 
                        || 'Login failed. Please try again.';

        setServerError(errorMsg);
    }
};
    return (
        <div style={{ minHeight: '100vh', background: '#F0FDF9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '40px 36px', width: '100%', maxWidth: '420px' }}>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Welcome back</div>
            <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '28px' }}>Sign in to your VitalSync account</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
            {['patient', 'doctor'].map((r) => (
                <button key={r} type="button" onClick={() => setRole(r)}
                style={{ border: role === r ? `2px solid ${r === 'patient' ? '#0D9488' : '#4F46E5'}` : '1.5px solid #E2E8F0', background: role === r ? (r === 'patient' ? '#F0FDF9' : '#EEF2FF') : '#fff', borderRadius: '10px', padding: '14px 12px', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: role === r ? (r === 'patient' ? '#065F46' : '#3730A3') : '#0F172A' }}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                </div>
                </button>
            ))}
            </div>

            {serverError && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#991B1B', marginBottom: '16px' }}>
                {serverError}
            </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>Email address</label>
                <input {...register('email')} type="email" placeholder="you@example.com"
                style={{ width: '100%', border: errors.email ? '1.5px solid #EF4444' : '1.5px solid #E2E8F0', borderRadius: '9px', padding: '10px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                {errors.email && <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>{errors.email.message}</p>}
            </div>

            <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>Password</label>
                <input {...register('password')} type="password" placeholder="Enter your password"
                style={{ width: '100%', border: errors.password ? '1.5px solid #EF4444' : '1.5px solid #E2E8F0', borderRadius: '9px', padding: '10px 12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                {errors.password && <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting}
                style={{ background: '#0D9488', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '15px', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? 'Signing in...' : 'Sign in to VitalSync'}
            </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748B', marginTop: '20px' }}>
            Don't have an account? <Link to="/register" style={{ color: '#0D9488', fontWeight: '500', textDecoration: 'none' }}>Create account</Link>
            </p>
        </div>
        </div>
    );
    }
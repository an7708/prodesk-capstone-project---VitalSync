import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/shared/ProtectedRoute';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import PatientDashboard from './pages/patient/Dashboard';
import Appointments from './pages/patient/Appointments';
import BookAppointment from './pages/patient/BookAppointment';
import MedicalHistory from './pages/patient/MedicalHistory';
import Prescriptions from './pages/patient/Prescriptions';
import EditProfile from './pages/patient/EditProfile';
import Settings from './pages/patient/Settings';

import DoctorDashboard from './pages/doctor/Dashboard';

import Upgrade from './pages/Upgrade';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';

import './App.css';
//import Landing from './pages/Landing';

export default function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/patient/dashboard" element={
            <ProtectedRoute allowedRole="patient"><PatientDashboard /></ProtectedRoute>
            } />
            <Route path="/patient/appointments" element={
            <ProtectedRoute allowedRole="patient"><Appointments /></ProtectedRoute>
            } />
            <Route path="/patient/book" element={
            <ProtectedRoute allowedRole="patient"><BookAppointment /></ProtectedRoute>
            } />
            <Route path="/patient/history" element={
            <ProtectedRoute allowedRole="patient"><MedicalHistory /></ProtectedRoute>
            } />
            <Route path="/patient/prescriptions" element={
            <ProtectedRoute allowedRole="patient"><Prescriptions /></ProtectedRoute>
            } />
            <Route path="/patient/profile" element={
            <ProtectedRoute allowedRole="patient"><EditProfile /></ProtectedRoute>
            } />
            <Route path="/patient/settings" element={
            <ProtectedRoute allowedRole="patient"><Settings /></ProtectedRoute>
            } />

            <Route path="/doctor/dashboard" element={
            <ProtectedRoute allowedRole="doctor"><DoctorDashboard /></ProtectedRoute>
            } />

            <Route path="/upgrade" element={
            <ProtectedRoute><Upgrade /></ProtectedRoute>
            } />
            <Route path="/payment/success" element={
            <ProtectedRoute><PaymentSuccess /></ProtectedRoute>
            } />
            <Route path="/payment/cancel" element={
            <ProtectedRoute><PaymentCancel /></ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        </BrowserRouter>
    );
    }
# VitalSync — Healthcare Management System

> A hospital-grade web platform for managing doctor-patient interactions, appointments, medical records, and prescriptions. Built as an industry-level capstone project demonstrating full-stack engineering with real-world business logic, role-based access control, and a production-quality user interface.

---

## Intern Information

| Field | Details |
|---|---|
| Project Name | VitalSync |
| Track  | Fullstack |
| Cohort | ProDesk Internship — 2026 |
| Repository | `prodesk-capstone-project-VitalSync` |

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [User Roles and Permissions](#user-roles-and-permissions)
4. [Core Features](#core-features)
5. [Database Architecture](#database-architecture)
6. [API Endpoints](#api-endpoints)
7. [Folder Structure](#folder-structure)
8. [Environment Variables](#environment-variables)
9. [Getting Started](#getting-started)
10. [Figma Designs](#figma-designs)
11. [Deployment](#deployment)
12. [Future Scope](#future-scope)

---

## Project Overview

VitalSync is a full-stack healthcare management platform inspired by real-world hospital software systems. The platform serves three types of users — Patients, Doctors, and Administrators — each with a completely separate dashboard, permission set, and user experience.

The core problem VitalSync solves is the fragmentation of patient health data. In most small-to-mid-scale clinical setups, appointment booking, prescription management, and medical history are handled across separate tools or paper records. VitalSync consolidates all of this into a single, role-aware web application.

The system handles appointment booking with real-time conflict detection, a chronological medical history timeline, prescription lifecycle management (creation, viewing, expiry tracking), and live doctor availability status powered by Socket.io.

This project is designed to reflect the architecture, code organization, and UI quality expected in a production healthcare SaaS product.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | React framework with file-based routing and server components |
| Tailwind CSS | Utility-first CSS framework for all styling |
| shadcn/ui | Accessible, unstyled component library built on Radix UI |
| Zustand | Lightweight client-side state management |
| React Hook Form | Form state management and validation |
| Zod | Schema validation for forms and API responses |
| Axios | HTTP client for API requests |
| Socket.io-client | Real-time doctor availability updates |
| date-fns | Date formatting and manipulation throughout the UI |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime for the server |
| Express.js | REST API framework |
| MongoDB | Primary NoSQL database |
| Mongoose | ODM for MongoDB schema definition and querying |
| NextAuth.js | Authentication with JWT strategy |
| bcryptjs | Password hashing |
| Socket.io | WebSocket server for real-time presence |
| Joi | Server-side request body validation |
| cors | Cross-origin resource sharing configuration |
| dotenv | Environment variable management |

### Infrastructure and Tooling

| Technology | Purpose |
|---|---|
| Vercel | Frontend deployment and CI/CD |
| Railway | Backend API and MongoDB deployment |
| GitHub Actions | Automated linting and build checks on pull requests |
| ESLint + Prettier | Code style enforcement |
| Postman | API development and testing |

---

## User Roles and Permissions

VitalSync implements strict role-based access control (RBAC) at both the route middleware level and the UI level. There are three roles.

### Patient

A patient can register and log in independently. Once authenticated, a patient can browse available doctors filtered by specialty, book appointments from a doctor's available time slots, view their full chronological medical history, read their active and expired prescriptions, and update their personal profile.

A patient cannot view another patient's records, access doctor-only views, or modify appointments that have already been confirmed or completed.

### Doctor

A doctor account is created by an Administrator — doctors do not self-register. Once logged in, a doctor can define their weekly availability windows, view their daily and weekly appointment schedule, access patient profiles for patients they have an active appointment with, write and issue prescriptions linked to a specific appointment, update appointment status (confirm, complete, or cancel), and toggle their real-time availability status (online, busy, offline).

A doctor cannot see patients outside their care and cannot access administrative controls.

### Admin

An administrator has full system access. The admin can create and deactivate doctor accounts, view all users and their activity, monitor platform-wide appointment statistics, and manage system settings. The admin dashboard is accessible at a separate route (`/admin`) and is protected by both role middleware and a separate admin secret token.

---

## Core Features

### Authentication and Authorization

- JWT-based authentication with secure HttpOnly cookie storage
- Role selection at login (Patient or Doctor) with server-side role verification
- Protected routes enforced at the Next.js middleware level using the session role
- Separate login flows rendering different dashboards post-authentication
- Password hashing with bcryptjs (12 salt rounds)
- Session persistence with NextAuth.js and 7-day token expiry

### Patient Dashboard

- Summary stat cards: upcoming appointments count, active prescriptions count, last visit date
- Real-time list of available doctors with their live status indicator (available, busy, offline)
- Doctor filter by specialty (General, Cardiology, Neurology, Dermatology, Pediatrics)
- Recent activity feed showing the last five system events for the patient
- Quick-link navigation to all major sections

### Appointment Booking System

- Multi-step booking wizard: select doctor, choose date and time slot, confirm booking
- Time slots generated dynamically from the doctor's `AvailabilitySlots` collection
- Booked slots are marked and rendered as unavailable in the UI — no double-booking possible
- Appointment status machine: `pending` → `confirmed` → `completed` or `cancelled.`
- Patients receive a confirmation summary with all booking details
- Patients can cancel a pending appointment up to 24 hours before the scheduled time

### Doctor Dashboard

- Daily schedule view rendered as a vertical timeline showing all appointments for the current day
- Each appointment card shows patient's name, visit reason, scheduled time, duration, and status
- Inline status update controls (confirm, mark complete, cancel) without leaving the schedule view
- Quick stats panel: total patients seen this week, appointments pending, prescriptions written
- Patient lookup — search for any patient under the doctor's care by name

### Doctor Availability Management

- Availability settings page where doctors define recurring weekly windows (e.g., Monday to Friday, 09:00 to 17:00)
- Slot duration configurable per doctor (15, 20, 30, or 60 minutes)
- Real-time online/busy/offline toggle powered by Socket.io — changes reflect immediately across all active patient sessions without a page refresh
- Slots already booked are automatically excluded from the patient booking view

### Medical History Timeline

- Full chronological timeline of every medical event for a patient
- Event types: Visit, Diagnosis, Prescription, Lab Result — each with its own color-coded badge
- Timeline is filterable by event type without reloading the page
- Each timeline card shows: date, event type, attending doctor, and a brief description
- Expandable card view reveals full notes, attachments, or prescription details
- Timeline accessible to both the patient (read-only) and the treating doctor

### Prescriptions Management

- Doctors write prescriptions linked to a specific appointment
- Each prescription stores: drug name, dosage, frequency, start date, end date, instructions, and refill count
- Patients view all active and expired prescriptions in a clean card layout
- Prescriptions approaching expiry (within 7 days) are flagged with a warning indicator
- Expired prescriptions are visually distinguished and moved to a separate "Past" section

### Admin Panel

- User management table with search, filter by role, and deactivate/reactivate controls
- Doctor creation form (email, specialty, license number, years of experience)
- Platform statistics: total registered patients, total doctors, appointments this month, appointment completion rate
- System health view showing database connection status and active WebSocket connections

---

## Database Architecture

VitalSync uses seven MongoDB collections. The schema relationships are documented below.

### Collections Overview

**Users**
The base identity record for every person in the system. The `role` field (`patient`, `doctor`, `admin`) controls which profile collection the record extends into and which routes are accessible.

```
_id           ObjectId   Primary key
name          String     Full name
email         String     Unique, indexed
passwordHash  String     bcrypt hash, never returned in responses
role          String     Enum: patient | doctor | admin
avatarUrl     String     Optional profile photo URL
isActive      Boolean    Soft-delete flag
createdAt     Date       Auto-set on creation
```

**DoctorProfiles**
Extended data for users with the role `doctor`. References `Users` via `userId`.

```
_id              ObjectId   Primary key
userId           ObjectId   FK → Users
specialty        String     e.g. General Physician, Cardiologist
licenseNumber    String     Unique medical license identifier
bio              String     Short professional biography
yearsExperience  Number
availabilityStatus  String  Enum: online | busy | offline
```

**PatientProfiles**
Extended data for users with the role `patient`. References `Users` via `userId`.

```
_id               ObjectId   Primary key
userId            ObjectId   FK → Users
dateOfBirth       Date
bloodType         String     Enum: A+, A-, B+, B-, AB+, AB-, O+, O-
allergies         [String]   Array of known allergens
emergencyContact  String     Name and phone number
```

**Appointments**
The central transactional collection. Links a patient to a doctor at a specific time.

```
_id          ObjectId   Primary key
patientId    ObjectId   FK → Users (role: patient)
doctorId     ObjectId   FK → Users (role: doctor)
scheduledAt  Date       Full datetime of the appointment
duration     Number     Duration in minutes
status       String     Enum: pending | confirmed | completed | cancelled
reason       String     Patient-provided reason for the visit
notes        String     Doctor-written post-visit notes (optional)
createdAt    Date
updatedAt    Date
```

**AvailabilitySlots**
Defines bookable time windows for each doctor. Generated from the doctor's weekly schedule settings.

```
_id          ObjectId   Primary key
doctorId     ObjectId   FK → Users (role: doctor)
dayOfWeek    String     Enum: monday | tuesday | ... | sunday
startTime    String     Format: HH:MM (24hr)
endTime      String     Format: HH:MM (24hr)
isBooked     Boolean    True when an appointment occupies this slot
appointmentId  ObjectId  FK → Appointments (null if not booked)
```

**Prescriptions**
Written by a doctor, associated with a specific appointment, and consumed by the patient.

```
_id            ObjectId   Primary key
patientId      ObjectId   FK → Users (role: patient)
doctorId       ObjectId   FK → Users (role: doctor)
appointmentId  ObjectId   FK → Appointments
drugName       String
dosage         String     e.g. 500mg
frequency      String     e.g. Twice daily
startDate      Date
endDate        Date
instructions   String     Additional directions (take with food, etc.)
refills        Number     Remaining refill count
createdAt      Date
```

**MedicalRecords**
The source of truth for the patient timeline. Every significant clinical event creates a record here.

```
_id           ObjectId   Primary key
patientId     ObjectId   FK → Users (role: patient)
doctorId      ObjectId   FK → Users (role: doctor)
type          String     Enum: visit | diagnosis | prescription | lab_result
title         String     Short event title shown on timeline
description   String     Full clinical notes
recordDate    Date       Date of the event (not necessarily createdAt)
attachmentUrl String     Optional file URL (lab report PDF, etc.)
relatedId     ObjectId   Optional FK to Appointments or Prescriptions
createdAt     Date
```

### Entity Relationship Summary

```
Users ──< DoctorProfiles        (one user has one doctor profile)
Users ──< PatientProfiles       (one user has one patient profile)
Users ──< Appointments          (one patient books many appointments)
Users ──< Appointments          (one doctor has many appointments)
Users ──< Prescriptions         (one patient receives many prescriptions)
Users ──< MedicalRecords        (one patient owns many records)
DoctorProfiles ──< AvailabilitySlots  (one doctor defines many slots)
Appointments ──< Prescriptions  (one appointment generates prescriptions)
```

---

## API Endpoints

All endpoints are prefixed with `/api`. All protected routes require a valid JWT in the Authorization header as `Bearer <token>`. Role-restricted endpoints return `403 Forbidden` if the authenticated user's role does not match.

### Auth

```
POST   /api/auth/register          Register a new patient account
POST   /api/auth/login             Authenticate and receive JWT
POST   /api/auth/logout            Invalidate session
GET    /api/auth/me                Return current authenticated user
```

### Appointments

```
GET    /api/appointments                    Get all appointments for the current user (role-aware)
POST   /api/appointments/book              Book a new appointment [Patient]
GET    /api/appointments/:id               Get single appointment details
PATCH  /api/appointments/:id/status        Update appointment status [Doctor]
DELETE /api/appointments/:id               Cancel appointment [Patient, within 24hr]
GET    /api/appointments/doctor/:doctorId  Get a doctor's schedule [Doctor, Admin]
```

### Doctors

```
GET    /api/doctors                        List all active doctors with filters
GET    /api/doctors/:id                    Get doctor profile and availability
GET    /api/doctors/:id/slots              Get available booking slots for a date
PATCH  /api/doctors/:id/availability       Update real-time status [Doctor]
PUT    /api/doctors/:id/schedule           Update weekly availability windows [Doctor]
```

### Patients

```
GET    /api/patients/:id/profile           Get patient profile [Patient, Doctor]
GET    /api/patients/:id/history           Get full medical timeline [Patient, Doctor]
GET    /api/patients/:id/prescriptions     Get all prescriptions [Patient, Doctor]
PUT    /api/patients/:id/profile           Update patient profile [Patient]
```

### Prescriptions

```
POST   /api/prescriptions                  Write a new prescription [Doctor]
GET    /api/prescriptions/:id              Get single prescription
GET    /api/prescriptions/patient/:id      Get all prescriptions for a patient
```

### Medical Records

```
GET    /api/records/patient/:id            Get timeline records for a patient
POST   /api/records                        Create a new medical record [Doctor]
GET    /api/records/:id                    Get single record detail
```

### Admin

```
GET    /api/admin/users                    List all users with filters [Admin]
POST   /api/admin/doctors                  Create a new doctor account [Admin]
PATCH  /api/admin/users/:id/status         Activate or deactivate a user [Admin]
GET    /api/admin/stats                    Get platform-wide statistics [Admin]
```

---

## Folder Structure

```
prodesk-capstone-VitalSync/
│
├── client/                          Next.js frontend application
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── patient/
│   │   │   ├── dashboard/
│   │   │   ├── appointments/
│   │   │   ├── history/
│   │   │   └── prescriptions/
│   │   ├── doctor/
│   │   │   ├── dashboard/
│   │   │   ├── schedule/
│   │   │   ├── patients/
│   │   │   └── availability/
│   │   └── admin/
│   │       ├── dashboard/
│   │       └── users/
│   ├── components/
│   │   ├── ui/                      shadcn/ui base components
│   │   ├── layout/                  Sidebar, Navbar, PageWrapper
│   │   ├── patient/                 Patient-specific components
│   │   ├── doctor/                  Doctor-specific components
│   │   └── shared/                  Timeline, StatusBadge, AvatarCircle
│   ├── lib/
│   │   ├── api.ts                   Axios instance with interceptors
│   │   ├── auth.ts                  NextAuth config
│   │   └── utils.ts                 Shared utility functions
│   ├── store/
│   │   ├── useAuthStore.ts          Zustand auth state
│   │   ├── useAppointmentStore.ts
│   │   └── useDoctorStore.ts
│   └── middleware.ts                Route protection by role
│
├── server/                          Express.js backend application
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── appointment.controller.js
│   │   ├── doctor.controller.js
│   │   ├── patient.controller.js
│   │   ├── prescription.controller.js
│   │   ├── record.controller.js
│   │   └── admin.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js       JWT verification
│   │   ├── role.middleware.js       Role-based route guards
│   │   └── validate.middleware.js   Joi schema validation
│   ├── models/
│   │   ├── User.model.js
│   │   ├── DoctorProfile.model.js
│   │   ├── PatientProfile.model.js
│   │   ├── Appointment.model.js
│   │   ├── AvailabilitySlot.model.js
│   │   ├── Prescription.model.js
│   │   └── MedicalRecord.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── appointment.routes.js
│   │   ├── doctor.routes.js
│   │   ├── patient.routes.js
│   │   ├── prescription.routes.js
│   │   ├── record.routes.js
│   │   └── admin.routes.js
│   ├── services/
│   │   ├── booking.service.js       Conflict detection logic
│   │   ├── slot.service.js          Slot generation from schedule
│   │   └── socket.service.js        Socket.io presence management
│   ├── config/
│   │   └── db.js                    MongoDB connection
│   └── index.js                     Express app entry point
│
├── docs/
│   ├── erd.png                      Entity relationship diagram
│   ├── architecture.png             System architecture diagram
│   └── screens/                     Exported Figma screen screenshots
│
├── .env.Example                     Environment variable template
├── .gitignore
└── README.md
```

---

## Environment Variables

Create a `.env.local` file in the `client/` directory and a `.env` file in the `server/` directory using the templates below.

**client/.env.local**

```
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

**server/.env**

```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/vitalsync
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

Never commit either `.env` file to version control. The `.env.example` files with placeholder values are committed instead.

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- A MongoDB Atlas account (free tier is sufficient)
- Git

### Installation

Clone the repository.

```bash
git clone https://github.com/<your-username>/prodesk-capstone-VitalSync.git
cd prodesk-capstone-VitalSync
```

Install server dependencies.

```bash
cd server
npm install
```

Install client dependencies.

```bash
cd ../client
npm install
```

Configure environment variables by copying the example files and filling in your values.

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env.local
```

### Running Locally

Start the backend server (runs on port 5000).

```bash
cd server
npm run dev
```

Start the frontend development server (runs on port 3000).

```bash
cd client
npm run dev
```

Open `http://localhost:3000` in your browser. You will be presented with the login screen and can register as a patient or use a seeded doctor account.

### Seeding the Database

A seed script is included to populate the database with sample doctors, patients, appointments, and medical records for demonstration purposes.

```bash
cd server
npm run seed
```

This creates three doctor accounts across different specialties, five patient accounts, a set of pre-existing appointments in various states, and a sample medical history timeline for each patient.

---

## Figma Designs

The complete UI wireframes for all five core screens are available in the Figma file linked below. The designs cover the Login page, Patient Dashboard, Appointment Booking Wizard, Doctor Dashboard, and Medical History Timeline.

**Figma File:** [View VitalSync UI Wireframes](https://figma.com/your-link-here)

Exported screen previews are also included in this repository under `docs/screens/`.

| Screen | Description |
|---|---|
| 01 — Login | Role-select card, email/password fields, sign-in flow |
| 02 — Patient Dashboard | Stat cards, available doctors, recent activity feed |
| 03 — Appointment Booking | 3-step wizard with calendar and slot picker |
| 04 — Doctor Dashboard | Daily schedule timeline, patient list, quick stats |
| 05 — Medical Timeline | Chronological event timeline with type filters |

---

## Deployment

The application is deployed across two platforms.

**Frontend** is deployed on Vercel. Every push to the `main` branch triggers an automatic deployment. The production URL is linked above.

**Backend** is deployed on Railway with the MongoDB database also hosted on Railway's managed MongoDB service. The backend API is accessible at the URL configured in the frontend's `NEXT_PUBLIC_API_URL` environment variable on Vercel.

### Production Environment

| Service | Platform | URL |
|---|---|---|
| Frontend (Next.js) | Vercel | https://vitalsync.vercel.app |
| Backend API (Express) | Railway | https://vitalsync-api.railway.app |
| Database (MongoDB) | Railway | Internal connection string |

---

## Future Scope

The following features are planned for the next development phase and are intentionally out of scope for this internship submission.

**Video consultation.** Integrating WebRTC or a service such as Daily.co to allow doctors and patients to conduct video appointments directly within the platform, replacing the need for an external tool.

**Notification system.** Email and in-app notifications for appointment confirmations, reminders 24 hours before a scheduled appointment, and prescription expiry warnings. Would use Nodemailer and a queue system such as BullMQ.

**Document uploads.** Allowing doctors to attach lab result PDFs and imaging reports directly to medical records, with secure file storage via AWS S3 or Cloudflare R2.

**Insurance and billing module.** A basic billing view that generates appointment invoices and tracks payment status, laying the foundation for insurance claim integration.

**Mobile application.** A React Native companion app for patients to receive push notifications and book appointments from a mobile device.

---

## License

This project was created as part of the ProDesk Internship Program. All rights reserved. Not licensed for commercial use or redistribution without permission.

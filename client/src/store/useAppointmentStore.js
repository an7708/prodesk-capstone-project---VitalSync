    import { create } from 'zustand';

    const useAppointmentStore = create((set) => ({
    appointments: [],
    selectedAppointment: null,
    loading: false,

    setAppointments: (appointments) => set({ appointments }),
    setSelectedAppointment: (appointment) => set({ selectedAppointment: appointment }),
    setLoading: (loading) => set({ loading }),

    addAppointment: (appointment) =>
        set((state) => ({ appointments: [appointment, ...state.appointments] })),

    updateAppointmentStatus: (id, status) =>
        set((state) => ({
        appointments: state.appointments.map((a) =>
            a._id === id ? { ...a, status } : a
        ),
        })),
    }));

    export default useAppointmentStore;
    import { create } from 'zustand';

    const useDoctorStore = create((set) => ({
    doctors: [],
    selectedDoctor: null,
    availableSlots: [],

    setDoctors: (doctors) => set({ doctors }),
    setSelectedDoctor: (doctor) => set({ selectedDoctor: doctor }),
    setAvailableSlots: (slots) => set({ availableSlots: slots }),

    updateDoctorStatus: (doctorId, status) =>
        set((state) => ({
        doctors: state.doctors.map((d) =>
            d._id === doctorId ? { ...d, availabilityStatus: status } : d
        ),
        })),
    }));

    export default useDoctorStore;
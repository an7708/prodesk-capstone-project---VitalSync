
    import { create } from 'zustand';
    import { persist } from 'zustand/middleware';

    const useAuthStore = create(
    persist(
        (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        _hasHydrated: false,

    login: (user, token) => {
            set({ user, token, isAuthenticated: true });
        },

        logout: () => {
            set({ user: null, token: null, isAuthenticated: false });
        },

        updateUser: (updatedUser) => {
            set({ user: updatedUser });
        },
        setHasHydrated: (state) => set({ _hasHydrated: state }),
        }),
        {
        name: 'vitalsync-auth', // single localStorage key, managed by persist
        // Only persist what we need — keeps storage lean
        partialize: (state) => ({
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
        }),
        onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
        },
        }
    )
    );

    export default useAuthStore;
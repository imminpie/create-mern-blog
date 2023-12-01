import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      snsToken: null,
      setLogin: (payload) => set({ user: payload.user, token: payload.token, snsToken: payload.snsToken }),
      setLogout: () => set({ user: null, token: null, snsToken: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      kakaoToken: null,
      setLogin: (payload) => set({ user: payload.user, token: payload.token, kakaoToken: payload.kakaoToken }),
      setLogout: () => set({ user: null, token: null, kakaoToken: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;

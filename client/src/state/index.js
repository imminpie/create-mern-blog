import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  token: null,
  setLogin: (payload) => set({ user: payload.user, token: payload.token }),
  setLogout: () => set({ user: null, token: null }),
}));

export default useStore;

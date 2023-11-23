import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  token: null,
  image: null,
  setLogin: (payload) => set({ user: payload.user, token: payload.token }),
  setLogout: () => set({ user: null, token: null }),
  setImage: (payload) => set({ image: payload }),
}));

export default useStore;

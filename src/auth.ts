import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: {
    name: string;
    avatar: string;
  } | null;
  login: (name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (name: string) => set({
        user: {
          name,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
        },
      }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
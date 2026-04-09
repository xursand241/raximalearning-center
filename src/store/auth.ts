import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'superadmin' | 'admin' | 'teacher' | 'student' | 'parent' | null;

interface User {
  id: string;
  name: string;
  role: Role;
  email?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  setLoading: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (userData) => set({ user: userData, isAuthenticated: true, isLoading: false }),
      logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
      setLoading: (status) => set({ isLoading: status }),
    }),
    {
      name: 'raxima-auth-storage',
    }
  )
);

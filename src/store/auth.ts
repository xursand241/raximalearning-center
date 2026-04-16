import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

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
  session: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  setSession: (session: any) => void;
  setLoading: (status: boolean) => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: true,
      
      login: (userData) => set({ user: userData, isAuthenticated: true, isLoading: false }),
      
      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null, isAuthenticated: false, isLoading: false });
      },
      
      setSession: (session) => set({ session, isAuthenticated: !!session }),
      
      setLoading: (status) => set({ isLoading: status }),
      
      initialize: async () => {
        set({ isLoading: true });
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          set({ session, isAuthenticated: true });
          // Fetch profile if needed, but for now we'll keep the persisted user if available
          // In a real app, we'd fetch the latest profile from 'profiles' table here
        }
        
        set({ isLoading: false });
      }
    }),
    {
      name: 'raxima-auth-storage',
      partialize: (state) => ({ user: state.user }), // Only persist user info
    }
  )
);

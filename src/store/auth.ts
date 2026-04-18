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
        try {
          await supabase.auth.signOut();
        } catch (err) {
          console.error("Supabase signout failed", err);
        }
        set({ user: null, session: null, isAuthenticated: false, isLoading: false });
        localStorage.removeItem('raxima-auth-storage');
      },
      
      setSession: (session) => set({ session, isAuthenticated: !!session }),
      
      setLoading: (status) => set({ isLoading: status }),
      
      initialize: async () => {
        set({ isLoading: true });
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session) {
            // Fetch latest profile
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile && !error) {
              set({ 
                session, 
                isAuthenticated: true,
                user: {
                  id: profile.id,
                  name: `${profile.first_name} ${profile.last_name}`,
                  role: profile.role,
                  email: session.user.email
                }
              });
            } else {
              set({ session, isAuthenticated: true });
            }
          } else {
            set({ session: null, isAuthenticated: false, user: null });
          }
        } catch (err) {
          console.error("Initialize auth error:", err);
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'raxima-auth-storage',
      partialize: (state) => ({ user: state.user }), // Only persist user info
    }
  )
);

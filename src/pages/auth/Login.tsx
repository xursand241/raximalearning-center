import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.user) {
        // Fetch profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) throw profileError;

        login({
          id: profile.id,
          name: `${profile.first_name} ${profile.last_name}`,
          role: profile.role,
          email: data.user.email
        });

        // Redirect based on role
        if (profile.role === 'admin' || profile.role === 'superadmin') {
          navigate('/admin/dashboard');
        } else if (profile.role === 'teacher') {
          navigate('/teacher/dashboard');
        } else if (profile.role === 'student') {
          navigate('/student/dashboard');
        } else if (profile.role === 'parent') {
          navigate('/parent/dashboard');
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      let message = 'Kirishda xatolik yuz berdi. Iltimos, ma\'lumotlarni tekshiring.';
      
      if (err.code === 'PGRST116') {
        message = 'Foydalanuvchi profili topilmadi. Iltimos, ma\'muriyatga murojaat qiling.';
      } else if (err.message) {
        message = err.message;
      }
      
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b0e14] p-4 relative overflow-hidden font-sans">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-slate-200/[0.05] bg-[bottom_1px_center] dark:bg-grid-slate-900/[0.05]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#0b0e14] to-transparent"></div>
      
      {/* Login Card */}
      <div className="p-10 border border-slate-200/60 dark:border-white/5 bg-white/80 dark:bg-card/80 backdrop-blur-3xl rounded-[32px] shadow-[0_32px_64px_rgba(0,0,0,0.1)] w-full max-w-[460px] z-10 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"></div>
        
        <div className="flex flex-col items-center mb-10">
           <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-[0_8px_24px_rgba(79,70,229,0.3)] mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
             <span className="text-white font-black text-3xl leading-none">R</span>
           </div>
           <h1 className="text-3xl font-black tracking-tight text-center text-slate-900 dark:text-white leading-tight uppercase">RAXIMA ACADEMY</h1>
           <p className="text-[15px] font-semibold text-center text-slate-400 mt-2">Boshqaruv portaliga kirish</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-600 dark:text-rose-400 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-bold leading-tight">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
           <div className="space-y-2">
              <label className="text-[12px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email manzili</label>
              <div className="relative group/input">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-indigo-500 transition-colors" />
                 <input 
                    type="email" 
                    required
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-2xl py-4 pl-12 pr-4 text-[15px] font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-900 dark:text-white"
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[12px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Parol</label>
              <div className="relative group/input">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-indigo-500 transition-colors" />
                 <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-2xl py-4 pl-12 pr-12 text-[15px] font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-900 dark:text-white"
                 />
                 <button 
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
                 >
                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                 </button>
              </div>
           </div>

           <div className="flex justify-end">
              <button type="button" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Parolni unutdingizmi?</button>
           </div>

           <button 
             type="submit" 
             disabled={isLoading}
             className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-black text-[15px] transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] border border-transparent flex items-center justify-center gap-2 group/btn disabled:opacity-70 disabled:cursor-not-allowed mt-2"
           >
             {isLoading ? (
               <Loader2 className="w-5 h-5 animate-spin" />
             ) : (
               <>
                 TIZIMGA KIRISH
                 <div className="w-5 h-5 rounded-full bg-white/20 dark:bg-slate-900/10 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                   <Loader2 className="w-3.5 h-3.5 opacity-0 group-hover/btn:opacity-100" />
                 </div>
               </>
             )}
           </button>
        </form>

        <div className="mt-8 text-center text-sm font-bold">
           <span className="text-gray-400">Akkauntingiz yo'qmi? </span>
           <Link to="/auth/register" className="text-indigo-600 hover:underline">Ro'yxatdan o'tish</Link>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 text-center">
           <p className="text-[12px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">RAXIMA HUB v2.0 • 2026</p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, User, Loader2, AlertCircle, Eye, EyeOff, UserCircle } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'teacher' | 'student' | 'parent'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Sign up user via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create profile in SQL table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              first_name: firstName,
              last_name: lastName,
              role: role,
              is_active: true
            }
          ]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw new Error(`Profiling xatosi: ${profileError.message || 'Noma\'lum xato'}`);
        }

        // Success!
        alert('Ro\'yxatdan o\'tish muvaffaqiyatli! Endi login qilishingiz mumkin.');
        navigate('/auth/login');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b0e14] p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-grid-slate-200/[0.05] bg-[bottom_1px_center] dark:bg-grid-slate-900/[0.05]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#0b0e14] to-transparent"></div>
      
      <div className="p-10 border border-slate-200/60 dark:border-white/5 bg-white/80 dark:bg-card/80 backdrop-blur-3xl rounded-[32px] shadow-[0_32px_64px_rgba(0,0,0,0.1)] w-full max-w-[500px] z-10 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"></div>
        
        <div className="flex flex-col items-center mb-8">
           <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center shadow-[0_8px_24px_rgba(124,58,237,0.3)] mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
             <span className="text-white font-black text-3xl leading-none">R</span>
           </div>
           <h1 className="text-3xl font-black tracking-tight text-center text-slate-900 dark:text-white leading-tight uppercase">RO'YXATDAN O'TISH</h1>
           <p className="text-[14px] font-semibold text-center text-slate-400 mt-2">Yangi hisob yaratish</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-600 dark:text-rose-400 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-bold leading-tight">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                 <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Ism</label>
                 <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                       type="text" required placeholder="Ali"
                       value={firstName} onChange={(e) => setFirstName(e.target.value)}
                       className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-2xl py-3.5 pl-11 pr-4 text-[14px] font-bold focus:ring-2 focus:ring-violet-500 outline-none text-slate-900 dark:text-white"
                    />
                 </div>
              </div>
              <div className="space-y-1.5">
                 <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Familiya</label>
                 <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                       type="text" required placeholder="Valiyev"
                       value={lastName} onChange={(e) => setLastName(e.target.value)}
                       className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-2xl py-3.5 pl-11 pr-4 text-[14px] font-bold focus:ring-2 focus:ring-violet-500 outline-none text-slate-900 dark:text-white"
                    />
                 </div>
              </div>
           </div>

           <div className="space-y-1.5">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input 
                    type="email" required placeholder="email@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-2xl py-3.5 pl-11 pr-4 text-[14px] font-bold focus:ring-2 focus:ring-violet-500 outline-none text-slate-900 dark:text-white"
                 />
              </div>
           </div>

           <div className="space-y-1.5">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Parol</label>
              <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input 
                    type={showPassword ? "text" : "password"} required placeholder="••••••••"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-2xl py-3.5 pl-11 pr-11 text-[14px] font-bold focus:ring-2 focus:ring-violet-500 outline-none text-slate-900 dark:text-white"
                 />
                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-500">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                 </button>
              </div>
           </div>

           <div className="space-y-1.5">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Foydalanuvchi roli</label>
              <div className="relative">
                 <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-2xl py-3.5 pl-11 pr-10 text-[14px] font-bold focus:ring-2 focus:ring-violet-500 outline-none text-slate-900 dark:text-white appearance-none"
                 >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="parent">Parent</option>
                    <option value="admin">Admin</option>
                 </select>
              </div>
           </div>

           <button 
             type="submit" disabled={isLoading}
             className="w-full bg-violet-600 text-white py-4 rounded-2xl font-black text-[15px] transition-all shadow-lg hover:shadow-violet-500/20 active:scale-[0.98] flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
           >
             {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "RO'YXATDAN O'TISH"}
           </button>
        </form>

        <div className="mt-8 text-center text-sm font-bold">
           <span className="text-gray-400">Akkauntingiz bormi? </span>
           <Link to="/auth/login" className="text-violet-600 hover:underline">Kirish</Link>
        </div>
      </div>
    </div>
  );
}

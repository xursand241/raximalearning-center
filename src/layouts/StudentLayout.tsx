import { useState } from "react";
import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { 
  BookOpen, Clock, FileText, CreditCard, 
  Bell, UserCircle, LogOut, CheckCircle,
  Search, Menu, X, ChevronRight, LayoutDashboard,
  Award, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";

const sidebarLinks = [
  { name: "Mening panelim", path: "/student/dashboard", icon: LayoutDashboard },
  { name: "Kurslar & Baholar", path: "/student/courses", icon: BookOpen },
  { name: "Davomat", path: "/student/attendance", icon: Clock },
  { name: "Imtihonlar", path: "/student/exams", icon: CheckCircle },
  { name: "To'lovlar", path: "/student/payments", icon: CreditCard },
];

export default function StudentLayout() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Dynamic blocking based on profile role/status metadata could be implemented here
  const isPaymentBlocked = user?.role === 'student' && (user as any).is_blocked === true; 

  const isStudent = user?.role === "student" || user?.role === "superadmin";

  if (!isAuthenticated || !isStudent) {
    return <Navigate to="/auth/login" />;
  }

  if (isPaymentBlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-background p-4 font-sans">
        <div className="max-w-md w-full bg-white dark:bg-card p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 text-center space-y-6 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-rose-500"></div>
           <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
             <CreditCard className="w-10 h-10" />
           </div>
           <h2 className="text-3xl font-black tracking-tight text-slate-900">Kirish cheklangan</h2>
           <p className="text-slate-500 font-medium leading-relaxed">Sizning hisobingiz to'lov muddati o'tganligi sababli vaqtincha cheklangan. Kurslar va imtihonlarga qaytish uchun balansni to'ldiring.</p>
           <div className="pt-4 space-y-3">
             <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98]">Hozir to'lash</button>
             <button className="w-full text-sm font-bold text-slate-400 hover:text-slate-600 py-2">Qo'llab-quvvatlash xizmati</button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] dark:bg-[#0b0e14] overflow-hidden font-sans">
      
      {/* Sidebar - Clean Emerald Professional */}
      <aside className={cn(
        "h-full bg-white dark:bg-[#111827] border-r border-slate-100 dark:border-white/5 flex flex-col relative z-20 transition-all duration-300",
        isSidebarOpen ? "w-[280px]" : "w-[80px]"
      )}>
        
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 shrink-0 border-b border-slate-50 dark:border-white/5">
          <div className={cn("flex items-center gap-3 overflow-hidden transition-all duration-300", isSidebarOpen ? "opacity-100" : "opacity-0 w-0")}>
             <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-[0_4px_12px_rgba(16,185,129,0.25)]">
               <Zap className="w-5 h-5 text-white" fill="currentColor" />
             </div>
             <div className="flex flex-col leading-tight whitespace-nowrap">
               <span className="font-black text-slate-900 dark:text-white text-[16px] tracking-wide uppercase">Student</span>
               <span className="font-extrabold text-emerald-500 text-[14px] tracking-tight italic">LIFE</span>
             </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400"
          >
            {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-8 scrollbar-none">
          <nav className="flex flex-col gap-1.5">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname.includes(link.path);
              const Icon = link.icon;
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-[14.5px] font-bold transition-all duration-300 group relative",
                    isActive 
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" 
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                  )}
                >
                  <Icon className={cn("w-[20px] h-[20px] transition-transform group-hover:scale-110", isActive ? "text-emerald-500" : "text-slate-400 group-hover:text-emerald-500")} strokeWidth={2.4} />
                  {isSidebarOpen && (
                    <span className="flex-1 whitespace-nowrap">
                      {link.name}
                    </span>
                  )}
                  {isActive && isSidebarOpen && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profile / Bottom Section */}
        <div className="p-4 mt-auto border-t border-slate-50 dark:border-white/5">
           <div className={cn(
             "bg-slate-50 dark:bg-white/5 rounded-2xl p-3 flex items-center gap-3 border border-slate-100 dark:border-white/5 transition-all duration-300",
             isSidebarOpen ? "justify-start" : "justify-center"
           )}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center font-bold text-white relative shrink-0">
                {user?.name?.[0] || "T"}
              </div>
              {isSidebarOpen && (
                <div className="flex flex-col min-w-0">
                   <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">{user?.name || "O'quvchi"}</span>
                   <div className="flex items-center gap-1 mt-0.5">
                      <Award className="w-[10px] h-[10px] text-emerald-500" />
                      <span className="text-[10px] font-extrabold text-emerald-500 tracking-wider uppercase">Active</span>
                   </div>
                </div>
              )}
           </div>
           
           <button 
             onClick={logout}
             className={cn(
               "flex items-center gap-3 w-full mt-3 py-3 rounded-xl text-[13px] font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all",
               isSidebarOpen ? "px-3" : "justify-center"
             )}
           >
             <LogOut className="w-5 h-5" strokeWidth={2.5} />
             {isSidebarOpen && <span>CHIQISH</span>}
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Modern Header */}
        <header className="h-20 bg-white/70 dark:bg-[#0b0e14]/70 backdrop-blur-md flex items-center justify-between px-10 shrink-0 z-10 border-b border-slate-100 dark:border-white/5 sticky top-0">
           <div className="flex-1">
              <h2 className="text-[18px] font-black tracking-tight text-slate-900 dark:text-white">
                Xush kelibsiz, <span className="text-emerald-500">{user?.name?.split(' ')[0] || "O'quvchi"}!</span> 👋
              </h2>
           </div>

           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                 <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-all relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0b0e14]"></span>
                 </button>
              </div>

              <div className="h-8 w-px bg-slate-100 dark:bg-white/10"></div>

              <div className="flex items-center gap-3">
                 <div className="flex flex-col items-end">
                    <span className="text-[11px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">Kurs yakuni</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">12-may, 2026</span>
                 </div>
                 <div className="w-10 h-10 rounded-full border-[3px] border-emerald-500/20 flex items-center justify-center p-1">
                    <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-black text-white">75%</div>
                 </div>
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 scrollbar-thin scrollbar-thumb-slate-200 relative bg-[#f8fafc] dark:bg-[#0b0e14]">
          <div className="max-w-6xl mx-auto">
             <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

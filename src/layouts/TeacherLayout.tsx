import { useState } from "react";
import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, BookOpen, Clock, 
  MessageSquare, UserCircle, LogOut, Bell,
  Search, Settings, Menu, X, ChevronRight, GraduationCap,
  ClipboardCheck, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";

const sidebarLinks = [
  { name: "Asosiy sahifa", path: "/teacher/dashboard", icon: LayoutDashboard },
  { name: "Davomat", path: "/teacher/attendance", icon: ClipboardCheck },
  { name: "Vazifalar & Testlar", path: "/teacher/assessments", icon: BookOpen },
  { name: "O'quvchilar natijalari", path: "/teacher/progress", icon: BarChart3 },
  { name: "Xabarlar", path: "/teacher/messages", icon: MessageSquare },
];

export default function TeacherLayout() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isTeacher = user?.role === "teacher" || true; // Dev fallback

  if (!isAuthenticated && !isTeacher) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] dark:bg-[#0b0e14] overflow-hidden font-sans">
      
      {/* Sidebar - Indigo/Deep Dark Premium Aesthetic */}
      <aside className={cn(
        "h-full bg-[#0f172a] text-slate-300 flex flex-col relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.1)] transition-all duration-300",
        isSidebarOpen ? "w-[280px]" : "w-[80px]"
      )}>
        
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 shrink-0 border-b border-white/5">
          <div className={cn("flex items-center gap-3 overflow-hidden transition-all duration-300", isSidebarOpen ? "opacity-100" : "opacity-0 w-0")}>
             <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.3)]">
               <GraduationCap className="w-5 h-5 text-white" />
             </div>
             <div className="flex flex-col leading-tight whitespace-nowrap">
               <span className="font-black text-white text-[16px] tracking-wide uppercase">Teacher</span>
               <span className="font-extrabold text-primary text-[14px] tracking-tight">PORTAL</span>
             </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-slate-400"
          >
            {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-8 scrollbar-none">
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname.includes(link.path);
              const Icon = link.icon;
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-[14.5px] font-semibold transition-all duration-300 group relative",
                    isActive 
                      ? "bg-primary text-white shadow-[0_4px_12px_rgba(79,70,229,0.3)]" 
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                  )}
                >
                  <Icon className={cn("w-[20px] h-[20px] transition-transform duration-300 group-hover:scale-110", isActive ? "text-white" : "text-slate-500 group-hover:text-indigo-400")} strokeWidth={2.2} />
                  {isSidebarOpen && (
                    <span className="flex-1 whitespace-nowrap transition-all duration-300">
                      {link.name}
                    </span>
                  )}
                  {isActive && isSidebarOpen && (
                    <ChevronRight className="w-4 h-4 text-white opacity-50" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profile / Bottom Section */}
        <div className="p-4 mt-auto border-t border-white/5">
           <div className={cn(
             "bg-indigo-950/30 rounded-2xl p-3 flex items-center gap-3 border border-white/5 transition-all duration-300",
             isSidebarOpen ? "justify-start" : "justify-center"
           )}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white relative shrink-0">
                {user?.name?.[0] || "O"}
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0f172a]"></span>
              </div>
              {isSidebarOpen && (
                <div className="flex flex-col min-w-0">
                   <span className="text-sm font-bold text-white leading-tight truncate">{user?.name || "O'qituvchi"}</span>
                   <span className="text-[10px] font-extrabold text-indigo-400 tracking-wider uppercase mt-0.5">Teacher</span>
                </div>
              )}
           </div>
           
           <button 
             onClick={logout}
             className={cn(
               "flex items-center gap-3 w-full mt-3 py-3 rounded-xl text-[13px] font-bold text-rose-400 hover:bg-rose-500/10 transition-all group",
               isSidebarOpen ? "px-3" : "justify-center"
             )}
           >
             <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
             {isSidebarOpen && <span>CHIQISH</span>}
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Modern Header */}
        <header className="h-20 bg-white/80 dark:bg-[#0b0e14]/80 backdrop-blur-md flex items-center justify-between px-10 shrink-0 z-10 border-b border-slate-100 dark:border-white/5 sticky top-0">
           <div className="flex-1 max-w-xl">
              <div className="relative group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                 <input 
                   type="text" 
                   placeholder="O'quvchi yoki xabarlarni qidirish..." 
                   className="w-full bg-slate-100/50 dark:bg-white/5 border border-transparent focus:border-indigo-500/30 focus:bg-white dark:focus:bg-card rounded-2xl py-2.5 pl-11 pr-4 text-sm font-medium transition-all outline-none"
                 />
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                 <button className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-500 hover:text-indigo-500 transition-all relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white dark:border-[#0b0e14]"></span>
                 </button>
              </div>

              <div className="h-8 w-px bg-slate-200 dark:bg-white/10"></div>

              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-xs font-bold text-slate-500 tracking-wide uppercase">Sinf Online</span>
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 relative bg-[#f8fafc] dark:bg-[#0b0e14]">
          <div className="max-w-6xl mx-auto">
             <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

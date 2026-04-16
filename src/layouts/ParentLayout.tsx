import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, CreditCard, 
  MessageSquare, Bell, LogOut, ChevronRight,
  ShieldCheck, Search, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const parentNavItems = [
  { name: "Asosiy sahifa", path: "/parent/dashboard", icon: LayoutDashboard },
  { name: "To'lovlar", path: "/parent/payments", icon: CreditCard },
  { name: "Xabarlar", path: "/parent/messages", icon: MessageSquare },
  { name: "Sozlamalar", path: "/parent/settings", icon: Settings },
];

export default function ParentLayout() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated || user?.role !== 'parent') {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] dark:bg-[#0b0e14] overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className="w-[280px] h-full bg-[#141724] text-slate-300 flex flex-col relative z-20 shadow-xl">
        <div className="h-20 flex items-center px-6 shrink-0 border-b border-white/5">
           <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/20 mr-3">
             <Users className="w-5 h-5 text-white" />
           </div>
           <div className="flex flex-col">
             <span className="font-black text-white text-[16px] tracking-wide">RAXIMA</span>
             <span className="font-extrabold text-violet-400 text-[14px]">FAMILY</span>
           </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {parentNavItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[14.5px] font-bold transition-all group",
                  isActive 
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500 group-hover:text-violet-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
           <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center font-bold text-violet-400">
                {user?.name?.[0] || 'O'}
              </div>
              <div className="flex flex-col overflow-hidden">
                 <span className="text-sm font-bold text-white truncate">{user?.name || "Ota-ona"}</span>
                 <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Parent Account</span>
              </div>
           </div>
           <button 
             onClick={logout}
             className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black text-rose-400 hover:bg-rose-500/10 transition-all"
           >
             <LogOut className="w-4 h-4" /> CHIQISH
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-20 bg-white/50 dark:bg-[#0b0e14]/50 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-10">
           <div className="flex-1 max-w-md relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Ma'lumotlarni qidirish..." 
                className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-violet-500 transition-all outline-none"
              />
           </div>
           <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-violet-500 transition-all relative border border-slate-100 dark:border-white/5">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 bg-[#f8fafc] dark:bg-[#0b0e14]">
          <div className="max-w-6xl mx-auto">
             <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

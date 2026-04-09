import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, BookOpen, Clock, 
  MessageSquare, UserCircle, LogOut, Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "My Classes", path: "/teacher/dashboard", icon: LayoutDashboard },
  { name: "Attendance", path: "/teacher/attendance", icon: Clock },
  { name: "Homework & Tests", path: "/teacher/assessments", icon: BookOpen },
  { name: "Student Progress", path: "/teacher/progress", icon: Users },
  { name: "Messages", path: "/teacher/messages", icon: MessageSquare },
];

export default function TeacherLayout() {
  const location = useLocation();
  const isAuthenticated = true;
  const role = "teacher";

  if (!isAuthenticated || role !== "teacher") {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="flex h-screen w-full bg-[#FCFCFD] dark:bg-background overflow-hidden relative">
      <aside className="w-[260px] h-full bg-[#111827] text-white flex flex-col transition-all z-20">
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-inner">
               <span className="text-white font-bold text-xl leading-none">R</span>
             </div>
             <span className="font-bold text-[17px] tracking-tight">TEACHER PRO</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-8 scrollbar-none">
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname.includes(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-200 group",
                    isActive 
                      ? "bg-indigo-600/20 text-indigo-400" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-indigo-400" : "text-gray-500 group-hover:text-gray-300")} strokeWidth={isActive ? 2.5 : 2} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 shrink-0">
           <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
             <UserCircle className="w-5 h-5" />
             My Profile
           </button>
           <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors mt-1">
             <LogOut className="w-5 h-5" />
             Sign Out
           </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 bg-white/70 dark:bg-card/70 backdrop-blur-md border-b border-border/40 flex items-center justify-end px-8 shrink-0 z-10 sticky top-0 shadow-sm">
           <div className="flex items-center gap-4">
              <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-white dark:border-card"></span>
              </button>
              <div className="h-6 w-[1px] bg-border/50 mx-2"></div>
              <div className="flex items-center gap-3 cursor-pointer">
                 <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold leading-none text-gray-900">Sarah Jenkins</span>
                    <span className="text-[11px] text-gray-500 font-medium mt-1">English Dept.</span>
                 </div>
                 <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-400 border-[2px] border-white shadow-sm"></div>
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gray-200 relative">
          <div className="max-w-6xl mx-auto">
             <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

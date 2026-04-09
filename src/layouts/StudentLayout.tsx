import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { 
  BookOpen, Clock, FileText, CreditCard, 
  Bell, UserCircle, LogOut, CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "My Dashboard", path: "/student/dashboard", icon: BookOpen },
  { name: "Courses & Grades", path: "/student/courses", icon: FileText },
  { name: "Attendance", path: "/student/attendance", icon: Clock },
  { name: "Exams & Results", path: "/student/exams", icon: CheckCircle },
  { name: "Payments", path: "/student/payments", icon: CreditCard },
];

export default function StudentLayout() {
  const location = useLocation();
  const isAuthenticated = true;
  const role = "student";
  const isPaymentBlocked = false; // Simulate payment block status

  if (!isAuthenticated || role !== "student") {
    return <Navigate to="/auth/login" />;
  }

  if (isPaymentBlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background p-4">
        <div className="max-w-md w-full bg-white dark:bg-card p-8 rounded-2xl shadow-sm border text-center space-y-4">
           <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
             <CreditCard className="w-8 h-8" />
           </div>
           <h2 className="text-2xl font-bold tracking-tight">Access Blocked</h2>
           <p className="text-muted-foreground">Your account has been temporarily restricted due to an overdue payment. Please settle your balance to resume access to your courses and exams.</p>
           <button className="mt-4 w-full bg-primary text-primary-foreground font-medium py-2.5 rounded-lg">Pay Now</button>
           <button className="w-full text-sm text-gray-500 hover:text-gray-900 py-2">Contact Support</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-50/50 dark:bg-background overflow-hidden relative">
      <aside className="w-[260px] h-full bg-white dark:bg-card border-r border-border/40 flex flex-col transition-all z-20">
        <div className="h-16 flex items-center px-6 border-b border-border/40 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-inner">
               <span className="text-white font-bold text-xl leading-none">R</span>
             </div>
             <span className="font-bold text-[17px] tracking-tight">STUDENT</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-none">
          <nav className="flex flex-col gap-1.5">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname.includes(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-200 group relative overflow-hidden",
                    isActive 
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-accent"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-emerald-500" : "text-gray-400 group-hover:text-gray-500")} strokeWidth={isActive ? 2.5 : 2} />
                  {link.name}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-border/40 shrink-0">
           <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-accent rounded-lg transition-colors">
             <UserCircle className="w-5 h-5" />
             My Profile
           </button>
           <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors mt-1">
             <LogOut className="w-5 h-5" />
             Sign Out
           </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 bg-white/70 dark:bg-card/70 backdrop-blur-md border-b border-border/40 flex items-center justify-end px-8 shrink-0 z-10 sticky top-0 shadow-sm">
           <div className="flex items-center gap-4">
              <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="h-6 w-[1px] bg-border/50 mx-2"></div>
              <div className="flex items-center gap-3 cursor-pointer">
                 <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold leading-none">Timur Azizov</span>
                    <span className="text-[11px] text-emerald-600 font-medium mt-1">Student</span>
                 </div>
                 <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 border-[2px] border-white shadow-sm flex items-center justify-center font-bold text-white text-xs">TA</div>
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gray-200 relative">
          <div className="max-w-5xl mx-auto">
             <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

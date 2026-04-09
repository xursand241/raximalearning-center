import { useState } from "react";
import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Bell, Users, ChevronDown, ChevronRight, 
  BookOpen, Layers, CreditCard, Calendar, Clock, 
  PieChart, MessageSquare, Settings, LogOut, X, 
  ShieldCheck, Link as LinkIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sidebar Navigation config matching the exact screenshot structure
const navItems = [
  { name: "Asosiy sahifa", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Bog'lanishlar", path: "/admin/relations", icon: LinkIcon },
  { 
    name: "Foydalanuvchilar", 
    icon: Users,
    subItems: [
      { name: "O'quvchilar", path: "/admin/students" },
      { name: "O'qituvchilar", path: "/admin/teachers" },
      { name: "Ota-onalar", path: "/admin/parents" },
    ]
  },
  { name: "Guruhlar", path: "/admin/groups", icon: Users }, // Replace with a group-specific icon
  { name: "Fanlar", path: "/admin/subjects", icon: BookOpen },
  { name: "Moliya", path: "/admin/payments", icon: CreditCard },
  { name: "Dars jadvali", path: "/admin/schedule", icon: Calendar },
  { name: "Davomat", path: "/admin/attendance", icon: Clock },
  { name: "Baholar", path: "/admin/grades", icon: PieChart },
  { name: "SMS Markaz", path: "/admin/sms", icon: MessageSquare },
  { name: "Sozlamalar", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const isAuthenticated = true;
  const role = "admin";

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    "Foydalanuvchilar": true, // Kept open by default to match screenshot
  });

  if (!isAuthenticated || role !== "admin") {
    return <Navigate to="/auth/login" />;
  }

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="flex h-screen w-full bg-[#f4f7f6] dark:bg-[#0f111a] overflow-hidden font-sans">
      
      {/* Sidebar - Precision matching the premium deep-dark aesthetic */}
      <aside className="w-[280px] h-full bg-[#141724] text-slate-300 flex flex-col relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.1)]">
        
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 shrink-0 relative">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-[12px] bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)]">
               <BookOpen className="w-5 h-5 text-white" />
             </div>
             <div className="flex flex-col leading-tight">
               <span className="font-black text-white text-[16px] tracking-wide">RAXIMA</span>
               <span className="font-extrabold text-[#7c92ff] text-[15px] italic tracking-tight">ACADEMY</span>
             </div>
          </div>
          <button className="w-8 h-8 rounded-md bg-[#1f2334] flex items-center justify-center hover:bg-[#2a2f45] transition-colors text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-none">
          <nav className="flex flex-col gap-[2px]">
            {navItems.map((item) => {
              const Icon = item.icon;
              
              if (item.subItems) {
                const isSubActive = item.subItems.some(sub => location.pathname.includes(sub.path));
                const isExpanded = expandedMenus[item.name];
                
                return (
                  <div key={item.name} className="flex flex-col mb-1">
                    <button 
                      onClick={() => toggleMenu(item.name)}
                      className={cn(
                        "flex items-center justify-between px-3 py-[10px] rounded-[10px] text-[14.5px] font-semibold transition-all duration-200 group w-full",
                        isSubActive ? "text-white" : "text-slate-400 hover:text-slate-200 hover:bg-[#1a1e2f]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-[18px] h-[18px]" strokeWidth={2.2} />
                        {item.name}
                      </div>
                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isExpanded ? "rotate-180 text-white" : "text-slate-500")} />
                    </button>
                    
                    {/* Nested Items */}
                    <div className={cn("flex flex-col gap-1 overflow-hidden transition-all duration-300", isExpanded ? "max-h-[200px] mt-1" : "max-h-0")}>
                      {item.subItems.map((subItem) => {
                        const isActive = location.pathname.includes(subItem.path);
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={cn(
                              "flex items-center gap-3 pl-11 pr-3 py-[8px] rounded-[10px] text-[14px] font-medium transition-all duration-200 relative",
                              isActive 
                                ? "bg-[#1a1e2f]/50 text-white" 
                                : "text-slate-400 hover:text-slate-200"
                            )}
                          >
                            <span className={cn("w-[5px] h-[5px] rounded-full", isActive ? "bg-[#5b6ef7] shadow-[0_0_8px_#5b6ef7]" : "bg-slate-600")} />
                            {subItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              const isActive = location.pathname.includes(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-[11px] rounded-[10px] text-[14.5px] font-semibold transition-all duration-200 group relative mb-1",
                    isActive 
                      ? "bg-[#3e4cf1] text-white shadow-[0_4px_12px_rgba(62,76,241,0.3)] border border-[#5262f5]/30" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-[#1a1e2f]"
                  )}
                >
                  <Icon className={cn("w-[18px] h-[18px]", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200")} strokeWidth={2.2} />
                  {item.name}
                  {isActive && (
                    <div className="absolute right-3">
                      <span className="text-[#a2aeff]">✨</span> {/* Decorative sparkle mimicking the UI */}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profile / Bottom Section */}
        <div className="p-4 mt-auto border-t border-white/[0.04]">
           <div className="bg-[#181b2a] rounded-xl p-3 flex items-center justify-between border border-white/[0.02]">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-lg bg-[#24283b] flex items-center justify-center font-bold text-white relative">
                   T
                   <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#00d084] rounded-full border-2 border-[#181b2a]"></span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-sm font-bold text-white leading-tight">Raxima Academy</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-[10px] h-[10px] text-[#4dccff]" />
                      <span className="text-[10px] font-extrabold text-[#4dccff] tracking-wider uppercase">Owner</span>
                    </div>
                 </div>
              </div>
           </div>
           
           <button className="flex items-center justify-center gap-2 w-full mt-3 py-[10px] rounded-xl text-[13px] font-bold text-[#ff6b6b] hover:bg-[#ff6b6b]/10 transition-colors">
             <LogOut className="w-[15px] h-[15px]" strokeWidth={2.5} />
             CHIQISH
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-white dark:bg-[#0b0e14]">
        {/* We can place a modern Header here for the Admin workspace */}
        <header className="h-20 bg-white/80 dark:bg-[#0b0e14]/80 backdrop-blur-md flex items-center justify-end px-10 shrink-0 z-10 border-b border-gray-100 dark:border-white/5">
           <div className="flex items-center gap-6">
              {/* Add global actions here if needed */}
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Tizim Online</span>
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
          <div className="mx-auto max-w-7xl">
             <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

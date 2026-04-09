import { Users, CreditCard, UserPlus, TrendingUp, TrendingDown, Clock, MoveUpRight, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardOverview() {
  const stats = [
    { label: "Jami O'quvchilar", value: "1,248", trend: "+12%", trendUp: true, icon: Users, color: "from-blue-500 to-blue-600" },
    { label: "Bu Oydagi Tushum", value: "$42,500", trend: "+8.2%", trendUp: true, icon: CreditCard, color: "from-emerald-400 to-emerald-500" },
    { label: "Yangi O'quvchilar", value: "84", trend: "-2%", trendUp: false, icon: UserPlus, color: "from-indigo-500 to-indigo-600" },
    { label: "Qarzdorliklar", value: "$3,240", trend: "+1.5%", trendUp: false, icon: Clock, color: "from-rose-400 to-rose-500" },
  ];

  const recentTransactions = [
    { id: 1, name: "Azizov Timur", type: "Naqd pul", amount: "$150", status: "Tasdiqlangan", date: "Bugun, 10:45" },
    { id: 2, name: "Malikova Iroda", type: "Payme", amount: "$150", status: "Kutilmoqda", date: "Bugun, 09:30" },
    { id: 3, name: "Rahimov Sardor", type: "Click", amount: "$75", status: "Tasdiqlangan", date: "Kecha, 18:20" },
    { id: 4, name: "Usmonova Laylo", type: "Naqd pul", amount: "$150", status: "Rad etilgan", date: "Kecha, 14:15" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 space-y-8">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Xush kelibsiz, Raxima Academy</h1>
           <p className="text-gray-500 dark:text-gray-400 font-medium text-[15px] mt-1">Bugun platformada nimalar sodir bo'lyapti?</p>
        </div>
        <div className="flex bg-white dark:bg-[#141724] p-1.5 rounded-lg border border-gray-100 dark:border-white/5 shadow-sm">
           <button className="px-4 py-1.5 text-sm font-bold bg-[#f4f7f6] dark:bg-white/5 text-[#141724] dark:text-white rounded-md transition-colors">30 Kun</button>
           <button className="px-4 py-1.5 text-sm font-bold text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">7 Kun</button>
           <button className="px-4 py-1.5 text-sm font-bold text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">24 Soat</button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden group">
            <CardContent className="p-6 relative">
               <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-2">
                     <p className="text-[13px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{stat.label}</p>
                     <h3 className="text-3xl font-black text-[#141724] dark:text-white tracking-tight">{stat.value}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.color} shadow-lg shadow-black/10 group-hover:scale-105 transition-transform duration-300`}>
                     <stat.icon className="w-5 h-5 text-white" />
                  </div>
               </div>
               <div className="mt-6 flex items-center gap-2">
                  <Badge variant="secondary" className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold ${stat.trendUp ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10'}`}>
                     {stat.trendUp ? <TrendingUp className="w-3 h-3 mr-1 inline-block" /> : <TrendingDown className="w-3 h-3 mr-1 inline-block" />}
                     {stat.trend}
                  </Badge>
                  <span className="text-xs font-semibold text-gray-400">o'tgan oyga nisbatan</span>
               </div>
               
               {/* Decorative background circle */}
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gray-50 dark:bg-white/[0.01] rounded-full blur-2xl z-0 pointer-events-none transition-all duration-500 group-hover:scale-150"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid content */}
      <div className="grid gap-6 md:grid-cols-7">
        
        {/* Graph Area (Placeholder for Chart) */}
        <Card className="md:col-span-4 border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl flex flex-col justify-between">
          <CardHeader className="p-6 pb-2 border-b border-gray-50 dark:border-white/5">
             <div className="flex items-center justify-between">
                <CardTitle className="text-[16px] font-black tracking-tight text-[#141724] dark:text-white">Daromadlar Statistikasi</CardTitle>
                <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
             </div>
          </CardHeader>
          <CardContent className="p-6 h-[280px] flex items-end justify-between items-stretch gap-2 pb-8">
             {/* Simple mock bar chart */}
             {[40, 70, 45, 90, 60, 100, 80, 50, 75, 40, 85, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end group">
                   <div 
                      className="w-full bg-[#eef1ff] dark:bg-indigo-500/10 hover:bg-[#3e4cf1] dark:hover:bg-[#3e4cf1] rounded-t-sm transition-all duration-300 relative" 
                      style={{ height: `${h}%` }}
                   >
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#141724] text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        ${h}k
                     </div>
                   </div>
                </div>
             ))}
          </CardContent>
        </Card>

        {/* Recent Transactions List */}
        <Card className="md:col-span-3 border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden">
          <CardHeader className="p-6 pb-4 border-b border-gray-50 dark:border-white/5">
             <div className="flex items-center justify-between">
               <CardTitle className="text-[16px] font-black tracking-tight text-[#141724] dark:text-white">So'nggi to'lovlar</CardTitle>
               <button className="text-[13px] font-bold text-[#3e4cf1] hover:text-blue-700 flex items-center">Barchasi <MoveUpRight className="w-3 h-3 ml-1" /></button>
             </div>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-gray-50 dark:divide-white/5">
               {recentTransactions.map((tx) => (
                  <div key={tx.id} className="p-4 sm:px-6 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] flex items-center justify-between transition-colors cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center font-bold text-[14px] text-gray-600 dark:text-gray-300">
                           {tx.name.charAt(0)}
                        </div>
                        <div>
                           <p className="font-bold text-[14px] text-[#141724] dark:text-white">{tx.name}</p>
                           <p className="text-[12px] font-semibold text-gray-500">{tx.type} • {tx.date}</p>
                        </div>
                     </div>
                     <div className="flex flex-col items-end gap-1">
                        <span className="font-black text-[15px]">{tx.amount}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] font-extrabold px-1.5 py-0 border-none ${
                             tx.status === 'Tasdiqlangan' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20' : 
                             tx.status === 'Kutilmoqda' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20' : 
                             'bg-rose-100 text-rose-700 dark:bg-rose-500/20'
                          }`}
                        >
                           {tx.status}
                        </Badge>
                     </div>
                  </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

import { useState, useEffect } from "react";
import { Users, CreditCard, UserPlus, TrendingUp, TrendingDown, Clock, MoveUpRight, MoreHorizontal, Activity, ArrowUpRight, ArrowDownRight, Wallet, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { financeService } from "@/services/financeService";
import { profileService } from "@/services/profileService";
import { groupService } from "@/services/groupService";


export default function DashboardOverview() {
  const [timeRange, setTimeRange] = useState<"30" | "7" | "24">("30");
  const [isLoading, setIsLoading] = useState(true);
  const [liveStats, setLiveStats] = useState<any[]>([]);
  const [liveTransactions, setLiveTransactions] = useState<any[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      setIsLoading(true);
      try {
        const recentTx = await financeService.getRecentPayments(6);
        const students = await profileService.getAllProfilesByRole('student');
        
        // Calculate total revenue from real payments
        const allPayments = await financeService.getRecentPayments(1000);
        const totalRevenue = allPayments.reduce((acc, curr) => acc + (curr.amount_paid || 0), 0);
        
        // Transform for UI
        setLiveTransactions(recentTx.map(tx => ({
          id: tx.id,
          name: tx.profiles ? `${tx.profiles.first_name} ${tx.profiles.last_name}` : "Noma'lum",
          type: tx.payment_method,
          amount: tx.amount_paid.toLocaleString() + " UZS",
          status: 'Tasdiqlangan',
          date: new Date(tx.paid_at).toLocaleDateString('uz-UZ'),
          trend: 'up'
        })));

        const allGroups = await groupService.getAllGroups();

        const formattedRevenue = totalRevenue >= 1000000 ? (totalRevenue / 1000000).toFixed(1) + "M" : (totalRevenue / 1000).toFixed(0) + "K";

        setLiveStats([
          { label: "Jami O'quvchilar", value: students.length.toString(), trend: "0%", trendUp: true, icon: Users, color: "from-blue-500 to-indigo-600", bgBase: "bg-blue-50 dark:bg-blue-500/10", textBase: "text-blue-600 dark:text-blue-400" },
          { label: "Jami Tushum", value: formattedRevenue + " UZS", trend: "0%", trendUp: true, icon: Wallet, color: "from-emerald-400 to-teal-500", bgBase: "bg-emerald-50 dark:bg-emerald-500/10", textBase: "text-emerald-600 dark:text-emerald-400" },
          { label: "Yangi Qabul", value: students.filter(s => new Date(s.created_at) > new Date(Date.now() - 7*24*60*60*1000)).length.toString(), trend: "0%", trendUp: true, icon: UserPlus, color: "from-violet-500 to-purple-600", bgBase: "bg-violet-50 dark:bg-violet-500/10", textBase: "text-violet-600 dark:text-violet-400" },
          { label: "Faol Guruhlar", value: (allGroups.length).toString(), trend: "Barqaror", trendUp: true, icon: Activity, color: "from-amber-400 to-orange-500", bgBase: "bg-amber-50 dark:bg-amber-500/10", textBase: "text-amber-600 dark:text-amber-400" },
        ]);

        // Process Chart Data
        const days = timeRange === "30" ? 30 : timeRange === "7" ? 7 : 1;
        const rawRevenue = await financeService.getRevenueStats(days);
        
        const segments = timeRange === "30" ? 12 : timeRange === "7" ? 7 : 24;
        const bins = Array(segments).fill(0);
        const now = Date.now();
        const segmentMs = (days * 24 * 60 * 60 * 1000) / segments;

        rawRevenue.forEach((p: any) => {
          const pTime = new Date(p.paid_at).getTime();
          const binIdx = Math.floor((now - pTime) / segmentMs);
          if (binIdx >= 0 && binIdx < segments) {
            bins[segments - 1 - binIdx] += p.amount_paid;
          }
        });

        const maxVal = Math.max(...bins, 1);
        setChartData(bins.map(b => (b / maxVal) * 100));

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, [timeRange]);

  const dataMap = {
    "30": {
      label: "o'tgan 30 kunga nisbatan"
    },
    "7": {
      label: "o'tgan 7 kunga nisbatan"
    },
    "24": {
      label: "kechagiga nisbatan"
    }
  };

  const { label } = dataMap[timeRange];
  const chart = chartData.length > 0 ? chartData : Array(timeRange === "30" ? 12 : timeRange === "7" ? 7 : 24).fill(0);
  const stats = liveStats.length > 0 ? liveStats : [
     { label: "Jami O'quvchilar", value: "...", trend: "...", trendUp: true, icon: Users, color: "from-blue-500 to-indigo-600", bgBase: "bg-blue-50 dark:bg-blue-500/10", textBase: "text-blue-600 dark:text-blue-400" },
     { label: "Oylik Sof Tushum", value: "...", trend: "...", trendUp: true, icon: Wallet, color: "from-emerald-400 to-teal-500", bgBase: "bg-emerald-50 dark:bg-emerald-500/10", textBase: "text-emerald-600 dark:text-emerald-400" },
     { label: "Yangi Qabul", value: "...", trend: "...", trendUp: true, icon: UserPlus, color: "from-violet-500 to-purple-600", bgBase: "bg-violet-50 dark:bg-violet-500/10", textBase: "text-violet-600 dark:text-violet-400" },
     { label: "Faol Guruhlar", value: "...", trend: "...", trendUp: false, icon: Activity, color: "from-amber-400 to-orange-500", bgBase: "bg-amber-50 dark:bg-amber-500/10", textBase: "text-amber-600 dark:text-amber-400" },
  ];
  const transactions = liveTransactions;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 pb-12 max-w-[1600px] mx-auto">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <Badge variant="outline" className="text-[10px] uppercase tracking-widest font-black border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">Tizim holati: Barqaror</Badge>
           </div>
           <h1 className="text-3xl sm:text-[34px] font-black tracking-tight text-[#141724] dark:text-white leading-tight">Xush kelibsiz, Raxima Academy</h1>
           <p className="text-gray-500 dark:text-gray-400 font-medium text-[15px] mt-1 flex items-center gap-2">
             <span>Platformaning so'nggi ma'lumotlari aynan siz uchun tahlil qilindi.</span>
           </p>
        </div>
        <div className="flex bg-white dark:bg-[#141724] p-1.5 rounded-[14px] border border-gray-100 dark:border-white/5 shadow-sm">
           {(["30", "7", "24"] as const).map(range => (
             <button 
               key={range}
               onClick={() => setTimeRange(range)} 
               className={`px-5 py-2 text-[13px] font-extrabold rounded-[10px] transition-all duration-300 ${timeRange === range ? "bg-[#141724] dark:bg-white text-white dark:text-[#141724] shadow-md" : "text-gray-500 dark:text-gray-400 hover:text-[#141724] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"}`}
             >
               {range === "30" ? "30 Kun" : range === "7" ? "7 Kun" : "24 Soat"}
             </button>
           ))}
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className={`border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-1 ${isLoading ? 'animate-pulse' : ''}`}>
            <CardContent className="p-6 relative">
               <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-[0.02] pointer-events-none transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-12">
                  <stat.icon className="w-32 h-32" />
               </div>
               
               <div className="flex justify-between items-start relative z-10 mb-4">
                  <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${stat.bgBase} transition-colors duration-300`}>
                     <stat.icon className={`w-5 h-5 ${stat.textBase}`} />
                  </div>
                  <Badge variant="secondary" className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold shadow-sm ${stat.trendUp ? 'bg-emerald-50 border-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400' : 'bg-rose-50 border-rose-100 text-rose-600 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-400'}`}>
                     {stat.trendUp ? <TrendingUp className="w-3 h-3 mr-1 inline-block" /> : <TrendingDown className="w-3 h-3 mr-1 inline-block" />}
                     {stat.trend}
                  </Badge>
               </div>
               
               <div className="space-y-1 relative z-10">
                  <p className="text-[13px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-[32px] font-black text-[#141724] dark:text-white tracking-tight leading-none">{stat.value}</h3>
               </div>
               
               <div className="mt-5 relative z-10">
                  <span className="text-[12px] font-bold text-gray-400 dark:text-gray-500">{label}</span>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid content */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        
        {/* Graph Area */}
        <Card className="lg:col-span-4 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none bg-white dark:bg-[#141724] rounded-3xl flex flex-col justify-between overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-500/[0.02] pointer-events-none"></div>
          
          <div className="p-6 md:p-8 flex items-center justify-between relative z-10">
             <div>
                <h2 className="text-[20px] font-black tracking-tight text-[#141724] dark:text-white flex items-center gap-2">
                   <Activity className="w-5 h-5 text-blue-500" />
                   Tushumlar Dinamikasi
                </h2>
                <p className="text-[13px] font-semibold text-gray-500 mt-1">Daromad o'sish ko'rsatkichlari grafigi</p>
             </div>
             <button className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#141724] dark:hover:text-white transition-colors">
                 <MoreHorizontal className="w-5 h-5" />
             </button>
          </div>
          
          <CardContent className="p-6 md:p-8 pt-0 h-[320px] flex items-end justify-between items-stretch gap-2 md:gap-3 relative z-10">
             {chart.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end group">
                   <div 
                      className={`w-full bg-[#e8ebfe] dark:bg-indigo-500/10 rounded-t-lg transition-all duration-700 relative overflow-hidden group-hover:bg-[#3e4cf1] dark:group-hover:bg-[#3e4cf1] ${isLoading ? 'h-4 animate-pulse' : ''}`}
                      style={{ height: isLoading ? '10%' : `${h}%` }}
                   >
                     <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#141724] text-white text-[11px] font-black py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-xl pointer-events-none z-50">
                        ${h}k
                     </div>
                   </div>
                </div>
             ))}
          </CardContent>
        </Card>

        {/* Recent Transactions List */}
        <Card className="lg:col-span-3 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none bg-white dark:bg-[#141724] rounded-3xl flex flex-col overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-50 dark:border-white/5 flex items-center justify-between bg-gray-50/30 dark:bg-white/[0.01]">
             <h2 className="text-[20px] font-black tracking-tight text-[#141724] dark:text-white">So'nggi to'lovlar</h2>
             <button className="text-[13px] font-black text-[#3e4cf1] hover:text-blue-700 flex items-center group bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors">
                Barchasi <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
          
          <div className="p-2 flex-1 overflow-y-auto">
             <div className="divide-y divide-gray-50 dark:divide-white/5">
               {transactions.map((tx, idx) => (
                  <div key={tx.id} className={`p-4 md:px-6 hover:bg-gray-50 dark:hover:bg-white/[0.02] flex items-center justify-between rounded-2xl transition-all cursor-pointer ${isLoading ? 'opacity-50 animate-pulse' : ''}`} style={{ animationDelay: `${idx * 100}ms` }}>
                     <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-[15px] shadow-sm
                           ${tx.trend === 'up' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 
                             tx.trend === 'down' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' : 
                             'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
                           {tx.trend === 'up' ? <ArrowUpRight className="w-5 h-5" /> : tx.trend === 'down' ? <ArrowDownRight className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                        </div>
                        <div>
                           <p className="font-bold text-[15px] text-[#141724] dark:text-white">{tx.name}</p>
                           <p className="text-[13px] font-semibold text-gray-500 mt-0.5">{tx.type} • {tx.date}</p>
                        </div>
                     </div>
                     <div className="flex flex-col items-end gap-1.5">
                        <span className="font-black text-[16px] text-[#141724] dark:text-white tracking-tight">{tx.amount}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 border bg-transparent ${
                             tx.status === 'Tasdiqlangan' ? 'border-emerald-200 text-emerald-600 dark:border-emerald-500/30 dark:text-emerald-400' : 
                             tx.status === 'Kutilmoqda' ? 'border-amber-200 text-amber-600 dark:border-amber-500/30 dark:text-amber-400' : 
                             'border-rose-200 text-rose-600 dark:border-rose-500/30 dark:text-rose-400'
                          }`}
                        >
                           {tx.status}
                        </Badge>
                     </div>
                  </div>
               ))}
             </div>
          </div>
        </Card>
      </div>

    </div>
  );
}

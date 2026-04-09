import { useState } from "react";
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, Clock, PlusCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PaymentsPage() {
  const [search, setSearch] = useState("");

  const transactions = [
    { id: "TX-1042", student: "Azizov Timur", type: "Oylik To'lov", method: "Payme", amount: "550,000", date: "Bugun, 09:30", status: "Tasdiqlangan" },
    { id: "TX-1043", student: "Malikova Iroda", type: "Oylik To'lov", method: "Naqd", amount: "550,000", date: "Bugun, 08:15", status: "Kutilmoqda" },
    { id: "TX-1044", student: "Karimov Sardor", type: "Qarz to'lovi", method: "Click", amount: "1,100,000", date: "Kecha, 18:45", status: "Tasdiqlangan" },
    { id: "TX-1045", student: "Usmonova Laylo", type: "Oylik To'lov", method: "Payme", amount: "550,000", date: "12 Aprel, 14:20", status: "Xatolik" },
    { id: "TX-1046", student: "Rakhimov Jasur", type: "Yarim to'lov", method: "Naqd", amount: "300,000", date: "10 Aprel, 11:00", status: "Tasdiqlangan" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Moliya va To'lovlar</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Barcha tushumlar, qarzdorliklar va tranzaksiyalar tarixi.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 px-5 rounded-xl border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm">
             <Download className="w-4 h-4 mr-2" /> Eksport (Excel)
           </Button>
           <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.98]">
             <PlusCircle className="w-5 h-5 mr-2" strokeWidth={2.5} /> To'lov qabul qilish
           </Button>
        </div>
      </div>

      {/* Advanced KPI Financial Cards */}
      <div className="grid gap-5 md:grid-cols-3">
         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden relative group">
            <div className="p-6 relative z-10">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[14px] font-bold text-gray-400 dark:text-gray-500 tracking-wide">SHU OYDAGI TUSHUM</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-[32px] font-black text-[#141724] dark:text-white tracking-tight">42.5M</span>
                      <span className="text-sm font-bold text-gray-400">UZS</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ArrowUpRight className="w-6 h-6" strokeWidth={2.5} />
                  </div>
               </div>
               <div className="mt-4 flex items-center gap-2">
                  <span className="flex items-center text-[12px] font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">
                     +12.5% <ArrowUpRight className="w-3 h-3 ml-0.5" />
                  </span>
                  <span className="text-[12px] font-semibold text-gray-400">O'tgan oyga nisbatan</span>
               </div>
            </div>
            {/* Ambient Background decoration */}
            <div className="absolute right-0 bottom-0 opacity-10 dark:opacity-5 translate-x-1/4 translate-y-1/4 pointer-events-none">
              <CheckCircle2 className="w-48 h-48 text-emerald-500" />
            </div>
         </Card>

         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden relative group">
            <div className="p-6 relative z-10">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[14px] font-bold text-gray-400 dark:text-gray-500 tracking-wide">KUTILAYOTGAN TUSHUM</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-[32px] font-black text-[#141724] dark:text-white tracking-tight">18.2M</span>
                      <span className="text-sm font-bold text-gray-400">UZS</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#3e4cf1] dark:bg-[#3e4cf1]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6" strokeWidth={2.5} />
                  </div>
               </div>
               <div className="w-full bg-gray-100 dark:bg-white/5 h-2 rounded-full overflow-hidden mt-6">
                  <div className="bg-[#3e4cf1] h-full rounded-full" style={{ width: '70%' }}></div>
               </div>
               <div className="mt-2 text-[12px] font-bold text-gray-500 flex justify-between">
                  <span>Planga nisbatan: 70%</span>
                  <span className="text-[#3e4cf1]">60M Topshiriq</span>
               </div>
            </div>
         </Card>

         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl overflow-hidden relative group text-white">
            <div className="p-6 relative z-10">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[14px] font-bold text-rose-100 tracking-wide uppercase">Kritik Qarzdorlik</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-[32px] font-black tracking-tight drop-shadow-sm">8.4M</span>
                      <span className="text-sm font-bold text-rose-200">UZS</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ArrowDownRight className="w-6 h-6" strokeWidth={2.5} />
                  </div>
               </div>
               <div className="mt-5 pt-4 border-t border-white/20 flex gap-4">
                  <div className="flex flex-col">
                     <span className="text-[11px] text-rose-200 font-semibold uppercase">O'quvchilar</span>
                     <span className="text-lg font-bold">42 ta</span>
                  </div>
                  <div className="flex flex-col border-l border-white/20 pl-4">
                     <span className="text-[11px] text-rose-200 font-semibold uppercase">Status</span>
                     <span className="text-[13px] font-bold flex items-center gap-1 mt-1 bg-white/20 px-2 py-0.5 rounded-md text-white">
                        <ArrowUpRight className="w-3 h-3" /> O'smoqda
                     </span>
                  </div>
               </div>
            </div>
         </Card>
      </div>

      {/* Transaction History Table */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-transparent">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-[#3e4cf1]/10 text-[#3e4cf1] rounded-lg"><Search className="w-5 h-5" /></div>
             <h2 className="text-[18px] font-bold text-[#141724] dark:text-white">So'nggi Tranzaksiyalar</h2>
           </div>
           <div className="flex gap-3 w-full md:w-auto">
             <div className="relative w-full md:w-[300px]">
               <Input 
                 placeholder="ID yoki Ism bo'yicha qidiruv..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="pl-4 h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 rounded-xl focus-visible:ring-[#3e4cf1] text-[14px] font-medium" 
               />
             </div>
             <Button variant="outline" className="h-11 px-4 rounded-xl border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-white/5">
                <Filter className="w-4 h-4" />
             </Button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f4f7f6]/50 dark:bg-[#0b0e14]/50 border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Tranzaksiya ID</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">O'quvchi</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Turi & Vaqt</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Metod</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Summa (UZS)</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider text-right">Holati</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-[13px] font-black text-gray-500 dark:text-gray-400">
                    {tx.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-[14.5px] text-[#141724] dark:text-white group-hover:text-[#3e4cf1] transition-colors">{tx.student}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-bold text-[13.5px] text-[#141724] dark:text-gray-200">{tx.type}</span>
                      <span className="text-[12px] font-semibold text-gray-500 mt-0.5">{tx.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-3 py-1 text-[12px] font-extrabold rounded-md ${
                       tx.method === 'Payme' ? 'bg-[#33cccc]/10 text-[#33cccc]' :
                       tx.method === 'Click' ? 'bg-[#00a1ea]/10 text-[#00a1ea]' :
                       'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300'
                     }`}>
                        {tx.method}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[15px] font-black text-[#141724] dark:text-white">
                    {tx.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Badge 
                       variant="outline" 
                       className={`border-none px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide ${
                          tx.status === 'Tasdiqlangan' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 
                          tx.status === 'Kutilmoqda' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 animate-pulse' : 
                          'bg-rose-50 text-rose-600 dark:bg-rose-500/10'
                       }`}
                    >
                       {tx.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
    </div>
  );
}

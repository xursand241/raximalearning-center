import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Users, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ParentsPage() {
  const [search, setSearch] = useState("");

  const parents = [
    { id: "PAR-001", name: "Anvarjon Xoliqov", phone: "+998 90 123 45 67", balance: "0 UZS", children: 1, lastLogin: "Bugun, 09:12", status: "Aktiv" },
    { id: "PAR-002", name: "Gulzoda Alimova", phone: "+998 93 987 65 43", balance: "0 UZS", children: 2, lastLogin: "Kecha, 18:45", status: "Aktiv" },
    { id: "PAR-003", name: "Rustam Karimov", phone: "+998 94 321 76 54", balance: "-1,100,000 UZS", children: 1, lastLogin: "3 kun oldin", status: "Aktiv" },
    { id: "PAR-004", name: "Nigora Usmanova", phone: "+998 97 111 22 33", balance: "-350,000 UZS", children: 3, lastLogin: "10 Aprel, 14:00", status: "Aktiv" },
    { id: "PAR-005", name: "Azimjon Shodiyev", phone: "+998 95 666 77 88", balance: "0 UZS", children: 1, lastLogin: "Hech qachon", status: "Noaktiv" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Ota-onalar</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">O'quvchilarning vasiylari, to'lovlar va profil boshqaruvi.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="bg-[#3e4cf1] hover:bg-[#3442d9] text-white font-bold h-11 px-6 rounded-xl shadow-lg transition-all">
             <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} /> Yangi Ota-ona
           </Button>
        </div>
      </div>

      {/* Main Table Wrapper */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden mt-8">
        <div className="p-4 sm:p-6 pb-0 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-transparent rounded-t-2xl">
           <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="p-2 bg-[#3e4cf1]/10 text-[#3e4cf1] rounded-lg hidden sm:flex"><Users className="w-5 h-5" /></div>
             <div className="relative w-full md:w-[350px]">
               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <Input 
                 placeholder="Ism sharif yoki telefon orqali izlash..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="pl-10 h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 rounded-xl focus-visible:ring-[#3e4cf1] text-[14px] font-medium w-full" 
               />
             </div>
           </div>
           <Button variant="outline" className="h-11 px-5 w-full md:w-auto rounded-xl border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-white/5">
              <Filter className="w-4 h-4 mr-2" /> Filtrlash
           </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f4f7f6]/50 dark:bg-[#0b0e14]/50 border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Ota-ona (Vasiy)</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Telefon raqam</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Farzandlar count</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider cursor-help" title="To'lanmagan qarzdorlik">Umumiy Qarz / Balans</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {parents.map((parent) => (
                <tr key={parent.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-[13px] shadow-sm">
                        {parent.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[14.5px] text-[#141724] dark:text-white group-hover:text-[#3e4cf1] transition-colors">{parent.name}</span>
                          {parent.status === "Aktiv" && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
                        </div>
                        <span className="text-[11px] font-semibold text-gray-400 mt-0.5">Oxirgi faollik: {parent.lastLogin}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className="text-[13.5px] font-bold text-gray-600 dark:text-gray-300">
                        {parent.phone}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <Badge variant="secondary" className="px-2.5 py-1 bg-gray-100 text-gray-600 dark:bg-white/5 font-extrabold text-[12px] border-none">
                        {parent.children} O'quvchi
                     </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <div className={`flex items-center gap-1.5 font-bold text-[13.5px] ${parent.balance.startsWith('-') ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-500'}`}>
                        <CreditCard className="w-4 h-4" />
                        {parent.balance}
                     </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-gray-400 hover:text-[#3e4cf1] p-1.5 rounded-lg hover:bg-[#3e4cf1]/10 transition-colors opacity-0 group-hover:opacity-100">
                       <MoreHorizontal className="w-5 h-5" />
                    </button>
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

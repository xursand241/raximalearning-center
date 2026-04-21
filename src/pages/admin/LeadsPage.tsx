import { useState } from "react";
import { Search, Filter, PhoneCall, Check, X, Clock, MessageSquare, ChevronDown, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type LeadStatus = "Yangi" | "Aloqaga chiqildi" | "O'ylab ko'radi" | "Qabul qilindi" | "Rad etildi";

interface Lead {
  id: string;
  name: string;
  phone: string;
  course: string;
  source: string;
  status: LeadStatus;
  date: string;
}

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  
  // State for dynamic leads
  const [leads, setLeads] = useState<Lead[]>([]);

  const updateLeadStatus = (id: string, newStatus: LeadStatus) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
  };

  const statusColors: Record<LeadStatus, string> = {
    "Yangi": "bg-blue-50 text-blue-600 dark:bg-blue-500/10 border-blue-200",
    "Aloqaga chiqildi": "bg-amber-50 text-amber-600 dark:bg-amber-500/10 border-amber-200",
    "O'ylab ko'radi": "bg-purple-50 text-purple-600 dark:bg-purple-500/10 border-purple-200",
    "Qabul qilindi": "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 border-emerald-200",
    "Rad etildi": "bg-rose-50 text-rose-600 dark:bg-rose-500/10 border-rose-200"
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Bog'lanishlar (Lidlar)</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Yangi o'quvchilardan tushgan so'rovlarni boshqarish CRM tiyimi.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 px-5 rounded-xl border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm">
             <Filter className="w-4 h-4 mr-2" /> Saralash
           </Button>
           <Button className="bg-[#3e4cf1] hover:bg-[#3442d9] text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-[#3e4cf1]/25 transition-all">
             <UserPlus className="w-5 h-5 mr-2" strokeWidth={2.5} /> So'rov qo'shish
           </Button>
        </div>
      </div>

      {/* Leads KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col justify-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><UserPlus className="w-16 h-16"/></div>
            <p className="text-[13px] font-black text-gray-400 tracking-wider uppercase mb-1">Yangi so'rovlar</p>
            <p className="text-3xl font-black text-[#141724] dark:text-white">{leads.filter(l => l.status === "Yangi").length}</p>
         </div>
         <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-5 rounded-2xl border-none text-white flex flex-col justify-center shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><PhoneCall className="w-16 h-16"/></div>
            <p className="text-[13px] font-black text-amber-100 tracking-wider uppercase mb-1">Aloqaga chiqildi</p>
            <p className="text-3xl font-black text-white">{leads.filter(l => l.status === "Aloqaga chiqildi").length}</p>
         </div>
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col justify-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Clock className="w-16 h-16"/></div>
            <p className="text-[13px] font-black text-gray-400 tracking-wider uppercase mb-1">O'ylab ko'radi</p>
            <p className="text-3xl font-black text-[#141724] dark:text-white">{leads.filter(l => l.status === "O'ylab ko'radi").length}</p>
         </div>
         <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-5 rounded-2xl border-none text-white flex flex-col justify-center shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Check className="w-16 h-16"/></div>
            <p className="text-[13px] font-black text-emerald-100 tracking-wider uppercase mb-1">Qabul qilindi</p>
            <p className="text-3xl font-black text-white">{leads.filter(l => l.status === "Qabul qilindi").length}</p>
         </div>
      </div>

      {/* Leads Table Management */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl">
        <div className="p-4 sm:p-6 pb-0 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-transparent rounded-t-2xl">
           <div className="relative w-full md:max-w-md">
             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <Input 
               placeholder="Mijoz ismi yoki telefoni orqali izlash..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="pl-10 h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 rounded-xl focus-visible:ring-[#3e4cf1] text-[14px] font-medium" 
             />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f4f7f6]/50 dark:bg-[#0b0e14]/50 border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Lid / O'quvchi</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Aloqa</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Qiziqish / Kurs</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Manba</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Holat</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-white/5 flex items-center justify-center font-black text-[13px] text-gray-600 dark:text-gray-300 shadow-sm">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[14.5px] text-[#141724] dark:text-white">{lead.name}</span>
                        <span className="text-[11px] font-semibold text-gray-400 mt-0.5">{lead.date}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 dark:text-gray-300">
                      <div className="w-6 h-6 rounded-md bg-green-50 dark:bg-green-500/10 text-green-600 flex items-center justify-center">
                         <PhoneCall className="w-3 h-3" />
                      </div>
                      {lead.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className="font-bold text-[13px] text-[#141724] dark:text-white">
                        {lead.course}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary" className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400">
                         {lead.source}
                      </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative inline-block group/dropdown">
                       <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-extrabold border uppercase ${statusColors[lead.status]}`}>
                         {lead.status} <ChevronDown className="w-3 h-3" />
                       </button>
                       <div className="absolute left-0 mt-2 w-44 bg-white dark:bg-[#1a1e2f] border border-gray-100 dark:border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-20 overflow-hidden">
                          {(["Yangi", "Aloqaga chiqildi", "O'ylab ko'radi", "Qabul qilindi", "Rad etildi"] as LeadStatus[]).map((st) => (
                             <button 
                               key={st}
                               onClick={() => updateLeadStatus(lead.id, st)}
                               className="w-full text-left px-4 py-2.5 text-[12px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                             >
                               {st}
                             </button>
                          ))}
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 text-[12px] font-bold transition-colors">
                          <MessageSquare className="w-3.5 h-3.5" /> Izoh
                       </button>
                    </div>
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

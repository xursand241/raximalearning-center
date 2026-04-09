import { useState } from "react";
import { Search, Link as LinkIcon, UserPlus, Users, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function RelationsPage() {
  const [search, setSearch] = useState("");

  const relations = [
    { 
      id: "REL-001", 
      parent: { name: "Anvarjon Xoliqov", phone: "+998 90 123 45 67" }, 
      children: [{ name: "Azizov Timur", group: "IELTS B2" }] 
    },
    { 
      id: "REL-002", 
      parent: { name: "Gulzoda Alimova", phone: "+998 93 987 65 43" }, 
      children: [{ name: "Malikova Iroda", group: "Math Advanced" }, { name: "Malikov Doston", group: "Kids English" }] 
    },
    { 
      id: "REL-003", 
      parent: { name: "Rustam Karimov", phone: "+998 94 321 76 54" }, 
      children: [{ name: "Karimov Sardor", group: "English B1" }] 
    },
    { 
      id: "REL-004", 
      parent: { name: "Nigora Usmanova", phone: "+998 97 111 22 33" }, 
      children: [{ name: "Usmonova Laylo", group: "Foundation" }, { name: "Usmonov Behzod", group: "IT Kids" }, { name: "Usmonova Asal", group: "Mental Arithmetics" }] 
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Oila va Bog'lanishlar</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Ota-onalar va o'quvchilar o'rtasidagi bog'lanishlarni (qarindoshlikni) boshqarish.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="bg-[#3e4cf1] hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-blue-500/25 transition-all">
             <LinkIcon className="w-5 h-5 mr-2" strokeWidth={2.5} /> Yangi bog'lanish
           </Button>
        </div>
      </div>

      {/* KPI Info Cards */}
      <div className="grid gap-5 md:grid-cols-3">
         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden relative group">
            <div className="p-6 relative z-10 flex items-center gap-5">
               <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7" strokeWidth={2.5} />
               </div>
               <div>
                  <h3 className="text-[13px] font-bold text-gray-400 dark:text-gray-500 tracking-wider uppercase mb-1">Tizimdagi Oila Soni</h3>
                  <p className="text-[28px] font-black text-[#141724] dark:text-white leading-none">850</p>
               </div>
            </div>
         </Card>
         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden relative group">
            <div className="p-6 relative z-10 flex items-center gap-5">
               <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <LinkIcon className="w-7 h-7" strokeWidth={2.5} />
               </div>
               <div>
                  <h3 className="text-[13px] font-bold text-gray-400 dark:text-gray-500 tracking-wider uppercase mb-1">Jami Bog'lanishlar</h3>
                  <p className="text-[28px] font-black text-[#141724] dark:text-white leading-none">1,120</p>
               </div>
            </div>
         </Card>
         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-rose-50 dark:bg-rose-500/5 rounded-2xl overflow-hidden relative group border border-rose-100 dark:border-rose-500/10">
            <div className="p-6 relative z-10 flex items-center gap-5">
               <div className="w-14 h-14 rounded-2xl bg-white dark:bg-rose-500/20 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShieldAlert className="w-7 h-7" strokeWidth={2.5} />
               </div>
               <div>
                  <h3 className="text-[13px] font-bold text-rose-500 tracking-wider uppercase mb-1">Bog'lanmagan O'quvchilar</h3>
                  <p className="text-[28px] font-black text-rose-700 dark:text-rose-400 leading-none">12</p>
               </div>
            </div>
         </Card>
      </div>

      {/* Main Table Card for Parent-Student Relations */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-6 pb-0 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-transparent rounded-t-2xl">
           <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="p-2 bg-[#3e4cf1]/10 text-[#3e4cf1] rounded-lg hidden sm:flex"><LinkIcon className="w-5 h-5" /></div>
             <div className="relative w-full md:w-[400px]">
               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <Input 
                 placeholder="Ota-ona ismi yoki raqamini kiriting..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="pl-10 h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 rounded-xl focus-visible:ring-[#3e4cf1] text-[14px] font-medium w-full" 
               />
             </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f4f7f6]/50 dark:bg-[#0b0e14]/50 border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Munosabat ID</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Ota-ona (Vakil)</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Farzandlar (O'quvchilar)</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {relations.map((rel) => (
                <tr key={rel.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-[13px] font-bold text-gray-500 dark:text-gray-400">
                    {rel.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-white/5 flex items-center justify-center font-black text-[14px] text-gray-500 shadow-sm">
                        {rel.parent.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[14.5px] text-[#141724] dark:text-white">{rel.parent.name}</span>
                        <span className="text-[12px] font-semibold text-[#3e4cf1] mt-0.5">{rel.parent.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                       {rel.children.map((child, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f7f6] dark:bg-white/5 rounded-lg border border-gray-200/50 dark:border-white/5">
                             <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center font-black text-[10px]">
                               {child.name.charAt(0)}
                             </div>
                             <div className="flex flex-col line-clamp-1">
                                <span className="text-[12px] font-bold text-[#141724] dark:text-gray-200 leading-tight">{child.name}</span>
                                <span className="text-[10px] font-semibold text-gray-400 leading-tight">{child.group}</span>
                             </div>
                          </div>
                       ))}
                       <button className="flex items-center justify-center w-8 h-8 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-400 hover:text-[#3e4cf1] hover:border-[#3e4cf1] transition-colors">
                          <UserPlus className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 border-gray-200 dark:border-white/10 text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-bold dark:hover:bg-rose-500/10">
                        Qulflash
                      </Button>
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

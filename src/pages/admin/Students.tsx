import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, UserCheck, UserX, AlertCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function StudentsPage() {
  const [search, setSearch] = useState("");

  const mockStudents = [
    { id: "STU-001", name: "Azizov Timur", group: "IELTS Foundation", phone: "+998 90 123 45 67", status: "Active", paid: true },
    { id: "STU-002", name: "Malikova Iroda", group: "Math Advanced", phone: "+998 90 987 65 43", status: "Active", paid: false },
    { id: "STU-003", name: "Karimov Sardor", group: "English B1", phone: "+998 93 321 76 54", status: "Blocked", paid: false },
    { id: "STU-004", name: "Rakhimov Jasur", group: "CEFR B2", phone: "+998 94 456 78 90", status: "Active", paid: true },
    { id: "STU-005", name: "Usmonova Laylo", group: "IELTS Foundation", phone: "+998 99 111 22 33", status: "Active", paid: false },
  ];

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">O'quvchilar Ro'yxati</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Barcha o'quvchilarni boshqarish, guruhlarga kiritish va tahrirlash.</p>
        </div>
        <Button className="bg-[#3e4cf1] hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-blue-500/25">
           <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} /> Yangi o'quvchi
        </Button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center"><Users className="w-5 h-5"/></div>
            <div><p className="text-sm font-bold text-gray-400">Jami</p><p className="text-xl font-black text-[#141724] dark:text-white">1,248</p></div>
         </div>
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><UserCheck className="w-5 h-5"/></div>
            <div><p className="text-sm font-bold text-gray-400">Aktiv</p><p className="text-xl font-black text-[#141724] dark:text-white">1,180</p></div>
         </div>
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center"><UserX className="w-5 h-5"/></div>
            <div><p className="text-sm font-bold text-gray-400">Bloklangan</p><p className="text-xl font-black text-[#141724] dark:text-white">68</p></div>
         </div>
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"><AlertCircle className="w-5 h-5"/></div>
            <div><p className="text-sm font-bold text-gray-400">Qarzdorlar</p><p className="text-xl font-black text-[#141724] dark:text-white">142</p></div>
         </div>
      </div>

      {/* Main Table Card */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl">
        <div className="p-4 sm:p-6 pb-0 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-transparent rounded-t-2xl">
           <div className="relative w-full md:max-w-md">
             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <Input 
               placeholder="Ism, telefon yoki ID bo'yicha qidirish..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="pl-10 h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 rounded-xl focus-visible:ring-[#3e4cf1] text-[14px] font-medium" 
             />
           </div>
           <Button variant="outline" className="w-full md:w-auto h-11 px-5 rounded-xl border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-white/5">
              <Filter className="w-4 h-4 mr-2" />
              Filtrlash
           </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f4f7f6]/50 dark:bg-[#0b0e14]/50 border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">O'quvchi</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Guruh</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Telefon</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">To'lov holati</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {mockStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#f4f7f6] dark:bg-[#0b0e14] border border-gray-200 dark:border-white/5 flex items-center justify-center font-black text-[13px] text-[#3e4cf1]">
                        {student.name.charAt(0)}
                      </div>
                      <div className="font-bold text-[14.5px] text-[#141724] dark:text-white">
                        {student.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[13px] font-bold text-gray-500">
                    {student.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-md text-[13px] font-bold">
                        {student.group}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[13px] font-semibold text-gray-600 dark:text-gray-400">
                    {student.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.paid ? (
                      <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-extrabold">TO'LANGAN</Badge>
                    ) : (
                      <Badge variant="outline" className="border-rose-200 bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:border-rose-500/20 px-2.5 py-0.5 text-[11px] font-extrabold animate-pulse">QARZDOR</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-gray-400 hover:text-[#3e4cf1] p-1 rounded-md hover:bg-[#3e4cf1]/10 transition-colors opacity-0 group-hover:opacity-100">
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

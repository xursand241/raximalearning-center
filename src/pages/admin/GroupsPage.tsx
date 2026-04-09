import { useState } from "react";
import { Search, Plus, Users, Calendar, MapPin, MoreHorizontal, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GroupsPage() {
  const [search, setSearch] = useState("");

  const groups = [
    { id: "GRP-101", name: "IELTS Foundation A", teacher: "Malika Tohirova", schedule: "Dushanba, Chorshanba, Juma (14:00)", room: "Xona-12", students: 18, capacity: 20, status: "Aktiv", subject: "Ingliz tili" },
    { id: "GRP-102", name: "Math Advanced V2", teacher: "Javohir Qosimov", schedule: "Seshanba, Payshanba, Shanba (16:00)", room: "Xona-04", students: 15, capacity: 15, status: "To'la", subject: "Matematika" },
    { id: "GRP-103", name: "Python Zero to Hero", teacher: "Rustam Aliyev", schedule: "Dushanba, Chorshanba, Juma (18:00)", room: "Xona-IT", students: 8, capacity: 15, status: "Qabul ochiq", subject: "Dasturlash" },
    { id: "GRP-104", name: "CEFR B2 Intensive", teacher: "Zuhra Niyozova", schedule: "Har kuni (08:00)", room: "Xona-09", students: 25, capacity: 25, status: "To'la", subject: "Ingliz tili" },
    { id: "GRP-105", name: "Kids Math", teacher: "Javohir Qosimov", schedule: "Seshanba, Payshanba (10:00)", room: "Xona-02", students: 12, capacity: 15, status: "Aktiv", subject: "Matematika" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Guruhlar</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Akademiyadagi barcha sinflar, dars jadvallari va o'quvchilar sonini boshqarish.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="bg-[#3e4cf1] hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-blue-500/25 transition-all">
             <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} /> Yangi Guruh
           </Button>
        </div>
      </div>

      {/* KPI Cards for Groups */}
      <div className="grid gap-5 md:grid-cols-4">
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#3e4cf1] dark:bg-[#3e4cf1]/10 dark:text-blue-400 flex items-center justify-center">
               <BookOpen className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
               <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Jami Guruhlar</p>
               <p className="text-[26px] font-black text-[#141724] dark:text-white leading-none mt-1">42</p>
            </div>
         </div>
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center">
               <Calendar className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
               <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Aktiv Guruhlar</p>
               <p className="text-[26px] font-black text-[#141724] dark:text-white leading-none mt-1">38</p>
            </div>
         </div>
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500 flex items-center justify-center">
               <Users className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
               <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Qabul Ochiq</p>
               <p className="text-[26px] font-black text-[#141724] dark:text-white leading-none mt-1">14</p>
            </div>
         </div>
         <div className="bg-gradient-to-br from-[#141724] to-gray-900 border-none p-5 rounded-2xl text-white flex items-center gap-4 shadow-md relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center">
               <MapPin className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
               <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Xonalar Bandligi</p>
               <div className="flex items-baseline gap-1 mt-1">
                  <p className="text-[26px] font-black text-white leading-none">85</p>
                  <span className="text-sm font-bold text-gray-400">%</span>
               </div>
            </div>
         </div>
      </div>

      {/* Groups List (Card Grid View instead of just table for a more premium look) */}
      <div className="flex items-center justify-between mt-8 mb-4">
         <div className="relative w-full md:w-[350px]">
           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
           <Input 
             placeholder="Guruh nomi yoki o'qituvchi orqali izlash..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="pl-10 h-11 bg-white dark:bg-[#141724] border-gray-100 dark:border-white/5 rounded-xl shadow-sm focus-visible:ring-[#3e4cf1] text-[14px] font-medium w-full" 
           />
         </div>
         <div className="flex bg-white dark:bg-[#141724] p-1.5 rounded-lg border border-gray-100 dark:border-white/5 shadow-sm">
           <button className="px-4 py-1.5 text-sm font-bold bg-[#f4f7f6] dark:bg-white/5 text-[#141724] dark:text-white rounded-md transition-colors">Grid (Karta)</button>
           <button className="px-4 py-1.5 text-sm font-bold text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Ro'yxat (Jadval)</button>
         </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.id} className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] bg-white dark:bg-[#141724] rounded-2xl hover:-translate-y-1 transition-transform duration-300 group cursor-pointer overflow-hidden">
             
             {/* Card Top / Header */}
             <div className="p-5 border-b border-gray-50 dark:border-white/5">
                <div className="flex justify-between items-start mb-3">
                   <Badge variant="secondary" className="bg-[#f4f7f6] text-[#3e4cf1] dark:bg-[#3e4cf1]/10 border-none text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1">
                      {group.subject}
                   </Badge>
                   <button className="text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                   </button>
                </div>
                <h3 className="text-[18px] font-black text-[#141724] dark:text-white tracking-tight group-hover:text-[#3e4cf1] transition-colors line-clamp-1">{group.name}</h3>
                <p className="text-[13px] font-bold text-gray-500 mt-1 flex items-center gap-1.5">
                   {group.teacher}
                </p>
             </div>

             {/* Card Details */}
             <div className="p-5 space-y-4">
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-gray-500" />
                   </div>
                   <div className="flex flex-col justify-center">
                      <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Dars vaqti</p>
                      <p className="text-[12px] font-bold text-[#141724] dark:text-gray-300 mt-0.5 line-clamp-1">{group.schedule}</p>
                   </div>
                </div>

                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-gray-500" />
                   </div>
                   <div className="flex flex-col justify-center">
                      <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Xona</p>
                      <p className="text-[12px] font-bold text-[#141724] dark:text-gray-300 mt-0.5">{group.room}</p>
                   </div>
                </div>

                {/* Progress & Occupancy */}
                <div className="pt-2">
                   <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-1.5">
                         <Users className="w-4 h-4 text-gray-400" />
                         <span className="text-[13px] font-bold text-gray-600 dark:text-gray-400">O'quvchilar</span>
                      </div>
                      <span className="text-[13px] font-black text-[#141724] dark:text-white">
                         {group.students} <span className="text-gray-400 font-bold">/ {group.capacity}</span>
                      </span>
                   </div>
                   <div className="w-full bg-gray-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                      <div 
                         className={`h-full rounded-full ${group.students >= group.capacity ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                         style={{ width: `${(group.students / group.capacity) * 100}%` }}
                      ></div>
                   </div>
                </div>
             </div>

             {/* Status Footer */}
             <div className="px-5 py-3 bg-[#f4f7f6]/50 dark:bg-white/[0.02] flex items-center justify-between border-t border-gray-50 dark:border-white/5">
                <Badge 
                   variant="outline" 
                   className={`border-none px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest ${
                      group.status === 'To\'la' ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400' : 
                      group.status === "Qabul ochiq" ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 
                      'bg-blue-50 text-[#3e4cf1] dark:bg-[#3e4cf1]/10'
                   }`}
                >
                   {group.status}
                </Badge>
                <div className="text-[11px] font-bold text-gray-400">{group.id}</div>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

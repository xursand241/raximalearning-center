import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Users, Calendar, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SchedulePage() {
  const [selectedGroup, setSelectedGroup] = useState<any>(null);

  const groups = [
    { id: 1, name: "IELTS B2", teacher: "Javohir Qosimov", subject: "Ingliz tili", students: 14, days: ["Dushanba", "Chorshanba", "Juma"], time: "14:00 - 16:00", room: "Xona-12", color: "from-blue-500 to-cyan-500" },
    { id: 2, name: "Math Advanced", teacher: "Aziz Rakhimov", subject: "Matematika", students: 10, days: ["Seshanba", "Payshanba", "Shanba"], time: "16:00 - 18:00", room: "Xona-04", color: "from-emerald-400 to-teal-500" },
    { id: 3, name: "IT Foundation", teacher: "Sanjar Bekmurodov", subject: "Dasturlash", students: 12, days: ["Dushanba", "Juma"], time: "18:00 - 20:00", room: "Xona-01", color: "from-rose-400 to-red-500" },
    { id: 4, name: "Ona tili", teacher: "Shahnoza Aliyeva", subject: "Gumanitar", students: 18, days: ["Chorshanba", "Shanba"], time: "08:00 - 10:00", room: "Xona-08", color: "from-amber-400 to-orange-500" },
    { id: 5, name: "Biologiya", teacher: "Malika Tohirova", subject: "Tabiiy fanlar", students: 15, days: ["Seshanba", "Payshanba"], time: "14:00 - 15:30", room: "Xona-03", color: "from-indigo-500 to-purple-500" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6 min-h-screen">
      {/* Header */}
      {!selectedGroup && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Guruhlar Jadvali</h1>
            <p className="text-gray-500 font-medium text-[15px] mt-1">Barcha guruhlarni va ularning dars kunlarini kuzatish.</p>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-[#141724] p-1 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
            <button className="p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors text-gray-500"><ChevronLeft className="w-5 h-5"/></button>
            <span className="px-4 font-bold text-[14px]">Oktyabr, 2026</span>
            <button className="p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors text-gray-500"><ChevronRight className="w-5 h-5"/></button>
          </div>
        </div>
      )}

      {/* State 1: List of Groups */}
      {!selectedGroup && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map(g => (
             <Card 
                key={g.id} 
                onClick={() => setSelectedGroup(g)} 
                className="cursor-pointer bg-white dark:bg-[#141724] border border-gray-100 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none rounded-2xl hover:-translate-y-1 transition-transform relative overflow-hidden group"
             >
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${g.color}`}></div>
                <div className="p-6">
                   <div className="flex justify-between items-start mb-4 mt-1">
                      <div>
                         <h3 className="text-[20px] font-black text-[#141724] dark:text-white leading-tight">{g.name}</h3>
                         <p className="text-[13px] font-bold text-gray-500 mt-1">{g.subject} • {g.teacher}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#3e4cf1]/10 group-hover:text-[#3e4cf1] transition-colors">
                         <Users className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                      </div>
                   </div>
                   <div className="flex items-center justify-between border-t border-gray-50 dark:border-white/5 pt-5 mt-2">
                      <div className="flex items-center gap-2 text-[13px] font-black text-gray-600 dark:text-gray-300">
                         <Calendar className="w-4 h-4 text-[#3e4cf1]" />
                         Haftada {g.days.length} kun dars
                      </div>
                      <span className="text-[13px] font-bold text-[#3e4cf1] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                         Ko'rish <ArrowRight className="w-4 h-4" />
                      </span>
                   </div>
                </div>
             </Card>
          ))}
        </div>
      )}

      {/* State 2: Detailed Group View */}
      {selectedGroup && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
          <button 
             onClick={() => setSelectedGroup(null)} 
             className="flex items-center bg-white dark:bg-[#141724] px-4 py-2 border border-gray-200 dark:border-white/10 rounded-xl text-[14px] font-bold text-gray-600 hover:text-[#3e4cf1] hover:border-[#3e4cf1] transition-all shadow-sm"
          >
             <ChevronLeft className="w-4 h-4 mr-1.5"/> Guruhlar ro'yxatiga qaytish
          </button>
          
          <Card className="p-6 bg-white dark:bg-[#141724] border-gray-100 dark:border-white/5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
             <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${selectedGroup.color}`}></div>
             <div className="pl-4">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">{selectedGroup.subject}</p>
                <h2 className="text-[28px] font-black text-[#141724] dark:text-white leading-none">{selectedGroup.name}</h2>
                <div className="flex flex-wrap gap-4 mt-4">
                   <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-white/5">
                      <Users className="w-4 h-4 text-[#3e4cf1]" />
                      <span className="text-[13px] font-bold text-gray-600 dark:text-gray-300">{selectedGroup.students} O'quvchi</span>
                   </div>
                   <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-white/5">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span className="text-[13px] font-bold text-gray-600 dark:text-gray-300">{selectedGroup.room}</span>
                   </div>
                </div>
             </div>
             <div className="md:text-right bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 w-full md:w-auto">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Biriktirilgan O'qituvchi</p>
                <p className="text-[18px] font-black text-[#141724] dark:text-white">{selectedGroup.teacher}</p>
             </div>
          </Card>

          <h3 className="text-[20px] font-black text-[#141724] dark:text-white pl-2">Haftalik Ish Grafigi</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
             {["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"].map(day => {
                const isClassDay = selectedGroup.days.includes(day);
                return (
                   <div key={day} className={`p-5 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${isClassDay ? 'border-[#3e4cf1] bg-[#eef1ff] dark:bg-[#3e4cf1]/10 shadow-sm' : 'border-gray-100 dark:border-white/5 opacity-60 bg-white dark:bg-[#141724]'}`}>
                      <p className={`text-[13px] font-black uppercase tracking-wider ${isClassDay ? 'text-[#3e4cf1]' : 'text-gray-400'}`}>{day}</p>
                      {isClassDay ? (
                         <div className="mt-4 bg-white dark:bg-[#0b0e14] px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
                            <p className="text-[15px] font-black text-[#141724] dark:text-white leading-none whitespace-nowrap">{selectedGroup.time}</p>
                         </div>
                      ) : (
                         <div className="mt-4 px-4 py-2 opacity-50">
                            <p className="text-[13px] font-bold text-gray-500 whitespace-nowrap">Dars yo'q</p>
                         </div>
                      )}
                   </div>
                );
             })}
          </div>
        </div>
      )}
    </div>
  );
}

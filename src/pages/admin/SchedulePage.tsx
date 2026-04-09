import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SchedulePage() {
  const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
  const times = ["08:00", "10:00", "14:00", "16:00", "18:00"];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Dars Jadvali</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Xonalar va guruhlar bo'yicha haftalik vizual jadval.</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-[#141724] p-1 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
           <button className="p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors text-gray-500"><ChevronLeft className="w-5 h-5"/></button>
           <span className="px-4 font-bold text-[14px]">Oktyabr, 2026</span>
           <button className="p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors text-gray-500"><ChevronRight className="w-5 h-5"/></button>
        </div>
      </div>

      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden p-6 overflow-x-auto">
         <table className="w-full min-w-[800px] border-collapse relative">
            <thead>
               <tr>
                  <th className="w-[100px] bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 p-4 text-[12px] font-black text-gray-400 rounded-tl-xl uppercase tracking-wider">Vaqt\Kun</th>
                  {days.map(day => (
                     <th key={day} className="bg-[#f4f7f6] dark:bg-[#0f111a] border border-gray-100 dark:border-white/5 p-4 text-[13px] font-black text-[#141724] dark:text-gray-200">
                        {day}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {times.map((time, idx) => (
                  <tr key={time}>
                     <td className="bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 p-4 text-center font-black text-[#3e4cf1] text-[13px]">
                        {time}
                     </td>
                     {days.map((day, dayIdx) => {
                        // Creating some mock visual blocks purely for the premium UI feel
                        const hasLesson = (idx + dayIdx) % 3 === 0;
                        const hasSecondLesson = (idx + dayIdx) % 5 === 0;
                        
                        return (
                           <td key={`${time}-${day}`} className="border border-gray-100 dark:border-white/5 p-2 h-[100px] align-top hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                              {hasLesson && (
                                 <div className="bg-indigo-50 border border-indigo-100 dark:bg-indigo-500/10 dark:border-indigo-500/20 p-2 rounded-lg cursor-pointer hover:shadow-md transition-shadow">
                                    <p className="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 leading-tight">IELTS Foundation</p>
                                    <div className="flex items-center gap-1 mt-1 text-gray-500 text-[10px] font-bold">
                                       <MapPin className="w-3 h-3" /> Xona-12
                                    </div>
                                 </div>
                              )}
                              {hasSecondLesson && (
                                 <div className="bg-emerald-50 border border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20 p-2 rounded-lg cursor-pointer mt-2 hover:shadow-md transition-shadow">
                                    <p className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 leading-tight">Math Kids</p>
                                    <div className="flex items-center gap-1 mt-1 text-gray-500 text-[10px] font-bold">
                                       <MapPin className="w-3 h-3" /> Xona-04
                                    </div>
                                 </div>
                              )}
                           </td>
                        )
                     })}
                  </tr>
               ))}
            </tbody>
         </table>
      </Card>
    </div>
  );
}

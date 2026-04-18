import { useState, useEffect } from "react";
import { Clock, CheckCircle2, XCircle, AlertCircle, CalendarX } from "lucide-react";
import { attendanceService } from "@/services/attendanceService";
import { useAuthStore } from "@/store/auth";

export default function Attendance() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
       fetchAttendance();
    }
  }, [user]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const data = await attendanceService.getStudentAttendance(user!.id);
      
      const mapped = data.map((item: any) => ({
        id: item.id,
        date: new Date(item.date).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' }),
        day: new Date(item.date).toLocaleDateString('uz-UZ', { weekday: 'long' }),
        status: item.status,
        course: item.groups?.name || "Asosiy Kurs"
      }));

      setRecords(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const total = records.length;
  const presentCount = records.filter(r => r.status === 'present').length;
  const absentCount = records.filter(r => r.status === 'absent').length;
  const excusedCount = records.filter(r => r.status === 'excused' || r.status === 'late').length;

  const stats = [
    { label: "Barcha darslar", value: total, icon: Clock, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Qatnashgan", value: presentCount, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Sababsiz yo'q", value: absentCount, icon: XCircle, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
    { label: "Sababli", value: excusedCount, icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
      <div>
        <h1 className="text-[28px] font-black text-[#141724] dark:text-white">Davomat</h1>
        <p className="text-slate-500 font-medium text-[15px] mt-1">Darslarga qatnashish statistikangiz va jurnalingiz.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#141724] rounded-[24px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-white/5 flex flex-col items-center justify-center text-center">
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
             </div>
             <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
             <div className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#141724] rounded-[32px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-white/5">
         <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">Oxirgi darslar jurnali</h3>
         </div>
         <div className="p-4">
            {loading ? (
               <div className="py-12 text-center text-slate-500">Davomat yuklanmoqda...</div>
            ) : records.length === 0 ? (
               <div className="py-16 text-center flex flex-col items-center justify-center">
                  <CalendarX className="w-12 h-12 text-slate-300 mb-4" />
                  <p className="text-slate-900 dark:text-white font-bold text-lg">Sizda hali davomat belgilari yo'q</p>
                  <p className="text-slate-500 text-sm mt-1">Darslar boshlangap kiritib boriladi.</p>
               </div>
            ) : (
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="py-4 px-4 text-[12px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-white/5">Sana</th>
                      <th className="py-4 px-4 text-[12px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-white/5">Kurs</th>
                      <th className="py-4 px-4 text-[12px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-white/5 text-right">Holat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                    {records.map((rec, i) => (
                      <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-default">
                        <td className="py-4 px-4">
                           <div className="font-bold text-sm text-slate-900 dark:text-white">{rec.date}</div>
                           <div className="font-medium text-xs text-slate-500">{rec.day}</div>
                        </td>
                        <td className="py-4 px-4 font-bold text-sm text-slate-600 dark:text-slate-300">{rec.course}</td>
                        <td className="py-4 px-4 text-right">
                           {rec.status === 'present' && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs font-black uppercase tracking-wider"><CheckCircle2 className="w-3.5 h-3.5" /> Kelgan</span>}
                           {rec.status === 'absent' && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 text-xs font-black uppercase tracking-wider"><XCircle className="w-3.5 h-3.5" /> Yo'q</span>}
                           {(rec.status === 'excused' || rec.status === 'late') && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 text-xs font-black uppercase tracking-wider"><AlertCircle className="w-3.5 h-3.5" /> {rec.status==='late' ? 'Kech' : 'Sababli'}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            )}
         </div>
      </div>
    </div>
  )
}

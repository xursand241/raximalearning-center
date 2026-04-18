import { useState, useEffect } from "react";
import { CheckCircle, Clock, BookX } from "lucide-react";
import { gradeService } from "@/services/gradeService";
import { useAuthStore } from "@/store/auth";

export default function Exams() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
       fetchExams();
    }
  }, [user]);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const data = await gradeService.getStudentGrades(user!.id);
      
      const mapped = data.map((item: any) => ({
        id: item.id,
        title: item.exams?.title || "Noma'lum test",
        subject: item.exams?.groups?.name || "Asosiy Kurs",
        date: new Date(item.exams?.exam_date || item.created_at).toLocaleDateString('uz-UZ'),
        status: "completed",
        score: item.score,
        maxScore: item.exams?.max_score || 100
      }));

      setExams(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
      <div>
        <h1 className="text-[28px] font-black text-[#141724] dark:text-white">Imtihonlar & Natijalar</h1>
        <p className="text-slate-500 font-medium text-[15px] mt-1">Sizning yozgan va kelgusi barcha imtihonlaringiz.</p>
      </div>

      <div className="bg-white dark:bg-[#141724] rounded-[32px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-white/5">
         <div className="p-4">
            {loading ? (
               <div className="py-12 text-center text-slate-500">Natijalar yuklanmoqda...</div>
            ) : exams.length === 0 ? (
               <div className="py-16 text-center flex flex-col items-center justify-center">
                  <BookX className="w-12 h-12 text-slate-300 mb-4" />
                  <p className="text-slate-900 dark:text-white font-bold text-lg">Sizda hali imtihon natijalari yo'q</p>
                  <p className="text-slate-500 text-sm mt-1">O'qituvchingiz test olgandan so'ng bu yerda paydo bo'ladi.</p>
               </div>
            ) : (
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="py-4 px-4 text-[12px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-white/5">Imtihon / Fani</th>
                      <th className="py-4 px-4 text-[12px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-white/5">Sana</th>
                      <th className="py-4 px-4 text-[12px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-white/5 text-right">Natija (Ball)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                    {exams.map((exam) => (
                      <tr key={exam.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-default">
                        <td className="py-4 px-4">
                           <div className="font-bold text-[15px] text-slate-900 dark:text-white mb-0.5">{exam.title}</div>
                           <div className="font-semibold text-[13px] text-slate-500">{exam.subject}</div>
                        </td>
                        <td className="py-4 px-4 font-bold text-sm text-slate-600 dark:text-slate-300">
                           {exam.date}
                        </td>
                        <td className="py-4 px-4 text-right">
                           {exam.status === 'upcoming' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 text-xs font-black uppercase tracking-wider">
                                 <Clock className="w-3.5 h-3.5" /> Kutilmoqda
                              </span>
                           ) : (
                              <div className="flex items-center justify-end gap-3">
                                 <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">To'plangan</span>
                                    <span className="text-xl font-black text-emerald-500 leading-none mt-0.5">{exam.score} <span className="text-xs text-slate-400">/ {exam.maxScore}</span></span>
                                 </div>
                                 <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4" />
                                 </div>
                              </div>
                           )}
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

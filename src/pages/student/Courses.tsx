import { useState, useEffect } from "react";
import { BookOpen, Star, Clock, User, ChevronRight } from "lucide-react";
import { groupService } from "@/services/groupService";
import { useAuthStore } from "@/store/auth";

export default function Courses() {
  const { user } = useAuthStore();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await groupService.getStudentGroups(user!.id);
      
      const mappedCourses = data.map((item: any) => ({
        id: item.group_id,
        name: item.groups?.name || "Noma'lum kurs",
        subject: item.groups?.subjects?.name || "",
        teacher: item.groups?.profiles ? `${item.groups.profiles.first_name} ${item.groups.profiles.last_name}` : "Noma'lum o'qituvchi",
        status: item.groups?.is_active ? "active" : "completed",
        progress: 0, // This would be calculated in a real app
        grade: "Baholanmagan",
        score: 0
      }));
      
      setCourses(mappedCourses);
    } catch (e) {
      console.error("Xatolik yuklashda:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
      <div>
        <h1 className="text-[28px] font-black text-[#141724] dark:text-white">Kurslar & Baholar</h1>
        <p className="text-slate-500 font-medium text-[15px] mt-1">Sizning faol o'quv dasturlaringiz va joriy o'zlashtirishingiz.</p>
      </div>

      {loading ? (
         <div className="text-center text-slate-500 mt-10">Ma'lumotlar yuklanmoqda...</div>
      ) : courses.length === 0 ? (
         <div className="text-center bg-white dark:bg-[#141724] py-16 rounded-[24px] border border-slate-100 dark:border-white/5 shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Siz hozircha hech qanday kursga qo'shilmagansiz</h3>
            <p className="text-sm text-slate-500 mt-2">Iltimos o'quv markaz ma'muriyatiga murojaat qiling.</p>
         </div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
               <div key={course.id} className="bg-white dark:bg-[#141724] rounded-[24px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-white/5 relative overflow-hidden group hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all">
                  {course.status === 'completed' && (
                     <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest uppercase">
                       Yakunlangan
                     </div>
                  )}
                  {course.status === 'active' && (
                     <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest uppercase">
                       Faol
                     </div>
                  )}
                  
                  <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                    <BookOpen className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 leading-tight">{course.name}</h3>
                  <p className="text-[12px] font-bold text-slate-400 mb-4">{course.subject}</p>
                  
                  <div className="space-y-2.5 mb-6">
                     <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
                        <User className="w-4 h-4 text-slate-400" />
                        {course.teacher}
                     </div>
                  </div>

                  <div className="pt-5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                     <div>
                       <div className="text-[11px] font-black tracking-widest text-slate-400 uppercase mb-1">O'zlashtirish</div>
                       <div className="flex items-center gap-2">
                          <span className="text-2xl font-black text-[#141724] dark:text-white">{course.score}%</span>
                          <span className="bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-bold text-sm">{course.grade}</span>
                       </div>
                     </div>
                     
                     <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 group-hover:scale-110 transition-all">
                        <ChevronRight className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            ))}
         </div>
      )}
    </div>
  )
}

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { groupService } from "@/services/groupService";
import { homeworkService } from "@/services/homeworkService";
import { gradeService } from "@/services/gradeService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Clock, Calendar, CheckCircle, ChevronRight, MessageSquare, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const [assignedGroups, setAssignedGroups] = useState<any[]>([]);
  const [pendingGrading, setPendingGrading] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTeacherData() {
      setIsLoading(true);
      try {
        if (user?.id) {
          const myGroups = await groupService.getTeacherGroups(user.id);
          setAssignedGroups(myGroups as any[]);
          
          // Count total unique students in all assigned groups
          let totalStudents = 0;
          for (const grp of myGroups) {
             const students = await groupService.getGroupStudents(grp.id);
             totalStudents += students.length;
          }
          setPendingGrading(totalStudents); // Using this for demo of a total number
        }
      } catch (err) {
        console.error("Error loading teacher dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTeacherData();
  }, [user?.id]);

  if (isLoading) return <div className="p-10 text-center">Yuklanmoqda...</div>;

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-black text-[#141724] dark:text-white">Xush kelibsiz, {user?.name?.split(' ')[0]}!</h1>
           <p className="text-gray-500 font-medium mt-1">Bugungi darslar va vazifalar ro'yxati.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-[#f8fafc] dark:border-[#0b0e14] bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-xs shadow-sm">
                   {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-4 border-[#f8fafc] dark:border-[#0b0e14] bg-[#141724] text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                 +12
              </div>
           </div>
           <span className="text-[13px] font-black text-gray-400 uppercase tracking-widest ml-2">Aktiv O'quvchilar</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-none shadow-[0_8px_30px_rgba(0,0,0,0.02)] bg-indigo-600 text-white rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-10"><Clock className="w-24 h-24"/></div>
            <CardContent className="p-8">
               <p className="text-indigo-200 font-black text-[12px] uppercase tracking-[2px] mb-2">Platforma Holati</p>
               <h3 className="text-2xl font-black mb-1">Muvaffaqiyatli</h3>
               <p className="text-indigo-100 font-medium">Barcha tizimlar ishlamoqda</p>
               <button className="mt-6 bg-white text-indigo-600 font-black px-6 py-2.5 rounded-xl shadow-lg active:scale-95 transition-all text-sm">
                  Guruhlarga o'tish
               </button>
            </CardContent>
         </Card>

         <Card className="border-none shadow-[0_8px_30px_rgba(0,0,0,0.02)] bg-white dark:bg-[#141724] rounded-3xl flex items-center p-8 gap-5 border border-gray-100 dark:border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
               <Users className="w-8 h-8" strokeWidth={2.5}/>
            </div>
            <div>
               <p className="text-gray-400 font-black text-[11px] uppercase tracking-widest">Jami O'quvchilar</p>
               <h3 className="text-[28px] font-black text-[#141724] dark:text-white">{pendingGrading}</h3>
               <p className="text-gray-500 text-xs font-bold mt-1">Sizga biriktirilgan</p>
            </div>
         </Card>

         <Card className="border-none shadow-[0_8px_30px_rgba(0,0,0,0.02)] bg-white dark:bg-[#141724] rounded-3xl flex items-center p-8 gap-5 border border-gray-100 dark:border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
               <BookOpen className="w-8 h-8" strokeWidth={2.5}/>
            </div>
            <div>
               <p className="text-gray-400 font-black text-[11px] uppercase tracking-widest">Guruhlar soni</p>
               <h3 className="text-[28px] font-black text-[#141724] dark:text-white">{assignedGroups.length}</h3>
               <p className="text-gray-500 text-xs font-bold mt-1">Faol darslar</p>
            </div>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Groups Section */}
         <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
               <h2 className="text-[20px] font-black text-[#141724] dark:text-white">Mening Guruhlarim</h2>
               <button className="text-[13px] font-black text-[#3e4cf1] hover:underline">Barchasi</button>
            </div>
            <div className="grid gap-4">
               {assignedGroups.map(grp => (
                  <Card key={grp.id} className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-3xl p-6 flex items-center justify-between hover:scale-[1.01] transition-all cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-white/10">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-xl">
                           {grp.subjects?.name[0]}
                        </div>
                        <div>
                           <h4 className="font-black text-[17px] text-[#141724] dark:text-white">{grp.name}</h4>
                           <p className="text-sm font-semibold text-gray-500">{grp.levels?.name} • {grp.room}</p>
                        </div>
                     </div>
                     <div className="flex flex-col items-end">
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black text-[10px] tracking-widest">ACTIVE</Badge>
                        <span className="text-xs font-bold mt-2 text-gray-400">12 Students</span>
                     </div>
                  </Card>
               ))}
            </div>
         </div>

         {/* Calendar/Schedule mini */}
         <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
               <h2 className="text-[20px] font-black text-[#141724] dark:text-white">Bugungi Jadval</h2>
               <button className="p-2 rounded-xl bg-white dark:bg-[#141724] shadow-sm border border-gray-100 dark:border-white/5"><Calendar className="w-5 h-5 text-gray-400"/></button>
            </div>
            <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-[32px] overflow-hidden">
               <div className="divide-y divide-gray-50 dark:divide-white/5">
                  {[
                    { time: "09:00 - 10:30", label: "General English", room: "Room 102", status: 'completed' },
                    { time: "11:00 - 12:30", label: "IELTS Speaking", room: "Room 405", status: 'now' },
                    { time: "14:00 - 15:30", label: "Advanced Writing", room: "Room 102", status: 'upcoming' },
                    { time: "16:00 - 17:30", label: "Pre-Intermediate", room: "Room 310", status: 'upcoming' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-6 flex items-center gap-6 relative group">
                       <div className="flex flex-col items-center">
                          <span className={`w-14 text-center text-[11px] font-black px-2 py-1 rounded-lg ${item.status === 'now' ? 'bg-[#3e4cf1] text-white shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-400'}`}>
                             {item.time.split(' ')[0]}
                          </span>
                       </div>
                       <div className="flex-1">
                          <h4 className={`font-black text-[15.5px] ${item.status === 'now' ? 'text-[#3e4cf1]' : 'text-gray-800 dark:text-white'}`}>{item.label}</h4>
                          <p className="text-[13px] font-medium text-gray-500">{item.room}</p>
                       </div>
                       {item.status === 'completed' ? <CheckCircle className="w-5 h-5 text-emerald-500"/> : <button className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-400 group-hover:bg-[#3e4cf1]/10 group-hover:text-[#3e4cf1] transition-all flex items-center justify-center"><ChevronRight className="w-4 h-4"/></button>}
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}

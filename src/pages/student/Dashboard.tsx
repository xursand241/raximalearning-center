import { useAuthStore } from "@/store/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Award, Clock, ArrowRight, Zap, Target, Book } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-black text-[#141724] dark:text-white">Xush kelibsiz, {user?.name?.split(' ')[0]}!</h1>
           <p className="text-gray-500 font-medium mt-1">Sizda bugun 2 ta dars va 1 ta uy vazifasi bor.</p>
        </div>
        
        <div className="flex bg-white dark:bg-[#141724] p-1.5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
           <div className="px-5 py-2.5 rounded-xl bg-[#3e4cf1] text-white shadow-lg text-[13.5px] font-black">
              2026-Semester 1
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-2xl">
                <CardContent className="p-6">
                   <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4"><Zap className="w-5 h-5"/></div>
                   <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest text-left">Level Score</p>
                   <p className="text-2xl font-black mt-1 text-left">2,450</p>
                </CardContent>
             </Card>
             <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-2xl">
                <CardContent className="p-6">
                   <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4"><Target className="w-5 h-5"/></div>
                   <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest text-left">Davomat</p>
                   <p className="text-2xl font-black mt-1 text-left">96%</p>
                </CardContent>
             </Card>
             <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-2xl col-span-2 md:col-span-1">
                <CardContent className="p-6">
                   <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4"><Award className="w-5 h-5"/></div>
                   <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest text-left">Yutuqlar</p>
                   <p className="text-2xl font-black mt-1 text-left">12 ta</p>
                </CardContent>
             </Card>
          </div>

          {/* Active Courses */}
          <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-3xl overflow-hidden">
             <CardHeader className="px-8 py-6 flex flex-row justify-between items-center border-b border-gray-50 dark:border-white/5">
                <CardTitle className="text-[18px] font-black">Mening Guruhlarim</CardTitle>
                <button className="text-[13px] font-black text-[#3e4cf1]">Barchasi</button>
             </CardHeader>
             <div className="divide-y divide-gray-50 dark:divide-white/5">
                {[
                  { name: "English B1 Foundation", teacher: "Ms. Dilfuza", time: "Mon/Wed/Fri", progress: 65, color: "bg-indigo-600" },
                  { name: "IELTS Intensive", teacher: "Mr. Javohir", time: "Tue/Thu/Sat", progress: 30, color: "bg-violet-600" }
                ].map((course, i) => (
                  <div key={i} className="p-8 hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-all group">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                           <div className={`w-14 h-14 rounded-2xl ${course.color} text-white flex items-center justify-center text-xl font-black`}>
                              {course.name[0]}
                           </div>
                           <div>
                              <h4 className="text-[17px] font-black text-[#141724] dark:text-white group-hover:text-[#3e4cf1] transition-colors">{course.name}</h4>
                              <p className="text-[13px] font-medium text-gray-500">{course.teacher} • {course.time}</p>
                           </div>
                        </div>
                        <div className="w-full md:w-48 space-y-2">
                           <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                              <span>PROGRESS</span>
                              <span className="text-[#141724] dark:text-white">{course.progress}%</span>
                           </div>
                           <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className={`${course.color} h-full rounded-full`} style={{ width: `${course.progress}%` }}></div>
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </Card>
        </div>

        <div className="space-y-8">
           {/* Homework Shortcut */}
           <Card className="border-none shadow-xl bg-[#141724] text-white rounded-[40px] overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500"><Book className="w-24 h-24"/></div>
              <CardContent className="p-10 relative z-10">
                 <Badge className="bg-white/10 text-white border-none font-black text-[10px] tracking-widest mb-6">YANGI VAZIFA</Badge>
                 <h2 className="text-2xl font-black leading-tight">Advanced Essay: Environmental Impact</h2>
                 <div className="flex items-center gap-2 mt-4 text-indigo-300 font-bold text-sm">
                    <Clock className="w-4 h-4" /> 24 soat qoldi
                 </div>
                 <button className="w-full mt-10 bg-[#3e4cf1] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                    VAZIFANI KO'RISH <ArrowRight className="w-4 h-4"/>
                 </button>
              </CardContent>
           </Card>

           {/* Performance Tip */}
           <Card className="border-none shadow-sm bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-6">
              <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="font-black text-[#141724] dark:text-white">Ajoyib natija!</h4>
                    <p className="text-[13px] text-gray-500 mt-1">Siz IELTS darslarida o'tgan haftaga qaraganda 15% yaxshiroq natija ko'rsatdingiz. Shu ruhda davom eting!</p>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}

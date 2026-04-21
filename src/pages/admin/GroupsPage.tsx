import { useState, useEffect } from "react";
import { Search, Plus, Users, Calendar, MapPin, MoreHorizontal, BookOpen, Clock, X, LayoutGrid, LayoutList, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { groupService } from "@/services/groupService";
import { academicService } from "@/services/academicService";
import type { Subject, Level } from "@/services/academicService";
import { profileService } from "@/services/profileService";

export default function GroupsPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  
  const [newGroup, setNewGroup] = useState({ name: "", teacherId: "", room: "", capacity: 20, subjectId: "", levelId: "" });
  const [groups, setGroups] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [grpData, subjData, lvlData, tchrData] = await Promise.all([
        groupService.getAllGroups(),
        academicService.getSubjects(),
        academicService.getLevels(),
        profileService.getTeachersWithStats()
      ]);
      
      setSubjects(subjData);
      setLevels(lvlData);
      setTeachers(tchrData);
      
      const enrichedGroups = await Promise.all(grpData.map(async (g) => {
        const studentList = await groupService.getGroupStudents(g.id);
        return {
          id: g.id,
          name: g.name,
          teacher: g.profiles ? `${g.profiles.first_name} ${g.profiles.last_name}` : "Tayinlanmagan",
          schedule: g.schedule_json?.formatted || "Belgilanmagan", // Using real schedule if exists
          room: g.room,
          students: studentList.length,
          capacity: 20,
          status: g.is_active ? (studentList.length >= 20 ? "To'la" : "Aktiv") : "Nofaol",
          subject: g.subjects?.name || "Fan"
        };
      }));
      
      setGroups(enrichedGroups);
    } catch (err) {
      console.error("Error fetching group data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroup.name || !newGroup.subjectId || !newGroup.teacherId || !newGroup.levelId) return;

    setIsLoading(true);
    try {
      const g = {
        name: newGroup.name,
        subject_id: newGroup.subjectId,
        level_id: newGroup.levelId,
        teacher_id: newGroup.teacherId,
        room: newGroup.room,
        schedule_json: {},
        start_date: new Date().toISOString()
      };
      await groupService.createGroup(g as any);
      fetchInitialData();
      setIsModalOpen(false);
      setNewGroup({ name: "", teacherId: "", room: "", capacity: 20, subjectId: "", levelId: "" });
    } catch (err) {
      console.error("Error creating group:", err);
      alert("Guruh yaratishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic calculations
  const totalGroups = groups.length;
  const activeGroups = groups.filter(g => g.status === 'Aktiv' || g.status === "To'la").length;
  const openGroups = groups.filter(g => g.status === 'Qabul ochiq' || g.status === 'Aktiv').length;
  
  const totalStudents = groups.reduce((acc, curr) => acc + curr.students, 0);
  const totalCapacity = groups.reduce((acc, curr) => acc + curr.capacity, 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 0;

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(search.toLowerCase()) || 
    group.teacher.toLowerCase().includes(search.toLowerCase()) ||
    group.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6 pb-12 max-w-[1600px] mx-auto">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <Badge variant="outline" className="text-[10px] uppercase tracking-widest font-black border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">Akademiya bo'limi</Badge>
           </div>
           <h1 className="text-3xl sm:text-[34px] font-black tracking-tight text-[#141724] dark:text-white leading-tight">Guruhlar arxitekturasi</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Akademiyadagi barcha sinflar, dars jadvallari va o'quvchilarni intellektual boshqarish.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button onClick={() => setIsModalOpen(true)} className="bg-[#141724] hover:bg-[#202538] dark:bg-white dark:hover:bg-gray-200 dark:text-[#141724] text-white font-bold h-12 px-6 rounded-[12px] shadow-lg transition-transform hover:-translate-y-0.5">
             <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} /> Yangi Guruh
           </Button>
        </div>
      </div>

      {/* KPI Cards for Groups */}
      <div className="grid gap-4 md:grid-cols-4">
         <div className="bg-white dark:bg-[#141724] p-5 lg:p-6 rounded-3xl border border-gray-100/50 dark:border-white/5 flex items-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform cursor-default relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-[0.03] dark:opacity-[0.02] transform group-hover:scale-110 transition-transform duration-500 pointer-events-none">
               <BookOpen className="w-32 h-32" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 flex items-center justify-center shrink-0 transition-colors">
               <BookOpen className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="relative z-10">
               <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Jami Guruhlar</p>
               <p className="text-[32px] font-black text-[#141724] dark:text-white leading-none mt-1 tracking-tight">{totalGroups}</p>
            </div>
         </div>
         
         <div className="bg-white dark:bg-[#141724] p-5 lg:p-6 rounded-3xl border border-gray-100/50 dark:border-white/5 flex items-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform cursor-default relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-[0.03] dark:opacity-[0.02] transform group-hover:scale-110 transition-transform duration-500 pointer-events-none">
               <Calendar className="w-32 h-32" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center shrink-0 transition-colors">
               <Calendar className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="relative z-10">
               <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Aktiv Guruhlar</p>
               <p className="text-[32px] font-black text-[#141724] dark:text-white leading-none mt-1 tracking-tight">{activeGroups}</p>
            </div>
         </div>

         <div className="bg-white dark:bg-[#141724] p-5 lg:p-6 rounded-3xl border border-gray-100/50 dark:border-white/5 flex items-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform cursor-default relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-[0.03] dark:opacity-[0.02] transform group-hover:scale-110 transition-transform duration-500 pointer-events-none">
               <Users className="w-32 h-32" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500 flex items-center justify-center shrink-0 transition-colors">
               <Users className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="relative z-10">
               <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Qabul Ochiq</p>
               <p className="text-[32px] font-black text-[#141724] dark:text-white leading-none mt-1 tracking-tight">{openGroups}</p>
            </div>
         </div>

         <div className="bg-gradient-to-br from-[#141724] to-[#1e2336] dark:from-[#3e4cf1] dark:to-indigo-500 border-none p-5 lg:p-6 rounded-3xl text-white flex items-center gap-5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-transform cursor-default relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-[0.05] transform group-hover:scale-110 transition-transform duration-500 pointer-events-none">
               <MapPin className="w-32 h-32" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
               <MapPin className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="relative z-10">
               <p className="text-[11px] font-black text-gray-300 dark:text-blue-100 uppercase tracking-widest">Xonalar Bandligi</p>
               <div className="flex items-baseline gap-1 mt-1">
                  <p className="text-[32px] font-black text-white leading-none tracking-tight">{occupancyRate}</p>
                  <span className="text-[16px] font-bold text-gray-400 dark:text-blue-200">%</span>
               </div>
            </div>
         </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white dark:bg-[#141724] p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border-none flex flex-col md:flex-row justify-between items-center gap-2 relative z-10">
         <div className="relative w-full md:max-w-md h-12 flex items-center px-4 bg-gray-50/50 dark:bg-white/[0.02] rounded-xl border border-transparent focus-within:border-[#3e4cf1]/30 transition-colors">
            <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
            <Input 
               placeholder="Guruh nomi yoki o'qituvchi orqali aqlli izlash..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="border-none bg-transparent shadow-none focus-visible:ring-0 px-0 h-full text-[14px] font-bold" 
            />
         </div>
         <div className="flex bg-gray-50/50 dark:bg-white/[0.02] p-1 rounded-xl w-full md:w-auto h-12 items-center">
            <button 
               onClick={() => setViewMode("grid")}
               className={`flex-1 md:w-auto h-full px-4 rounded-lg flex items-center justify-center text-[13px] font-black transition-all ${viewMode === "grid" ? "bg-white dark:bg-[#1f2438] text-[#141724] dark:text-white shadow-sm" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}
            >
               <LayoutGrid className="w-4 h-4 mr-2" /> Karta
            </button>
            <button 
               onClick={() => setViewMode("list")}
               className={`flex-1 md:w-auto h-full px-4 rounded-lg flex items-center justify-center text-[13px] font-black transition-all ${viewMode === "list" ? "bg-white dark:bg-[#1f2438] text-[#141724] dark:text-white shadow-sm" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}
            >
               <LayoutList className="w-4 h-4 mr-2" /> Jadval
            </button>
         </div>
      </div>

      {/* Grid Content */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {filteredGroups.length > 0 ? filteredGroups.map((group, idx) => (
          <div key={group.id} className={`border border-gray-100/50 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer ${isLoading ? 'opacity-50 animate-pulse' : ''} ${viewMode === 'grid' ? 'rounded-3xl' : 'rounded-2xl md:flex md:items-center p-3'}`} style={{ animationDelay: `${idx * 50}ms` }}>
             
             {viewMode === "grid" ? (
               <>
                 {/* GRID VIEW HEADER */}
                 <div className="p-6 border-b border-gray-50 dark:border-white/5 relative">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.02] dark:opacity-[0.05] pointer-events-none transform group-hover:scale-125 transition-transform duration-700">
                       <BookOpen className="w-24 h-24" />
                    </div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                       <Badge variant="outline" className="border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest px-3 py-1">
                          {group.subject}
                       </Badge>
                       <button className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#141724] dark:hover:text-white transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                       </button>
                    </div>
                    <h3 className="text-[20px] font-black text-[#141724] dark:text-white tracking-tight group-hover:text-[#3e4cf1] transition-colors line-clamp-1 relative z-10">{group.name}</h3>
                    <p className="text-[13.5px] font-bold text-gray-500 mt-1.5 flex items-center gap-1.5 relative z-10">
                       {group.teacher}
                    </p>
                 </div>

                 {/* GRID VIEW DETAILS */}
                 <div className="p-6 space-y-5 bg-gray-50/30 dark:bg-transparent">
                    <div className="flex gap-4 items-center">
                       <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/[0.02] shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-gray-500" />
                       </div>
                       <div className="flex flex-col justify-center">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dars vaqti</p>
                          <p className="text-[13px] font-bold text-[#141724] dark:text-gray-300 mt-0.5 line-clamp-1">{group.schedule}</p>
                       </div>
                    </div>

                    <div className="flex gap-4 items-center">
                       <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/[0.02] shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-gray-500" />
                       </div>
                       <div className="flex flex-col justify-center">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Belgilangan Xona</p>
                          <p className="text-[13px] font-bold text-[#141724] dark:text-gray-300 mt-0.5">{group.room}</p>
                       </div>
                    </div>

                    {/* Progress */}
                    <div className="pt-3">
                       <div className="flex justify-between items-end mb-2.5">
                          <div className="flex items-center gap-2">
                             <Users className="w-4 h-4 text-gray-400" />
                             <span className="text-[12px] font-black uppercase tracking-wider text-gray-500">Tarkib</span>
                          </div>
                          <span className="text-[14px] font-black text-[#141724] dark:text-white">
                             {group.students} <span className="text-gray-400">/ {group.capacity}</span>
                          </span>
                       </div>
                       <div className="w-full bg-gray-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden flex">
                          <div 
                             className={`h-full rounded-full transition-all duration-1000 ${group.students >= group.capacity ? 'bg-gradient-to-r from-rose-400 to-rose-500' : 'bg-gradient-to-r from-emerald-400 to-emerald-500'}`} 
                             style={{ width: `${(group.students / group.capacity) * 100}%` }}
                          ></div>
                       </div>
                    </div>
                 </div>

                 {/* GRID VIEW FOOTER */}
                 <div className="px-6 py-4 bg-white dark:bg-white/[0.01] flex items-center justify-between border-t border-gray-100 dark:border-white/5">
                    <Badge 
                       variant="outline" 
                       className={`border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm ${
                          group.status === 'To\'la' ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400' : 
                          group.status === "Qabul ochiq" ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 
                          'bg-blue-50 text-[#3e4cf1] dark:bg-[#3e4cf1]/10 dark:text-blue-400'
                       }`}
                    >
                       {group.status}
                    </Badge>
                    <div className="flex items-center gap-1 group-hover:text-[#3e4cf1] transition-colors">
                       <span className="text-[11px] font-bold text-gray-400 group-hover:text-[#3e4cf1]">Batafsil</span>
                       <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-[#3e4cf1]" />
                    </div>
                 </div>
               </>
             ) : (
               <>
                 {/* LIST VIEW (Compact Row) */}
                 <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full px-4 py-2">
                    <div className="flex items-center gap-4 min-w-[240px]">
                       <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-500/20">
                          <BookOpen className="w-5 h-5" />
                       </div>
                       <div>
                          <Badge variant="outline" className="border-none bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 mb-1 inline-flex">
                            {group.subject}
                          </Badge>
                          <h3 className="text-[16px] font-black text-[#141724] dark:text-white tracking-tight group-hover:text-[#3e4cf1] transition-colors line-clamp-1">{group.name}</h3>
                          <p className="text-[12px] font-bold text-gray-500 mt-0.5">{group.teacher}</p>
                       </div>
                    </div>

                    <div className="hidden md:flex flex-col justify-center min-w-[180px]">
                       <div className="flex items-center gap-1.5 mb-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-[12px] font-bold text-[#141724] dark:text-gray-300 line-clamp-1">{group.schedule}</span>
                       </div>
                       <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-[12px] font-bold text-[#141724] dark:text-gray-300">{group.room}</span>
                       </div>
                    </div>

                    <div className="w-full md:w-32 shrink-0 pr-4">
                       <div className="flex justify-between items-end mb-1.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Tarkib</span>
                          <span className="text-[12px] font-black text-[#141724] dark:text-white">
                             {group.students} / {group.capacity}
                          </span>
                       </div>
                       <div className="w-full bg-gray-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden flex">
                          <div 
                             className={`h-full rounded-full ${group.students >= group.capacity ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                             style={{ width: `${(group.students / group.capacity) * 100}%` }}
                          ></div>
                       </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-4 md:pl-4 md:border-l border-gray-100 dark:border-white/5">
                       <Badge 
                          variant="outline" 
                          className={`border-none px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-transparent ${
                             group.status === 'To\'la' ? 'text-rose-600 dark:text-rose-400' : 
                             group.status === "Qabul ochiq" ? 'text-emerald-600 dark:text-emerald-400' : 
                             'text-[#3e4cf1] dark:text-blue-400'
                          }`}
                       >
                          {group.status}
                       </Badge>
                       <button className="w-8 h-8 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-400 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                       </button>
                    </div>
                 </div>
               </>
             )}
          </div>
        )) : (
          <div className="md:col-span-2 lg:col-span-3 py-20 flex flex-col items-center justify-center bg-white dark:bg-[#141724] rounded-3xl border border-dashed border-gray-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-5 border border-gray-100 dark:border-white/5">
               <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-black text-[#141724] dark:text-white mb-2 tracking-tight">Kechirasiz, guruh topilmadi</h3>
            <p className="text-gray-500 font-medium text-[15px] text-center max-w-sm">
              Siz izlayotgan mezonlar bo'yicha hech qanday natija yo'q. Ehtimol yangi guruh yaratish vaqti kelgandir?
            </p>
            <Button onClick={() => setIsModalOpen(true)} className="mt-6 bg-[#141724] dark:bg-white text-white dark:text-[#141724] font-bold px-6 rounded-xl h-11">
               <Plus className="w-4 h-4 mr-2" /> Yangi yaratish
            </Button>
          </div>
        )}
      </div>

      {/* Premium Create Group Modal (Glassmorphic & Animated) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-[#0b0e14]/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="bg-white dark:bg-[#141724] rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-2xl overflow-hidden relative z-10 animate-in zoom-in-[0.98] fade-in duration-300 border border-gray-100/50 dark:border-white/10 flex flex-col max-h-[90vh]">
            
            <div className="p-6 md:p-8 border-b border-gray-50 dark:border-white/5 flex justify-between items-start bg-gradient-to-b from-gray-50/50 to-transparent dark:from-white/[0.02] shrink-0">
              <div className="flex gap-4 items-start">
                 <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm border border-blue-100/50 dark:border-blue-500/20">
                    <Plus className="w-6 h-6" strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-black text-[#141724] dark:text-white tracking-tight leading-none mb-1.5">Intellektual Guruh Yaratish</h2>
                   <p className="text-[14px] font-medium text-gray-500">O'quv tizimining yangi tarkibiy qismini platformaga kiritish formasi.</p>
                 </div>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateGroup} className="p-6 md:p-8 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
              <div className="grid gap-6">
                 <div className="space-y-2">
                   <label className="text-[13px] font-black uppercase tracking-widest text-gray-500 flex items-center"><span className="text-rose-500 mr-1">*</span> Guruhning Rasmiy Nomi</label>
                   <Input required value={newGroup.name} onChange={(e) => setNewGroup({...newGroup, name: e.target.value})} placeholder="Masalan: IELTS Foundation B" className="h-14 bg-gray-50/50 dark:bg-[#0b0e14]/50 border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1] focus-visible:border-[#3e4cf1] text-[15px] font-bold rounded-xl shadow-inner transition-all" />
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[13px] font-black uppercase tracking-widest text-gray-500 flex items-center"><span className="text-rose-500 mr-1">*</span> Biriktirilgan Fan</label>
                     <select 
                       required 
                       value={newGroup.subjectId} 
                       onChange={(e) => setNewGroup({...newGroup, subjectId: e.target.value})}
                       className="w-full h-14 px-4 bg-gray-50/50 dark:bg-[#0b0e14]/50 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#3e4cf1] text-[15px] font-bold shadow-inner outline-none"
                     >
                       <option value="">Fanni tanlang</option>
                       {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[13px] font-black uppercase tracking-widest text-gray-500 flex items-center"><span className="text-rose-500 mr-1">*</span> O'qituvchi</label>
                     <select 
                       required 
                       value={newGroup.teacherId} 
                       onChange={(e) => setNewGroup({...newGroup, teacherId: e.target.value})}
                       className="w-full h-14 px-4 bg-gray-50/50 dark:bg-[#0b0e14]/50 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#3e4cf1] text-[15px] font-bold shadow-inner outline-none"
                     >
                       <option value="">O'qituvchini tanlang</option>
                       {teachers.map(t => <option key={t.id} value={t.id}>{t.first_name} {t.last_name}</option>)}
                     </select>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[13px] font-black uppercase tracking-widest text-gray-500 flex items-center"><span className="text-rose-500 mr-1">*</span> Bosqich (Level)</label>
                     <select 
                       required 
                       value={newGroup.levelId} 
                       onChange={(e) => setNewGroup({...newGroup, levelId: e.target.value})}
                       className="w-full h-14 px-4 bg-gray-50/50 dark:bg-[#0b0e14]/50 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#3e4cf1] text-[15px] font-bold shadow-inner outline-none"
                     >
                       <option value="">Bosqichni tanlang</option>
                       {levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[13px] font-black uppercase tracking-widest text-gray-500 flex items-center"><span className="text-rose-500 mr-1">*</span> Ajratilgan Xona</label>
                     <Input required value={newGroup.room} onChange={(e) => setNewGroup({...newGroup, room: e.target.value})} placeholder="Xona-12" className="h-14 bg-gray-50/50 dark:bg-[#0b0e14]/50 border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1] text-[15px] font-bold rounded-xl shadow-inner" />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-[13px] font-black uppercase tracking-widest text-gray-500 flex items-center"><span className="text-rose-500 mr-1">*</span> O'rinlar Soni (Kapasitet)</label>
                   <Input type="number" required min="1" value={newGroup.capacity} onChange={(e) => setNewGroup({...newGroup, capacity: parseInt(e.target.value) || 0})} placeholder="20" className="h-14 bg-gray-50/50 dark:bg-[#0b0e14]/50 border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1] focus-visible:border-[#3e4cf1] text-[15px] font-bold rounded-xl shadow-inner transition-all" />
                 </div>
              </div>

              <div className="pt-6 flex gap-4 mt-8 border-t border-gray-100 dark:border-white/5">
                <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1 h-14 font-black text-[15px] rounded-xl border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                  Bekor qilish
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1 h-14 bg-[#141724] hover:bg-[#202538] dark:bg-white dark:hover:bg-gray-200 text-white dark:text-[#141724] font-black text-[15px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all">
                  {isLoading ? 'Yaratilmoqda...' : 'Guruhni saqlash'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

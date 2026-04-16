import { useState, useEffect } from "react";
import { Check, X, Clock, UserMinus, Search, ChevronRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { attendanceService } from "@/services/attendanceService";
import type { AttendanceRecord } from "@/services/attendanceService";
import { profileService } from "@/services/profileService";
import type { Profile } from "@/services/profileService";
import { smsService } from "@/services/smsService";
import { useAuthStore } from "@/store/auth";

import { groupService } from "@/services/groupService";
import type { Group } from "@/services/groupService";

export default function AttendanceModule() {
  const { user } = useAuthStore();
  const [roster, setRoster] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teacherGroups, setTeacherGroups] = useState<any[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadInitialData() {
       setIsLoading(true);
       try {
          if (user?.id) {
             const groups = await groupService.getTeacherGroups(user.id);
             setTeacherGroups(groups as any[]);
             if (groups.length > 0) {
                setSelectedGroupId(groups[0].id);
             } else {
                setIsLoading(false);
             }
          }
       } catch (err) {
          console.error("Error loading teacher groups:", err);
          setIsLoading(false);
       }
    }
    loadInitialData();
  }, [user?.id]);

  useEffect(() => {
    async function fetchRoster() {
      if (!selectedGroupId) return;
      setIsLoading(true);
      try {
        const students = await groupService.getGroupStudents(selectedGroupId);
        setRoster(students.map((s: any) => ({
          id: s.profiles.id,
          displayId: s.profiles.id.slice(0, 5).toUpperCase(),
          name: `${s.profiles.first_name} ${s.profiles.last_name}`,
          phone: s.profiles.phone,
          status: null,
          smsSent: false
        })));
      } catch (err) {
        console.error("Error fetching roster:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRoster();
  }, [selectedGroupId]);

  const handleMark = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setRoster(prev => prev.map(s => {
       if (s.id === studentId) {
          return { ...s, status, smsSent: status === 'absent' ? true : false };
       }
       return s;
    }));
  };

  const handleSubmit = async () => {
    const records = roster
      .filter(s => s.status !== null)
      .map(s => ({
        student_id: s.id,
        group_id: selectedGroupId,
        date: new Date().toISOString().split('T')[0],
        status: s.status,
        teacher_id: user?.id || 'mock-teacher-id'
      }));

    if (records.length === 0) return;

    setIsSaving(true);
    try {
      await attendanceService.markAttendance(records as any);
      
      // Trigger SMS for absent students
      const absentStudents = roster.filter(s => s.status === 'absent');
      for (const student of absentStudents) {
        await smsService.logSms({
          student_id: student.id,
          phone: student.phone || "998900000000",
          message: `Hurmatli ota-ona, farzandingiz ${student.name} bugun darsga kelmadi. Raxima Academy.`,
          status: 'pending'
        });
      }

      alert("Davomat saqlandi va xabarlar yuborishga tayyorlandi!");
    } catch (err) {
      console.error("Error saving attendance:", err);
      alert("Xatolik yuz berdi.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading && teacherGroups.length === 0) return <div className="p-10 text-center">Guruhlar yuklanmoqda...</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 max-w-4xl">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kundalik Davomat</h1>
           <div className="flex items-center text-muted-foreground mt-2 text-sm font-medium">
              <span>Haqiqiy vaqt rejimida yo'qlama</span>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-primary">{new Date().toLocaleDateString('uz-UZ', { month: 'long', day: 'numeric' })}</span>
           </div>
        </div>

        <select 
          value={selectedGroupId} 
          onChange={(e) => setSelectedGroupId(e.target.value)}
          className="h-11 px-4 bg-white dark:bg-card border border-border/50 rounded-xl text-sm font-bold shadow-sm outline-none focus:ring-2 focus:ring-primary/20 min-w-[240px]"
        >
          {teacherGroups.length > 0 ? teacherGroups.map(g => (
             <option key={g.id} value={g.id}>{g.name} ({g.subjects?.name})</option>
          )) : (
             <option value="">Guruhlar topilmadi</option>
          )}
        </select>
      </div>

      <div className="bg-white dark:bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden">
         <div className="p-4 border-b border-border/40 bg-gray-50/50 dark:bg-card flex items-center justify-between">
            <div className="relative w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <Input placeholder="O'quvchini qidirish..." className="pl-9 h-9 border-gray-200" />
            </div>
            
            <div className="flex items-center gap-4 text-sm font-medium">
               <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Keldi: {roster.filter(s => s.status === 'present').length}</div>
               <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Kelmadi: {roster.filter(s => s.status === 'absent').length}</div>
            </div>
         </div>

         <div className="divide-y divide-border/40">
            {roster.map(student => (
               <div key={student.id} className={cn("p-4 flex items-center justify-between transition-colors", student.status ? "bg-gray-50/30 dark:bg-gray-900/10" : "")}>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                        {student.name.charAt(0)}
                     </div>
                     <div>
                        <div className="font-bold text-gray-900 dark:text-white">{student.name}</div>
                        <div className="text-[13px] font-medium text-muted-foreground flex items-center gap-2">
                           {student.displayId}
                           {student.smsSent && <Badge variant="outline" className="text-[10px] h-4 leading-none bg-blue-50 text-blue-600 border-blue-200 px-1.5">SMS Yuborildi</Badge>}
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-2">
                     <button 
                        onClick={() => handleMark(student.id, 'present')}
                        className={cn("w-10 h-10 rounded-xl flex items-center justify-center border transition-all", 
                        student.status === 'present' ? "bg-emerald-500 border-emerald-600 text-white shadow-lg" : "border-gray-100 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200")}
                     >
                        <Check className="w-5 h-5" />
                     </button>
                     <button 
                        onClick={() => handleMark(student.id, 'late')}
                        className={cn("w-10 h-10 rounded-xl flex items-center justify-center border transition-all", 
                        student.status === 'late' ? "bg-amber-500 border-amber-600 text-white shadow-lg" : "border-gray-100 text-gray-400 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200")}
                     >
                        <Clock className="w-4 h-4" />
                     </button>
                     <button 
                        onClick={() => handleMark(student.id, 'absent')}
                        className={cn("w-10 h-10 rounded-xl flex items-center justify-center border transition-all", 
                        student.status === 'absent' ? "bg-rose-500 border-rose-600 text-white shadow-lg" : "border-gray-100 text-gray-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200")}
                     >
                        <X className="w-5 h-5" />
                     </button>
                     <button 
                        onClick={() => handleMark(student.id, 'excused')}
                        className={cn("w-10 h-10 rounded-xl flex items-center justify-center border transition-all", 
                        student.status === 'excused' ? "bg-gray-600 border-gray-700 text-white shadow-lg" : "border-gray-100 text-gray-400 hover:bg-gray-100 hover:text-gray-600 hover:border-gray-300")}
                     >
                        <UserMinus className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            ))}
         </div>

         <div className="p-6 border-t border-border/40 bg-gray-50/50 dark:bg-card/50 flex justify-end">
            <Button 
               onClick={handleSubmit} 
               disabled={isSaving}
               className="bg-[#3e4cf1] hover:bg-blue-700 text-white font-black px-10 h-12 rounded-xl shadow-lg shadow-blue-500/20"
            >
               {isSaving ? "Saqlanmoqda..." : "DAVOMATNI TASDIQLASH"}
            </Button>
         </div>
      </div>
    </div>
  );
}

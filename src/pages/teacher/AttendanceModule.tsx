import { useState } from "react";
import { Check, X, Clock, UserMinus, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock student roster
const initialRoster = [
  { id: "S1042", name: "Azizov Timur", status: null, smsSent: false },
  { id: "S1043", name: "Malikova Iroda", status: null, smsSent: false },
  { id: "S1044", name: "Rahmonov Jasur", status: null, smsSent: false },
  { id: "S1045", name: "Usmonova Laylo", status: null, smsSent: false },
  { id: "S1046", name: "Karimov Sardor", status: null, smsSent: false },
];

export default function AttendanceModule() {
  const [roster, setRoster] = useState(initialRoster);
  const [group, setGroup] = useState("English B1+ (Mon/Wed/Fri)");

  const handleMark = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setRoster(prev => prev.map(s => {
       if (s.id === studentId) {
          return { ...s, status, smsSent: status === 'absent' ? true : false };
       }
       return s;
    }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Daily Attendance</h1>
        <div className="flex items-center text-muted-foreground mt-2 text-sm">
           <span>{group}</span>
           <ChevronRight className="w-4 h-4 mx-2" />
           <span className="font-medium text-gray-900 dark:text-white">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden">
         <div className="p-4 border-b border-border/40 bg-gray-50/50 dark:bg-card flex items-center justify-between">
            <div className="relative w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <Input placeholder="Search student..." className="pl-9 h-9 border-gray-200" />
            </div>
            
            <div className="flex items-center gap-4 text-sm font-medium">
               <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Present: {roster.filter(s => s.status === 'present').length}</div>
               <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Absent: {roster.filter(s => s.status === 'absent').length}</div>
            </div>
         </div>

         <div className="divide-y divide-border/40">
            {roster.map(student => (
               <div key={student.id} className={cn("p-4 flex items-center justify-between transition-colors", student.status ? "bg-gray-50/30 dark:bg-gray-900/10" : "")}>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                        {student.name.charAt(0)}
                     </div>
                     <div>
                        <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
                        <div className="text-[13px] text-muted-foreground flex items-center gap-2">
                           {student.id}
                           {student.smsSent && <Badge variant="outline" className="text-[10px] h-4 leading-none bg-blue-50 text-blue-600 border-blue-200 px-1.5">SMS Sent</Badge>}
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-2">
                     <button 
                        onClick={() => handleMark(student.id, 'present')}
                        className={cn("w-10 h-10 rounded-full flex items-center justify-center border transition-all", 
                        student.status === 'present' ? "bg-emerald-500 border-emerald-600 text-white shadow-inner" : "border-gray-200 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200")}
                     >
                        <Check className="w-5 h-5" />
                     </button>
                     <button 
                        onClick={() => handleMark(student.id, 'late')}
                        className={cn("w-10 h-10 rounded-full flex items-center justify-center border transition-all", 
                        student.status === 'late' ? "bg-amber-500 border-amber-600 text-white shadow-inner" : "border-gray-200 text-gray-400 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200")}
                     >
                        <Clock className="w-4 h-4" />
                     </button>
                     <button 
                        onClick={() => handleMark(student.id, 'absent')}
                        className={cn("w-10 h-10 rounded-full flex items-center justify-center border transition-all", 
                        student.status === 'absent' ? "bg-rose-500 border-rose-600 text-white shadow-inner" : "border-gray-200 text-gray-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200")}
                     >
                        <X className="w-5 h-5" />
                     </button>
                     <button 
                        onClick={() => handleMark(student.id, 'excused')}
                        className={cn("w-10 h-10 rounded-full flex items-center justify-center border transition-all", 
                        student.status === 'excused' ? "bg-gray-600 border-gray-700 text-white shadow-inner" : "border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-600 hover:border-gray-300")}
                     >
                        <UserMinus className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            ))}
         </div>

         <div className="p-4 border-t border-border/40 bg-gray-50 dark:bg-card flex justify-end">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">Submit Final Register</Button>
         </div>
      </div>
    </div>
  );
}

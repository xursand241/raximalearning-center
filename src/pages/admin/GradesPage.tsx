import { useState } from "react";
import { Search, Filter, Trophy, Star, TrendingUp, AlertTriangle, FileText, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GradesPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"none" | "desc" | "asc">("none");
  const [isNewExamOpen, setIsNewExamOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [newDate, setNewDate] = useState("");

  const [exams, setExams] = useState([
    { id: "EX-101", title: "Oylik Test (Mart)", group: "IELTS Foundation", date: "24 Mart, 2026", avgScore: 78, students: 18 },
    { id: "EX-102", title: "Mock Exam #4", group: "IELTS B2", date: "20 Mart, 2026", avgScore: 6.5, students: 25 },
    { id: "EX-103", title: "Oral Test", group: "Kids Math", date: "15 Mart, 2026", avgScore: 85, students: 12 },
  ]);

  const studentGrades = [
    { id: "ST-001", name: "Azizov Timur", group: "IELTS B2", exam: "Mock Exam #4", score: "7.0", maxScore: "9.0", status: "A'lo", trend: "up" },
    { id: "ST-002", name: "Malikova Iroda", group: "Ona Tili B1", exam: "Blok test", score: "88", maxScore: "100", status: "Yaxshi", trend: "up" },
    { id: "ST-003", name: "Karimov Sardor", group: "Math Advanced", exam: "Oylik Test", score: "45", maxScore: "100", status: "Qoniqarsiz", trend: "down" },
    { id: "ST-004", name: "Usmonova Laylo", group: "Python 02", exam: "Loyiha ishi", score: "95", maxScore: "100", status: "A'lo", trend: "up" },
    { id: "ST-005", name: "Alimov Jasur", group: "IELTS Foundation", exam: "Listening Test", score: "4.5", maxScore: "9.0", status: "Qoniqarsiz", trend: "down" },
  ];

  const handleSort = () => {
    if (sortBy === "none") setSortBy("desc");
    else if (sortBy === "desc") setSortBy("asc");
    else setSortBy("none");
  };

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newGroup || !newDate) return;
    
    setExams([
      { id: `EX-${Math.floor(Math.random() * 1000)}`, title: newTitle, group: newGroup, date: newDate, avgScore: 0, students: 0 },
      ...exams
    ]);
    
    setNewTitle("");
    setNewGroup("");
    setNewDate("");
    setIsNewExamOpen(false);
  };

  const filteredGrades = [...studentGrades]
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "none") return 0;
      const scoreA = parseFloat(a.score);
      const scoreB = parseFloat(b.score);
      return sortBy === "desc" ? scoreB - scoreA : scoreA - scoreB;
    });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Baholar va Natijalar</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">O'quvchilarning reytinglari, test natijalari va o'zlashtirish tahlili.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" onClick={handleSort} className="h-11 px-5 rounded-xl border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm transition-all">
             <Filter className="w-4 h-4 mr-2" /> Saralash {sortBy === "desc" ? "↓" : sortBy === "asc" ? "↑" : ""}
           </Button>
           <Button onClick={() => setIsNewExamOpen(true)} className="bg-[#141724] dark:bg-white text-white dark:text-[#141724] font-bold h-11 px-6 rounded-xl shadow-lg transition-all hover:bg-gray-800 dark:hover:bg-gray-200">
             <Trophy className="w-5 h-5 mr-2 text-amber-400" strokeWidth={2.5} /> Yangi Imtihon
           </Button>
        </div>
      </div>

      {/* KPI Cards for Overview */}
      <div className="grid gap-5 md:grid-cols-3">
         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-gradient-to-br from-[#3e4cf1] to-[#3442d9] rounded-2xl overflow-hidden relative group text-white p-6">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Star className="w-20 h-20"/></div>
            <p className="text-[14px] font-bold text-blue-200 tracking-wider uppercase mb-1">A'lochi O'quvchilar</p>
            <div className="flex items-end gap-2 mt-2">
               <p className="text-[36px] font-black leading-none">124</p>
               <span className="text-blue-200 font-bold mb-1">ta (15%)</span>
            </div>
            <div className="mt-4 inline-flex items-center gap-1 text-[12px] font-extrabold bg-white/20 px-2.5 py-1 rounded-md">
               <TrendingUp className="w-3.5 h-3.5" /> O'tgan oyga nisbatan o'sish
            </div>
         </Card>

         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden relative group p-6">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-[14px] font-bold text-gray-400 tracking-wider uppercase mb-1">O'rtacha Max Reyting</p>
                  <div className="flex items-end gap-2 mt-2">
                     <p className="text-[36px] font-black text-[#141724] dark:text-white leading-none">82.5</p>
                     <span className="text-gray-400 font-bold mb-1">/ 100</span>
                  </div>
               </div>
               <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" strokeWidth={2.5} />
               </div>
            </div>
         </Card>

         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden relative group p-6 border border-transparent dark:border-rose-500/10">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-[14px] font-bold text-gray-400 tracking-wider uppercase mb-1 drop-shadow-sm">Xavf Ostidagi</p>
                  <div className="flex items-end gap-2 mt-2">
                     <p className="text-[36px] font-black text-rose-500 leading-none">18</p>
                     <span className="text-gray-400 font-bold mb-1">ta o'quvchi</span>
                  </div>
               </div>
               <div className="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-xl flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-6 h-6" strokeWidth={2.5} />
               </div>
            </div>
            <p className="text-[12px] font-bold text-gray-400 mt-4">
               So'nggi testda o'tish balini to'play olmaganlar
            </p>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
         
         {/* Exams / Categories List */}
         <div className="lg:col-span-1 space-y-4">
            <h3 className="text-[16px] font-black text-[#141724] dark:text-gray-200">So'nggi Imtihonlar</h3>
            {exams.map(exam => (
               <Card key={exam.id} className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl p-5 hover:border-[#3e4cf1]/30 border border-transparent transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                     <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-[#3e4cf1] rounded-lg">
                        <FileText className="w-5 h-5" />
                     </div>
                     <span className="text-[11px] font-bold text-gray-400">{exam.date}</span>
                  </div>
                  <h4 className="text-[16px] font-black text-[#141724] dark:text-white mt-3 group-hover:text-[#3e4cf1] transition-colors">{exam.title}</h4>
                  <p className="text-[13px] font-bold text-gray-500 mb-4">{exam.group}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-50 dark:border-white/5">
                     <span className="text-[12px] font-bold text-gray-400">{exam.students} ht qatnashdi</span>
                     <span className="text-[12px] font-black text-[#141724] dark:text-white">O'rtacha: {exam.avgScore}</span>
                  </div>
               </Card>
            ))}
         </div>

         {/* Detailed Student Grades Table (2 columns width) */}
         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden lg:col-span-2 flex flex-col">
           <div className="p-4 sm:p-5 border-b border-gray-50 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30 dark:bg-transparent">
              <h2 className="text-[18px] font-bold text-[#141724] dark:text-white">O'quvchilar Reytingi</h2>
              <div className="relative w-full sm:w-[250px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Ism bo'yicha..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 rounded-xl text-[13px] font-medium" 
                />
              </div>
           </div>

           <div className="overflow-x-auto flex-1">
             <table className="w-full text-left">
               <thead className="bg-[#f4f7f6]/50 dark:bg-[#0b0e14]/50 border-b border-gray-100 dark:border-white/5">
                 <tr>
                   <th className="px-5 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">O'quvchi</th>
                   <th className="px-5 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Imtihon / Guruh</th>
                   <th className="px-5 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider">Baho (Natija)</th>
                   <th className="px-5 py-3 text-[11px] font-black text-gray-400 uppercase tracking-wider text-right">Amal</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                 {filteredGrades.map((student) => (
                   <tr key={student.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                     <td className="px-5 py-4 whitespace-nowrap">
                       <div className="flex flex-col">
                         <span className="font-bold text-[14px] text-[#141724] dark:text-white">{student.name}</span>
                         <span className="text-[11px] font-semibold text-gray-400 mt-0.5">{student.id}</span>
                       </div>
                     </td>
                     <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                         <span className="font-bold text-[13px] text-[#141724] dark:text-gray-200">{student.exam}</span>
                         <span className="text-[11px] font-semibold text-blue-500 mt-0.5">{student.group}</span>
                       </div>
                     </td>
                     <td className="px-5 py-4 whitespace-nowrap">
                       <div className="flex items-center gap-3">
                         <div className="flex items-baseline gap-1">
                            <span className={`text-[18px] font-black ${student.status === 'Qoniqarsiz' ? 'text-rose-500' : 'text-[#141724] dark:text-white'}`}>{student.score}</span>
                            <span className="text-[11px] font-bold text-gray-400">/ {student.maxScore}</span>
                         </div>
                         {student.trend === "up" ? 
                           <TrendingUp className="w-4 h-4 text-emerald-500" /> : 
                           <TrendingUp className="w-4 h-4 text-rose-500 rotate-180" />
                         }
                       </div>
                     </td>
                     <td className="px-5 py-4 whitespace-nowrap text-right">
                       <button className="text-gray-400 hover:text-[#3e4cf1] p-1.5 rounded-lg hover:bg-[#3e4cf1]/10 transition-colors">
                          <ArrowRight className="w-5 h-5" />
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </Card>

      </div>

      {/* New Exam Modal */}
      {isNewExamOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-md border-none shadow-2xl bg-white dark:bg-[#141724] rounded-3xl overflow-hidden scale-in-95 animate-in duration-200">
            <CardHeader className="px-6 py-5 border-b border-gray-50 dark:border-white/5 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black text-[#141724] dark:text-white">Yangi Imtihon</CardTitle>
              <button type="button" onClick={() => setIsNewExamOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </CardHeader>
            <form onSubmit={handleAddExam}>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Imtihon nomi</label>
                  <Input 
                    placeholder="Masalan: Oylik test" 
                    value={newTitle} 
                    onChange={e => setNewTitle(e.target.value)} 
                    className="h-12 bg-gray-50 dark:bg-white/5 border-none rounded-xl text-[#141724] dark:text-white font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Guruh</label>
                  <Input 
                    placeholder="Masalan: IELTS B2" 
                    value={newGroup} 
                    onChange={e => setNewGroup(e.target.value)} 
                    className="h-12 bg-gray-50 dark:bg-white/5 border-none rounded-xl text-[#141724] dark:text-white font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Sana</label>
                  <Input 
                    type="date"
                    value={newDate} 
                    onChange={e => setNewDate(e.target.value)} 
                    className="h-12 bg-gray-50 dark:bg-white/5 border-none rounded-xl text-[#141724] dark:text-white font-medium block"
                    required
                  />
                </div>
              </CardContent>
              <div className="p-6 pt-0 flex gap-3">
                <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl dark:border-white/10 dark:hover:bg-white/5" onClick={() => setIsNewExamOpen(false)}>Bekor qilish</Button>
                <Button type="submit" className="flex-1 h-12 bg-[#141724] dark:bg-white text-white dark:text-[#141724] hover:bg-gray-800 dark:hover:bg-gray-200 rounded-xl shadow-lg font-bold">
                  Qo'shish
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

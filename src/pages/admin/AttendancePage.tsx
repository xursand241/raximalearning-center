import { useState, useEffect } from "react";
import { CheckCircle2, Clock, Calendar, Search, Users, Download, Zap, X, UserX, FileText, AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { attendanceService } from "@/services/attendanceService";
import { profileService } from "@/services/profileService";

export default function AttendancePage() {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [totalStudentsCount, setTotalStudentsCount] = useState(0);

  useEffect(() => {
    fetchAttendance();
    fetchTotalStudents();
  }, [selectedDate]);

  const fetchAttendance = async () => {
    setIsLoading(true);
    try {
      const data = await attendanceService.getAllAttendanceForDate(selectedDate);
      setAttendanceRecords(data.map((r: any) => ({
        id: r.id,
        date: r.date,
        student: `${r.profiles?.first_name} ${r.profiles?.last_name}`,
        group: r.groups?.name || "Noma'lum",
        status: r.status
      })));
    } catch (err) {
      console.error("Error fetching attendance:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTotalStudents = async () => {
    try {
      const students = await profileService.getAllProfilesByRole('student');
      setTotalStudentsCount(students.length);
    } catch (err) {
      console.error("Error fetching students count:", err);
    }
  };

  // Filter records by search term
  const filteredRecords = attendanceRecords.filter(item => {
     return item.student.toLowerCase().includes(search.toLowerCase()) || item.group.toLowerCase().includes(search.toLowerCase());
  });

  // Calculate KPIs
  const totalStudents = filteredRecords.length;
  const presentCount = filteredRecords.filter(r => r.status === 'present').length;
  const absentCount = filteredRecords.filter(r => r.status === 'absent').length;
  const lateCount = filteredRecords.filter(r => r.status === 'late' || r.status === 'excused').length;

  const handleExportCSV = () => {
    if (filteredRecords.length === 0) return;
    const headers = ["Sana, O'quvchi F.I.SH, Guruh, Holati\n"];
    const rows = filteredRecords.map(item => {
       const statusMap: Record<string, string> = { present: 'Keldi', absent: 'Kelmadi', excused: 'Sababli', late: 'Kechikkan' };
       return `${item.date},${item.student.replace(/,/g, '')},${item.group},${statusMap[item.status]}`;
    });
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.concat(rows).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `davomat_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6 pb-12">
      
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-[#141829] dark:bg-[#141724]">
         {/* Decorative gradients */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[50%] -left-[10%] w-[60%] h-[200%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen"></div>
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-[#3e4cf1]/30 blur-[100px] rounded-full mix-blend-screen"></div>
         </div>
         
         <div className="relative p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10 border border-gray-100/5 rounded-3xl shadow-2xl shadow-blue-900/10 dark:shadow-none">
            <div>
               <Badge className="bg-white/10 hover:bg-white/15 text-blue-100 border-none mb-4 text-[11px] font-black tracking-widest uppercase px-3 py-1 shadow-inner backdrop-blur-md">
                 <Zap className="w-3.5 h-3.5 mr-1.5 text-amber-400 fill-amber-400" /> DAVOMAT INTELLEKTI
               </Badge>
               <h1 className="text-3xl md:text-[38px] font-black tracking-tight text-white leading-none mb-3">Tizim Hisoboti</h1>
               <p className="text-blue-100/70 font-medium text-[15px]">{selectedDate} kuni bo'yicha akademiya davomati va faollik tahlili.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-1.5">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-blue-200/50 uppercase tracking-widest px-3 pt-2 pb-1">Sanalarni filtrlash</span>
                  <div className="flex items-center gap-2 px-1 pb-1">
                     <Input 
                        type="date" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-transparent border-none text-white font-bold h-10 w-[160px] focus-visible:ring-0 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
         <Card className="p-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-2 relative">
               <p className="text-[11px] font-black tracking-widest text-gray-400 uppercase">Umumiy O'quvchilar</p>
               <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Users className="w-4 h-4" />
               </div>
            </div>
            <h3 className="text-3xl font-black text-[#141724] dark:text-white relative">{totalStudentsCount}</h3>
         </Card>

         <Card className="p-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-2 relative">
               <p className="text-[11px] font-black tracking-widest text-gray-400 uppercase">Darsda Borlar</p>
               <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
               </div>
            </div>
            <h3 className="text-3xl font-black text-[#141724] dark:text-white relative">{presentCount}</h3>
         </Card>

         <Card className="p-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent dark:from-rose-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-2 relative">
               <p className="text-[11px] font-black tracking-widest text-gray-400 uppercase">Kelmaganlar</p>
               <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <X className="w-4 h-4 text-rose-600" />
               </div>
            </div>
            <h3 className="text-3xl font-black text-[#141724] dark:text-white relative">{absentCount}</h3>
         </Card>

         <Card className="p-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-2 relative">
               <p className="text-[11px] font-black tracking-widest text-gray-400 uppercase">Kechikkanlar / Sababli</p>
               <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Clock className="w-4 h-4" />
               </div>
            </div>
            <h3 className="text-3xl font-black text-[#141724] dark:text-white relative">{lateCount}</h3>
         </Card>
      </div>

      {/* FILTER AND EXPORT ROW */}
      <Card className="p-2 border-none shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl flex flex-col md:flex-row justify-between items-center gap-2">
         <div className="relative w-full md:max-w-md h-12 flex items-center px-4 bg-gray-50/50 dark:bg-white/[0.02] rounded-xl border border-transparent focus-within:border-[#3e4cf1]/30 transition-colors">
            <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
            <Input 
               placeholder="Guruh yoki o'quvchi bo'yicha qidirish..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="border-none bg-transparent shadow-none focus-visible:ring-0 px-0 h-full text-[14px] font-medium" 
            />
         </div>
         <div className="flex gap-2 w-full md:w-auto p-2 md:p-0">
            <Button onClick={handleExportCSV} className="w-full md:w-auto h-12 bg-[#141724] hover:bg-[#202538] dark:bg-white dark:text-[#141724] dark:hover:bg-gray-200 text-white font-bold px-6 rounded-xl transition-all">
               <Download className="w-4 h-4 mr-2" /> EKSPORT
            </Button>
            <Button onClick={() => window.print()} variant="outline" className="w-12 h-12 rounded-xl border-gray-100 dark:border-white/10 text-gray-500 flex items-center justify-center flex-shrink-0 hover:bg-gray-50 dark:hover:bg-white/5">
                <FileText className="w-5 h-5" />
            </Button>
         </div>
      </Card>

      {/* DATA TABLE / EMPTY STATE */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-3xl overflow-hidden min-h-[300px]">
         {filteredRecords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 dark:bg-[#0b0e14]/50 border-b border-gray-100 dark:border-white/5">
                  <tr>
                    <th className="px-6 py-5 text-[12px] font-black text-gray-400 uppercase tracking-wider">O'quvchi F.I.SH</th>
                    <th className="px-6 py-5 text-[12px] font-black text-gray-400 uppercase tracking-wider">Guruh</th>
                    <th className="px-6 py-5 text-[12px] font-black text-gray-400 uppercase tracking-wider">Holati</th>
                    <th className="px-6 py-5 text-[12px] font-black text-gray-400 uppercase tracking-wider text-right">Amal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {filteredRecords.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center font-bold text-[12px] text-blue-600 dark:text-blue-400">
                              {item.student.charAt(0)}
                           </div>
                           <span className="font-bold text-[14.5px] text-[#141724] dark:text-white">{item.student}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         <span className="text-[13.5px] font-bold text-gray-500">{item.group}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.status === 'present' && <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/30 px-3 py-1 text-[11px] font-black uppercase tracking-wider"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> KELDI</Badge>}
                        {item.status === 'absent' && <Badge variant="outline" className="border-rose-200 bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:border-rose-500/30 px-3 py-1 text-[11px] font-black uppercase tracking-wider"><X className="w-3.5 h-3.5 mr-1" /> KELMADI</Badge>}
                        {item.status === 'excused' && <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:border-amber-500/30 px-3 py-1 text-[11px] font-black uppercase tracking-wider"><AlertTriangle className="w-3.5 h-3.5 mr-1" /> SABABLI</Badge>}
                        {item.status === 'late' && <Badge variant="outline" className="border-yellow-200 bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:border-yellow-500/30 px-3 py-1 text-[11px] font-black uppercase tracking-wider"><Clock className="w-3.5 h-3.5 mr-1" /> KECHIKDI</Badge>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                         <Button variant="ghost" className="h-8 px-3 text-[12px] font-bold text-gray-400 hover:text-[#3e4cf1] hover:bg-blue-50 dark:hover:bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-all">
                            Tahrirlash
                         </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
               <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/[0.02] flex items-center justify-center mb-4 border border-gray-100 dark:border-white/5">
                  <UserX className="w-8 h-8 text-gray-300 dark:text-gray-600" />
               </div>
               <h3 className="text-[18px] font-black text-[#141724] dark:text-white mb-1">Hisobot topilmadi</h3>
               <p className="text-[14px] font-medium text-gray-500 max-w-sm">
                  {selectedDate} kuni uchun hech qanday davomat yozuvi kiritilmagan yoki qidiruvga mos natija yo'q.
               </p>
            </div>
         )}
      </Card>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Search, Plus, Filter, MoreHorizontal, UserCheck, UserX, AlertCircle, Users, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { profileService } from "@/services/profileService";
import { groupService } from "@/services/groupService";
import type { Group } from "@/services/groupService";

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ firstName: "", lastName: "", groupId: "", phone: "", paid: true });

  useEffect(() => {
    fetchStudents();
    fetchGroups();
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const data = await profileService.getStudentsWithGroups();
      setStudents(data.map((s: any) => ({
        id: s.id.slice(0, 8).toUpperCase(),
        dbId: s.id,
        name: `${s.first_name} ${s.last_name}`,
        group: s.student_groups?.[0]?.groups?.name || "Guruhsiz",
        phone: s.phone || "Kiritilmagan",
        status: s.is_active ? "Active" : "Blocked",
        paid: true // Will be connected to finance later
      })));
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGroups = async () => {
     try {
       const data = await groupService.getAllGroups();
       setGroups(data as any[]);
     } catch (err) {
       console.error("Error fetching groups:", err);
     }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.phone) return;

    setIsLoading(true);
    try {
      const dbId = crypto.randomUUID();
      const studentProfile = await profileService.createProfile({
        id: dbId,
        first_name: newStudent.firstName,
        last_name: newStudent.lastName,
        phone: newStudent.phone,
        role: 'student'
      });

      if (newStudent.groupId) {
        await groupService.enrollStudent(dbId, newStudent.groupId);
      }

      await fetchStudents();
      setIsModalOpen(false);
      setNewStudent({ firstName: "", lastName: "", groupId: "", phone: "", paid: true });
    } catch (err) {
      console.error("Error creating student:", err);
      alert("Xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.phone.includes(search) || 
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCSV = () => {
    if (filteredStudents.length === 0) return;
    const headers = ["ID, Ism va Familiya, Guruh, Telefon Raqam, Holat, To'lov\n"];
    const rows = filteredStudents.map(student => {
       const sName = student.name.replace(/,/g, '');
       const sGroup = student.group.replace(/,/g, '');
       return `${student.id},${sName},${sGroup},${student.phone},${student.status},${student.paid ? "To'langan" : "Qarzdor"}`;
    });
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `oquvchilar_${new Date().toLocaleDateString('uz-UZ')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const total = students.length;
  const activeCount = students.filter(s => s.status === 'Active').length;
  const blockedCount = students.filter(s => s.status === 'Blocked').length;
  const unpaidCount = students.filter(s => !s.paid).length;

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">O'quvchilar Ro'yxati</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Barcha o'quvchilarni boshqarish, guruhlarga kiritish va tahrirlash.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button onClick={handleExportCSV} variant="outline" className="h-11 px-5 rounded-xl border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm hidden sm:flex">
             <Download className="w-4 h-4 mr-2" /> Eksport
           </Button>
           <Button onClick={() => setIsModalOpen(true)} className="bg-[#3e4cf1] hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-blue-500/25">
              <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} /> Yangi o'quvchi
           </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center"><Users className="w-5 h-5"/></div>
            <div><p className="text-sm font-bold text-gray-400">Jami</p><p className="text-xl font-black text-[#141724] dark:text-white">{total}</p></div>
         </div>
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><UserCheck className="w-5 h-5"/></div>
            <div><p className="text-sm font-bold text-gray-400">Aktiv</p><p className="text-xl font-black text-[#141724] dark:text-white">{activeCount}</p></div>
         </div>
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center"><UserX className="w-5 h-5"/></div>
            <div><p className="text-sm font-bold text-gray-400">Bloklangan</p><p className="text-xl font-black text-[#141724] dark:text-white">{blockedCount}</p></div>
         </div>
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"><AlertCircle className="w-5 h-5"/></div>
            <div><p className="text-sm font-bold text-gray-400">Qarzdorlar</p><p className="text-xl font-black text-[#141724] dark:text-white">{unpaidCount}</p></div>
         </div>
      </div>

      {/* Main Table Card */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl">
        <div className="p-4 sm:p-6 pb-0 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-transparent rounded-t-2xl">
           <div className="relative w-full md:max-w-md">
             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <Input 
               placeholder="Ism, telefon yoki ID bo'yicha qidirish..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="pl-10 h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 rounded-xl focus-visible:ring-[#3e4cf1] text-[14px] font-medium" 
             />
           </div>
           <Button variant="outline" className="w-full md:w-auto h-11 px-5 rounded-xl border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-white/5">
              <Filter className="w-4 h-4 mr-2" />
              Filtrlash
           </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f4f7f6]/50 dark:bg-[#0b0e14]/50 border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">O'quvchi</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Guruh</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Telefon</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">To'lov holati</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#f4f7f6] dark:bg-[#0b0e14] border border-gray-200 dark:border-white/5 flex items-center justify-center font-black text-[13px] text-[#3e4cf1]">
                        {student.name.charAt(0)}
                      </div>
                      <div className="font-bold text-[14.5px] text-[#141724] dark:text-white">
                        {student.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[13px] font-bold text-gray-500">
                    {student.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-md text-[13px] font-bold">
                        {student.group}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[13px] font-semibold text-gray-600 dark:text-gray-400">
                    {student.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.paid ? (
                      <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-extrabold">TO'LANGAN</Badge>
                    ) : (
                      <Badge variant="outline" className="border-rose-200 bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:border-rose-500/20 px-2.5 py-0.5 text-[11px] font-extrabold animate-pulse">QARZDOR</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-gray-400 hover:text-[#3e4cf1] p-1 rounded-md hover:bg-[#3e4cf1]/10 transition-colors opacity-0 group-hover:opacity-100">
                       <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500 font-medium">Bunday o'quvchi topilmadi</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#141724] rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-white/10">
            <div className="border-b border-gray-100 dark:border-white/5 p-5 flex justify-between items-center bg-gray-50/50 dark:bg-white/[0.02]">
              <div>
                <h2 className="text-xl font-black text-[#141724] dark:text-white">Yangi o'quvchi qo'shish</h2>
                <p className="text-sm font-medium text-gray-500 mt-1">O'quvchi ma'lumotlarini kiriting.</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Ism *</label>
                  <Input required value={newStudent.firstName} onChange={(e) => setNewStudent({...newStudent, firstName: e.target.value})} placeholder="Aziz" className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Familiya *</label>
                  <Input required value={newStudent.lastName} onChange={(e) => setNewStudent({...newStudent, lastName: e.target.value})} placeholder="Azizov" className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Telefon raqami *</label>
                <Input required value={newStudent.phone} onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})} placeholder="+998 90 123 45 67" className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Guruh (Ixtiyoriy)</label>
                <select 
                  value={newStudent.groupId} 
                  onChange={(e) => setNewStudent({...newStudent, groupId: e.target.value})}
                  className="w-full h-11 px-3 bg-white dark:bg-[#0b0e14] border border-gray-200 dark:border-white/10 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#3e4cf1]/30 transition-all"
                >
                  <option value="">Guruhni tanlang</option>
                  {groups.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center bg-gray-50 dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/5 mt-2">
                 <span className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Dastlabki to'lov qilinganmi?</span>
                 <button type="button" onClick={() => setNewStudent({...newStudent, paid: !newStudent.paid})} className={`w-12 h-6 rounded-full transition-colors relative ${newStudent.paid ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${newStudent.paid ? 'left-7' : 'left-1'}`}></span>
                 </button>
              </div>
              <div className="pt-4 flex gap-3">
                <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1 h-11 font-bold border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5">
                  Bekor qilish
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1 h-11 bg-[#3e4cf1] hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/25">
                  {isLoading ? "Saqlanmoqda..." : "Saqlash"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}

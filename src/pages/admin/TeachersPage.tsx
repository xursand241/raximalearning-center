import { useState, useEffect } from "react";
import { Search, Plus, Filter, MoreHorizontal, Users, GraduationCap, Star, BookOpen, Fingerprint, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { profileService } from "@/services/profileService";

export default function TeachersPage() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ firstName: "", lastName: "", phone: "", subjects: "" });
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const data = await profileService.getTeachersWithStats();
      setTeachers(data.map(t => ({
        id: t.id.slice(0, 8).toUpperCase(),
        dbId: t.id,
        name: `${t.first_name} ${t.last_name}`,
        firstName: t.first_name,
        lastName: t.last_name,
        phone: t.phone || "Kiritilmagan",
        subjects: ["Pedagog"], // Default for now
        groupsCount: t.groupsCount,
        studentsCount: t.studentsCount,
        rating: 5.0,
        status: t.is_active ? "Aktiv" : "Noaktiv"
      })));
    } catch (err) {
      console.error("Error fetching teachers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.firstName || !newTeacher.lastName || !newTeacher.phone) return;

    setIsLoading(true);
    try {
      await profileService.createProfile({
        id: crypto.randomUUID(),
        first_name: newTeacher.firstName,
        last_name: newTeacher.lastName,
        phone: newTeacher.phone,
        role: 'teacher'
      });

      await fetchTeachers();
      setIsModalOpen(false);
      setNewTeacher({ firstName: "", lastName: "", phone: "", subjects: "" });
    } catch (err) {
       console.error("Error creating teacher:", err);
       alert("Xatolik yuz berdi");
    } finally {
       setIsLoading(false);
    }
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.phone.includes(search) || 
    t.id.toLowerCase().includes(search.toLowerCase())
  );
  
  const total = teachers.length;
  const active = teachers.filter(t => t.status === 'Aktiv').length;
  const activeGroups = teachers.reduce((acc, curr) => acc + curr.groupsCount, 0);
  const avgRating = total > 0 ? (teachers.reduce((acc, curr) => acc + curr.rating, 0) / total).toFixed(1) : "0.0";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">O'qituvchilar Jamoasi</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Akademiya ustozlarini boshqarish, guruhlar va reytinglarni kuzatish.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button onClick={() => setIsModalOpen(true)} className="bg-[#141724] dark:bg-white text-white dark:text-[#141724] hover:bg-gray-800 dark:hover:bg-gray-100 font-bold h-11 px-6 rounded-xl shadow-lg transition-all">
             <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} /> Yangi Ustoz
           </Button>
        </div>
      </div>

      {/* KPI Info Cards */}
      <div className="grid gap-5 md:grid-cols-4">
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col justify-center shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><GraduationCap className="w-16 h-16"/></div>
            <p className="text-[13px] font-black text-gray-400 tracking-wider uppercase mb-1">Jami O'qituvchilar</p>
            <p className="text-3xl font-black text-[#141724] dark:text-white">{total}</p>
         </div>
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col justify-center shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-emerald-500"><Fingerprint className="w-16 h-16"/></div>
            <p className="text-[13px] font-black text-emerald-500 tracking-wider uppercase mb-1">Aktiv Ustozlar</p>
            <p className="text-3xl font-black text-[#141724] dark:text-white">{active}</p>
         </div>
         <div className="bg-white dark:bg-[#141724] p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col justify-center shadow-sm relative overflow-hidden group items-start">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-blue-500"><BookOpen className="w-16 h-16"/></div>
            <p className="text-[13px] font-black text-gray-400 tracking-wider uppercase mb-1">Aktiv Guruhlar</p>
            <div className="flex items-baseline gap-2">
               <p className="text-3xl font-black text-[#141724] dark:text-white">{activeGroups}</p>
               <span className="text-sm font-bold text-blue-500">ta</span>
            </div>
         </div>
         <div className="bg-gradient-to-br from-[#3e4cf1] to-blue-700 p-5 rounded-2xl border-none text-white flex flex-col justify-center shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Star className="w-16 h-16"/></div>
            <p className="text-[13px] font-black text-blue-200 tracking-wider uppercase mb-1">O'rtacha Reyting</p>
            <div className="flex items-baseline gap-2 mt-1">
               <p className="text-3xl font-black text-white">{avgRating}</p>
               <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
         </div>
      </div>

      {/* Main Table Wrapper */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-6 pb-0 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-transparent rounded-t-2xl">
           <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="p-2 bg-[#3e4cf1]/10 text-[#3e4cf1] rounded-lg hidden sm:flex"><Users className="w-5 h-5" /></div>
             <div className="relative w-full md:w-[350px]">
               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <Input 
                 placeholder="O'qituvchi ism-sharifi orqali izlash..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="pl-10 h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 rounded-xl focus-visible:ring-[#3e4cf1] text-[14px] font-medium w-full" 
               />
             </div>
           </div>
           <Button variant="outline" className="h-11 px-5 w-full md:w-auto rounded-xl border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-white/5">
              <Filter className="w-4 h-4 mr-2" /> Filtrlash
           </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f4f7f6]/50 dark:bg-[#0b0e14]/50 border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">O'qituvchi / ID</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Yo'nalish (Fanlar)</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Yuklama</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Reyting</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Holati</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {filteredTeachers.length > 0 ? filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-[3px] border-white dark:border-[#141724] flex items-center justify-center font-black text-[14px] text-gray-700 dark:text-gray-300 shadow-md">
                        {teacher.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[14.5px] text-[#141724] dark:text-white group-hover:text-[#3e4cf1] transition-colors">{teacher.name}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                           <span className="text-[11px] font-bold text-gray-400">{teacher.id}</span>
                           <span className="text-[11px] font-semibold text-gray-500">•</span>
                           <span className="text-[11px] font-semibold text-[#3e4cf1]">{teacher.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                       {teacher.subjects.map((sub, idx) => (
                          <Badge key={idx} variant="secondary" className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-[#eef1ff] text-[#3e4cf1] dark:bg-[#3e4cf1]/10 border-none">
                             {sub}
                          </Badge>
                       ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex flex-col gap-1">
                        <span className="text-[13px] font-bold text-[#141724] dark:text-gray-200">{teacher.groupsCount} ta Guruh</span>
                        <span className="text-[11px] font-semibold text-gray-500">{teacher.studentsCount} O'quvchi</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 dark:bg-amber-500/10 rounded-lg w-fit">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="text-[13px] font-black text-amber-600 dark:text-amber-500">{teacher.rating}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                       variant="outline" 
                       className={`border-none px-2.5 py-1 text-[11px] font-extrabold tracking-wide uppercase ${
                          teacher.status === 'Aktiv' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 
                          teacher.status === "Ta'tilda" ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10' : 
                          'bg-gray-100 text-gray-500 dark:bg-white/5'
                       }`}
                    >
                       {teacher.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-gray-400 hover:text-[#3e4cf1] p-1.5 rounded-lg hover:bg-[#3e4cf1]/10 transition-colors opacity-0 group-hover:opacity-100">
                       <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500 font-medium">Bunday ustoz topilmadi</td>
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
                <h2 className="text-xl font-black text-[#141724] dark:text-white">Yangi o'qituvchi qo'shish</h2>
                <p className="text-sm font-medium text-gray-500 mt-1">O'qituvchi ma'lumotlarini kiriting.</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Ism *</label>
                  <Input required value={newTeacher.firstName} onChange={(e) => setNewTeacher({...newTeacher, firstName: e.target.value})} placeholder="Masalan: Javohir" className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Familiya *</label>
                  <Input required value={newTeacher.lastName} onChange={(e) => setNewTeacher({...newTeacher, lastName: e.target.value})} placeholder="Masalan: Qosimov" className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1]" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Telefon raqami *</label>
                <Input required value={newTeacher.phone} onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})} placeholder="+998 90 123 45 67" className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Yo'nalish (Fanlar) (Ixtiyoriy, vergul bilan)</label>
                <Input value={newTeacher.subjects} onChange={(e) => setNewTeacher({...newTeacher, subjects: e.target.value})} placeholder="Masalan: Matematika, Fizika" className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1]" />
              </div>
              <div className="pt-4 flex gap-3">
                <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1 h-11 font-bold border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5">
                  Bekor qilish
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1 h-11 bg-[#141724] dark:bg-white text-white dark:text-[#141724] hover:bg-gray-800 dark:hover:bg-gray-100 font-bold shadow-lg">
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

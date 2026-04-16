import { useState, useEffect } from "react";
import { Search, Plus, BookOpen, Clock, Users, ArrowRight, CheckCircle2, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { subjectService } from "@/services/subjectService";
import { supabase } from "@/lib/supabase";

export default function SubjectsPage() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", type: "", price: "", color: "blue" });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const [subjectsData, groupsData] = await Promise.all([
        subjectService.getAllSubjects(),
        supabase.from('groups').select('id, subject_id, teacher_id')
      ]);

      const groups = groupsData.data || [];
      
      setSubjects(subjectsData.map(sub => {
        const subGroups = groups.filter(g => g.subject_id === sub.id);
        const subTeachers = new Set(subGroups.map(g => g.teacher_id)).size;

        return {
          id: sub.id,
          name: sub.name,
          type: sub.category,
          teachersCount: subTeachers,
          groupsCount: subGroups.length,
          price: sub.monthly_price.toLocaleString() + " UZS",
          status: sub.is_active ? "Aktiv" : "Nofaol",
          color: sub.color_preset === 'emerald' ? "from-emerald-400 to-teal-500" : 
                 sub.color_preset === 'indigo' ? "from-indigo-500 to-purple-500" :
                 sub.color_preset === 'amber' ? "from-amber-400 to-orange-500" :
                 sub.color_preset === 'rose' ? "from-rose-400 to-red-500" :
                 "from-blue-500 to-cyan-500",
          bg: sub.color_preset === 'emerald' ? "bg-emerald-50 dark:bg-emerald-500/10" :
              sub.color_preset === 'indigo' ? "bg-indigo-50 dark:bg-indigo-500/10" :
              sub.color_preset === 'amber' ? "bg-amber-50 dark:bg-amber-500/10" :
              sub.color_preset === 'rose' ? "bg-rose-50 dark:bg-rose-500/10" :
              "bg-blue-50 dark:bg-blue-500/10",
          text: sub.color_preset === 'emerald' ? "text-emerald-600" :
                sub.color_preset === 'indigo' ? "text-indigo-600" :
                sub.color_preset === 'amber' ? "text-amber-600" :
                sub.color_preset === 'rose' ? "text-rose-600" :
                "text-blue-600"
        };
      }));
    } catch (err) {
      console.error("Error fetching subjects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.name || !newSubject.type || !newSubject.price) return;
    
    setIsLoading(true);
    try {
      const priceNumeric = Number(newSubject.price.toString().replace(/\D/g, ''));
      await subjectService.createSubject({
        name: newSubject.name,
        category: newSubject.type,
        monthly_price: priceNumeric,
        color_preset: newSubject.color
      });
      fetchSubjects();
      setIsModalOpen(false);
      setNewSubject({ name: "", type: "", price: "", color: "blue" });
    } catch (err) {
       console.error("Error creating subject:", err);
       alert("Xatolik yuz berdi");
    } finally {
       setIsLoading(false);
    }
  };

  const filteredSubjects = subjects.filter(sub =>
    sub.name.toLowerCase().includes(search.toLowerCase()) || 
    sub.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Fanlar Boshqaruvi</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Akademiyada o'qitiladigan kurslar va fanlarning umumiy sozlamalari.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#3e4cf1] hover:bg-[#3442d9] text-white font-bold h-11 px-6 rounded-xl shadow-lg transition-all">
           <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} /> Yangi Fan
        </Button>
      </div>

      <div className="relative w-full max-w-md">
         <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
         <Input 
           placeholder="Fan nomini qidiring..." 
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           className="pl-10 h-11 bg-white dark:bg-[#141724] border-gray-100 dark:border-white/5 rounded-xl shadow-sm focus-visible:ring-[#3e4cf1] text-[14px] font-medium" 
         />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSubjects.length > 0 ? filteredSubjects.map((sub) => (
          <Card key={sub.id} className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl hover:-translate-y-1 transition-transform duration-300 overflow-hidden group">
            <div className={`h-2 w-full bg-gradient-to-r ${sub.color}`}></div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                 <div className={`p-2.5 rounded-xl ${sub.bg} ${sub.text}`}>
                    <BookOpen className="w-5 h-5" strokeWidth={2.5} />
                 </div>
                 <Badge variant="outline" className={`border-none px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${sub.status === 'Aktiv' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10'}`}>
                    {sub.status === 'Aktiv' ? <CheckCircle2 className="w-3 h-3 mr-1 inline" /> : <AlertCircle className="w-3 h-3 mr-1 inline" />}
                    {sub.status}
                 </Badge>
              </div>
              <h3 className="text-[20px] font-black text-[#141724] dark:text-white tracking-tight leading-tight">{sub.name}</h3>
              <p className="text-[12px] font-bold text-gray-400 mt-1 uppercase tracking-wider">{sub.type}</p>
              
              <div className="mt-5 space-y-3">
                 <div className="flex items-center justify-between text-[13px] font-bold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 p-2 rounded-lg">
                    <span className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-400" /> O'qituvchilar</span>
                    <span className="text-[#141724] dark:text-white font-black">{sub.teachersCount} ta</span>
                 </div>
                 <div className="flex items-center justify-between text-[13px] font-bold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 p-2 rounded-lg">
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" /> Guruhlar </span>
                    <span className="text-[#141724] dark:text-white font-black">{sub.groupsCount} ta</span>
                 </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Oylik To'lov</p>
                    <p className="text-[16px] font-black text-[#141724] dark:text-white mt-0.5">{sub.price}</p>
                 </div>
                 <button className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#3e4cf1] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                 </button>
              </div>
            </div>
           </Card>
        )) : (
          <div className="col-span-full py-12 text-center text-gray-500 font-medium">Bunday fan topilmadi</div>
        )}
      </div>

      {/* Create Subject Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#141724] rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-white/10">
            <div className="border-b border-gray-100 dark:border-white/5 p-5 flex justify-between items-center bg-gray-50/50 dark:bg-white/[0.02]">
              <div>
                <h2 className="text-xl font-black text-[#141724] dark:text-white">Yangi fan turlarini ro'yxatdan o'tkazish</h2>
                <p className="text-sm font-medium text-gray-500 mt-1">Akademiyadagi yangi kurs va narxlarni saqlash.</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Fan yoki Kurs nomi *</label>
                <Input required value={newSubject.name} onChange={(e) => setNewSubject({...newSubject, name: e.target.value})} placeholder="Masalan: Frontend Foundation" className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Yo'nalish Toifasi *</label>
                <Input required value={newSubject.type} onChange={(e) => setNewSubject({...newSubject, type: e.target.value})} placeholder="Masalan: Zamonaviy kasblar, Dasturlash" className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Oylik to'lov summasi *</label>
                <Input required value={newSubject.price} onChange={(e) => setNewSubject({...newSubject, price: e.target.value})} placeholder="Masalan: 600,000 UZS" className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1]" />
              </div>
              <div className="space-y-2 pt-1">
                <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Dizayn (Rang) ni tanlang</label>
                <div className="flex gap-3">
                   {['blue', 'emerald', 'indigo', 'amber', 'rose'].map(color => (
                     <button
                        key={color}
                        type="button"
                        onClick={() => setNewSubject({...newSubject, color})}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${newSubject.color === color ? 'ring-2 ring-offset-2 ring-[#3e4cf1] scale-110 shadow-md' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
                        style={{
                          background: color === 'blue' ? 'linear-gradient(to right, #3b82f6, #06b6d4)' :
                                      color === 'emerald' ? 'linear-gradient(to right, #34d399, #14b8a6)' :
                                      color === 'indigo' ? 'linear-gradient(to right, #6366f1, #a855f7)' :
                                      color === 'amber' ? 'linear-gradient(to right, #fbbf24, #f97316)' :
                                      'linear-gradient(to right, #fb7185, #ef4444)'
                        }}
                     >
                       {newSubject.color === color && <CheckCircle2 className="w-5 h-5 text-white" />}
                     </button>
                   ))}
                </div>
              </div>
              <div className="pt-5 flex gap-3">
                <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1 h-11 font-bold border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5">
                  Bekor qilish
                </Button>
                <Button type="submit" className="flex-1 h-11 bg-[#3e4cf1] hover:bg-blue-700 text-white font-bold shadow-lg">
                  Fanni Saqlash
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

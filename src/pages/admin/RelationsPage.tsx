import { useState } from "react";
import { Search, Link as LinkIcon, UserPlus, Users, ShieldAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function RelationsPage() {
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRelation, setNewRelation] = useState({ parentName: "", parentPhone: "", childName: "", childGroup: "" });

  const [relations, setRelations] = useState<any[]>([]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRelation.parentName || !newRelation.childName) return;

    const rel = {
      id: "REL-" + Math.floor(100 + Math.random() * 900),
      parent: { name: newRelation.parentName, phone: newRelation.parentPhone },
      children: [{ name: newRelation.childName, group: newRelation.childGroup }]
    };

    setRelations([rel, ...relations]);
    setIsModalOpen(false);
    setNewRelation({ parentName: "", parentPhone: "", childName: "", childGroup: "" });
  };

  const filteredRelations = relations.filter(r => 
    r.parent.name.toLowerCase().includes(search.toLowerCase()) || 
    r.parent.phone.includes(search) ||
    r.children.some(c => c.name.toLowerCase().includes(search.toLowerCase()))
  );
  
  const totalFamilies = relations.length;
  const totalConnections = relations.reduce((acc, curr) => acc + curr.children.length, 0);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Oila va Bog'lanishlar</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Ota-onalar va o'quvchilar o'rtasidagi bog'lanishlarni (qarindoshlikni) boshqarish.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button onClick={() => setIsModalOpen(true)} className="bg-[#3e4cf1] hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-blue-500/25 transition-all">
             <LinkIcon className="w-5 h-5 mr-2" strokeWidth={2.5} /> Yangi bog'lanish
           </Button>
        </div>
      </div>

      {/* KPI Info Cards */}
      <div className="grid gap-5 md:grid-cols-3">
         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden relative group">
            <div className="p-6 relative z-10 flex items-center gap-5">
               <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7" strokeWidth={2.5} />
               </div>
               <div>
                  <h3 className="text-[13px] font-bold text-gray-400 dark:text-gray-500 tracking-wider uppercase mb-1">Tizimdagi Oila Soni</h3>
                  <p className="text-[28px] font-black text-[#141724] dark:text-white leading-none">{totalFamilies}</p>
               </div>
            </div>
         </Card>
         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden relative group">
            <div className="p-6 relative z-10 flex items-center gap-5">
               <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <LinkIcon className="w-7 h-7" strokeWidth={2.5} />
               </div>
               <div>
                  <h3 className="text-[13px] font-bold text-gray-400 dark:text-gray-500 tracking-wider uppercase mb-1">Jami Bog'lanishlar</h3>
                  <p className="text-[28px] font-black text-[#141724] dark:text-white leading-none">{totalConnections}</p>
               </div>
            </div>
         </Card>
         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-rose-50 dark:bg-rose-500/5 rounded-2xl overflow-hidden relative group border border-rose-100 dark:border-rose-500/10">
            <div className="p-6 relative z-10 flex items-center gap-5">
               <div className="w-14 h-14 rounded-2xl bg-white dark:bg-rose-500/20 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShieldAlert className="w-7 h-7" strokeWidth={2.5} />
               </div>
               <div>
                  <h3 className="text-[13px] font-bold text-rose-500 tracking-wider uppercase mb-1">Bog'lanmagan O'quvchilar</h3>
                  <p className="text-[28px] font-black text-rose-700 dark:text-rose-400 leading-none">0</p>
               </div>
            </div>
         </Card>
      </div>

      {/* Main Table Card for Parent-Student Relations */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-6 pb-0 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-transparent rounded-t-2xl">
           <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="p-2 bg-[#3e4cf1]/10 text-[#3e4cf1] rounded-lg hidden sm:flex"><LinkIcon className="w-5 h-5" /></div>
             <div className="relative w-full md:w-[400px]">
               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <Input 
                 placeholder="Ota-ona ismi yoki raqamini kiriting..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="pl-10 h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 rounded-xl focus-visible:ring-[#3e4cf1] text-[14px] font-medium w-full" 
               />
             </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f4f7f6]/50 dark:bg-[#0b0e14]/50 border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Munosabat ID</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Ota-ona (Vakil)</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Farzandlar (O'quvchilar)</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {filteredRelations.length > 0 ? filteredRelations.map((rel) => (
                <tr key={rel.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-[13px] font-bold text-gray-500 dark:text-gray-400">
                    {rel.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-white/5 flex items-center justify-center font-black text-[14px] text-gray-500 shadow-sm">
                        {rel.parent.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[14.5px] text-[#141724] dark:text-white">{rel.parent.name}</span>
                        <span className="text-[12px] font-semibold text-[#3e4cf1] mt-0.5">{rel.parent.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                       {rel.children.map((child, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f7f6] dark:bg-white/5 rounded-lg border border-gray-200/50 dark:border-white/5">
                             <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center font-black text-[10px]">
                               {child.name.charAt(0)}
                             </div>
                             <div className="flex flex-col line-clamp-1">
                                <span className="text-[12px] font-bold text-[#141724] dark:text-gray-200 leading-tight">{child.name}</span>
                                <span className="text-[10px] font-semibold text-gray-400 leading-tight">{child.group}</span>
                             </div>
                          </div>
                       ))}
                       <button className="flex items-center justify-center w-8 h-8 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-400 hover:text-[#3e4cf1] hover:border-[#3e4cf1] transition-colors">
                          <UserPlus className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 border-gray-200 dark:border-white/10 text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-bold dark:hover:bg-rose-500/10">
                        Qulflash
                      </Button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500 font-medium bg-gray-50/50 dark:bg-white/[0.02]">
                    Bunday bog'lanish topilmadi
                  </td>
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
                <h2 className="text-xl font-black text-[#141724] dark:text-white">Yangi bog'lanish</h2>
                <p className="text-sm font-medium text-gray-500 mt-1">Ota-ona va farzandni tizimda biriktirish.</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-5 space-y-5">
              {/* Parent Info */}
              <div className="space-y-4">
                 <h3 className="text-sm font-black text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-white/5 pb-2">Ota-ona ma'lumotlari</h3>
                 <div className="space-y-1.5">
                   <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Ism va familiyasi *</label>
                   <Input required value={newRelation.parentName} onChange={(e) => setNewRelation({...newRelation, parentName: e.target.value})} placeholder="Ism va familiyani kiriting..." className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1]" />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Telefon raqami *</label>
                   <Input required value={newRelation.parentPhone} onChange={(e) => setNewRelation({...newRelation, parentPhone: e.target.value})} placeholder="+998 90 123 45 67" className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1]" />
                 </div>
              </div>

              {/* Student Info */}
              <div className="space-y-4 pt-2">
                 <h3 className="text-sm font-black text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-white/5 pb-2">O'quvchi ma'lumotlari</h3>
                 <div className="space-y-1.5">
                   <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Farzand ism va familiyasi *</label>
                   <Input required value={newRelation.childName} onChange={(e) => setNewRelation({...newRelation, childName: e.target.value})} placeholder="O'quvchi ism va familiyasini kiriting..." className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1]" />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">O'qiyotgan guruhi (Ixtiyoriy)</label>
                   <Input value={newRelation.childGroup} onChange={(e) => setNewRelation({...newRelation, childGroup: e.target.value})} placeholder="Masalan: IELTS B2" className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1]" />
                 </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1 h-11 font-bold border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5">
                  Bekor qilish
                </Button>
                <Button type="submit" className="flex-1 h-11 bg-[#3e4cf1] hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/25">
                  Saqlash
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

import { useState } from "react";
import { Search, Plus, BookOpen, Clock, Users, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SubjectsPage() {
  const [search, setSearch] = useState("");

  const subjects = [
    { id: "SUB-01", name: "Matematika", type: "Aniq fanlar", teachersCount: 4, groupsCount: 12, price: "350,000 UZS", status: "Aktiv", color: "from-blue-500 to-cyan-500", bg: "bg-blue-50 dark:bg-blue-500/10", text: "text-blue-600" },
    { id: "SUB-02", name: "General English", type: "Xorijiy tillar", teachersCount: 6, groupsCount: 18, price: "400,000 UZS", status: "Aktiv", color: "from-emerald-400 to-teal-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-600" },
    { id: "SUB-03", name: "IELTS Preparation", type: "Xorijiy tillar", teachersCount: 3, groupsCount: 8, price: "550,000 UZS", status: "Aktiv", color: "from-indigo-500 to-purple-500", bg: "bg-indigo-50 dark:bg-indigo-500/10", text: "text-indigo-600" },
    { id: "SUB-04", name: "Ona tili va Adabiyot", type: "Gumanitar", teachersCount: 2, groupsCount: 5, price: "300,000 UZS", status: "Aktiv", color: "from-amber-400 to-orange-500", bg: "bg-amber-50 dark:bg-amber-500/10", text: "text-amber-600" },
    { id: "SUB-05", name: "Foundation IT", type: "Zamonaviy kasblar", teachersCount: 1, groupsCount: 2, price: "600,000 UZS", status: "Jarayonda", color: "from-rose-400 to-red-500", bg: "bg-rose-50 dark:bg-rose-500/10", text: "text-rose-600" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Fanlar Boshqaruvi</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Akademiyada o'qitiladigan kurslar va fanlarning umumiy sozlamalari.</p>
        </div>
        <Button className="bg-[#3e4cf1] hover:bg-[#3442d9] text-white font-bold h-11 px-6 rounded-xl shadow-lg transition-all">
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
        {subjects.map((sub) => (
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
        ))}
      </div>
    </div>
  );
}

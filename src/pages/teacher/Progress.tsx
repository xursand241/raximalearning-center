import { useState } from "react";
import { BarChart3, TrendingUp, Trophy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Progress() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([
     { id: 1, name: "Aliyeva Nargiza", score: "85%", status: "Yaxshi" },
     { id: 2, name: "Karimov Jasur", score: "92%", status: "A'lo" },
     { id: 3, name: "Rustamov Behzod", score: "68%", status: "Qoniqarli" },
     { id: 4, name: "Yusupova Madina", score: "98%", status: "A'lo" },
  ]);

  const filtered = results.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[28px] font-black text-[#141724] dark:text-white">O'quvchilar natijalari</h1>
          <p className="text-gray-500 font-medium text-[15px] mt-1">Barcha guruhlardagi o'zlashtirish tahlili</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 px-6 font-bold shadow-lg shadow-emerald-500/20">
          <Trophy className="w-5 h-5 mr-2" strokeWidth={2.5} /> Reyting tuzish
        </Button>
      </div>

      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none rounded-[32px] bg-white dark:bg-[#141724] overflow-hidden">
        <div className="p-6 border-b border-gray-50 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
           <h2 className="text-[18px] font-bold text-[#141724] dark:text-white">Umumiy ro'yxat</h2>
           <div className="relative w-full sm:w-[250px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="O'quvchi izlash..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-11 h-11 bg-gray-50 dark:bg-[#0b0e14] border-none rounded-xl text-[13px] font-medium"
              />
           </div>
        </div>
        <ul className="divide-y divide-gray-50 dark:divide-white/5">
          {filtered.map(r => (
             <li key={r.id} className="p-6 flex justify-between items-center hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-black text-[18px]">
                    {r.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-[16px] text-[#141724] dark:text-white">{r.name}</h4>
                    <span className={`text-[12px] font-bold mt-1 inline-block px-2 py-0.5 rounded border ${r.status === "A'lo" ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20' : 'bg-gray-50 text-gray-500 border-gray-200 dark:bg-white/5 dark:border-white/10'}`}>{r.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#0b0e14] px-4 py-2 rounded-2xl">
                  <h3 className="text-[24px] font-black text-[#141724] dark:text-white">{r.score}</h3>
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-white/5 flex items-center justify-center shadow-sm">
                     <TrendingUp className={`w-4 h-4 ${parseFloat(r.score) > 80 ? 'text-emerald-500' : 'text-amber-500'}`} strokeWidth={3} />
                  </div>
                </div>
             </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

import { useState, useEffect } from "react";
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, Clock, PlusCircle, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { financeService } from "@/services/financeService";
import { profileService } from "@/services/profileService";
import { useAuthStore } from "@/store/auth";

export default function PaymentsPage() {
  const { user } = useAuthStore();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({ studentId: "", type: "Oylik To'lov", method: "Payme", amount: "" });

  useEffect(() => {
    fetchPayments();
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await profileService.getAllProfilesByRole('student');
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const data = await financeService.getRecentPayments(20);
      setTransactions(data.map(tx => ({
        id: tx.id.slice(0, 8).toUpperCase(),
        dbId: tx.id,
        student: tx.profiles ? `${tx.profiles.first_name} ${tx.profiles.last_name}` : "Noma'lum",
        type: "Oylik To'lov",
        method: tx.payment_method,
        amount: tx.amount_paid.toLocaleString() + " UZS",
        date: new Date(tx.paid_at).toLocaleString('uz-UZ'),
        status: "Tasdiqlangan"
      })));
    } catch (err) {
      console.error("Error fetching payments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayment.studentId || !newPayment.amount) return;

    setIsLoading(true);
    try {
      await financeService.createPayment({
        student_id: newPayment.studentId,
        amount_paid: Number(newPayment.amount),
        payment_method: newPayment.method,
        processed_by: user?.id || ''
      });

      await fetchPayments();
      setIsModalOpen(false);
      setNewPayment({ studentId: "", type: "Oylik To'lov", method: "Payme", amount: "" });
    } catch (err) {
      console.error("Error creating payment:", err);
      alert("Xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => 
    tx.student.toLowerCase().includes(search.toLowerCase()) || 
    tx.id.toLowerCase().includes(search.toLowerCase()) ||
    tx.amount.includes(search)
  );

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) return;
    const headers = ["Tranzaksiya ID, O'quvchi, To'lov Turi, To'lov Vaqti, Metod, Summa (UZS), Holat\n"];
    const rows = filteredTransactions.map(tx => {
       const student = tx.student.replace(/,/g, '');
       const amount = tx.amount.replace(/,/g, '');
       const date = tx.date.replace(/,/g, '');
       return `${tx.id},${student},${tx.type},${date},${tx.method},${amount},${tx.status}`;
    });
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `moliya_hisoboti_${new Date().toLocaleDateString('uz-UZ')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRevenueNum = transactions
    .filter(tx => tx.status === 'Tasdiqlangan')
    .reduce((acc, curr) => acc + Number(curr.amount.replace(/[^0-9]/g, '')), 0);
  
  const displayRevenueNum = totalRevenueNum; // Removed baseline
  const formattedRevenue = displayRevenueNum >= 1000000 ? (displayRevenueNum / 1000000).toFixed(1) + "M" : displayRevenueNum.toLocaleString();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Moliya va To'lovlar</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Barcha tushumlar, qarzdorliklar va tranzaksiyalar tarixi.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button onClick={handleExportCSV} variant="outline" className="h-11 px-5 rounded-xl border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm">
             <Download className="w-4 h-4 mr-2" /> Eksport (Excel)
           </Button>
           <Button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.98]">
             <PlusCircle className="w-5 h-5 mr-2" strokeWidth={2.5} /> To'lov qabul qilish
           </Button>
        </div>
      </div>

      {/* Advanced KPI Financial Cards */}
      <div className="grid gap-5 md:grid-cols-3">
         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden relative group">
            <div className="p-6 relative z-10">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[14px] font-bold text-gray-400 dark:text-gray-500 tracking-wide">SHU OYDAGI TUSHUM</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-[32px] font-black text-[#141724] dark:text-white tracking-tight">{formattedRevenue}</span>
                      <span className="text-sm font-bold text-gray-400">UZS</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ArrowUpRight className="w-6 h-6" strokeWidth={2.5} />
                  </div>
               </div>
               <div className="mt-4 flex items-center gap-2">
                  <span className="flex items-center text-[12px] font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">
                     +12.5% <ArrowUpRight className="w-3 h-3 ml-0.5" />
                  </span>
                  <span className="text-[12px] font-semibold text-gray-400">O'tgan oyga nisbatan</span>
               </div>
            </div>
            {/* Ambient Background decoration */}
            <div className="absolute right-0 bottom-0 opacity-10 dark:opacity-5 translate-x-1/4 translate-y-1/4 pointer-events-none">
              <CheckCircle2 className="w-48 h-48 text-emerald-500" />
            </div>
         </Card>

         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden relative group">
            <div className="p-6 relative z-10">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[14px] font-bold text-gray-400 dark:text-gray-500 tracking-wide">KUTILAYOTGAN TUSHUM</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-[32px] font-black text-[#141724] dark:text-white tracking-tight">0</span>
                      <span className="text-sm font-bold text-gray-400">UZS</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#3e4cf1] dark:bg-[#3e4cf1]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6" strokeWidth={2.5} />
                  </div>
               </div>
               <div className="w-full bg-gray-100 dark:bg-white/5 h-2 rounded-full overflow-hidden mt-6">
                  <div className="bg-[#3e4cf1] h-full rounded-full" style={{ width: '0%' }}></div>
               </div>
               <div className="mt-2 text-[12px] font-bold text-gray-500 flex justify-between">
                  <span>Planga nisbatan: 0%</span>
                  <span className="text-[#3e4cf1]">---</span>
               </div>
            </div>
         </Card>

         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl overflow-hidden relative group text-white">
            <div className="p-6 relative z-10">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[14px] font-bold text-rose-100 tracking-wide uppercase">Kritik Qarzdorlik</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-[32px] font-black tracking-tight drop-shadow-sm">0.0</span>
                      <span className="text-sm font-bold text-rose-200">UZS</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ArrowDownRight className="w-6 h-6" strokeWidth={2.5} />
                  </div>
               </div>
               <div className="mt-5 pt-4 border-t border-white/20 flex gap-4">
                  <div className="flex flex-col">
                     <span className="text-[11px] text-rose-200 font-semibold uppercase">O'quvchilar</span>
                     <span className="text-lg font-bold">0 ta</span>
                  </div>
                  <div className="flex flex-col border-l border-white/20 pl-4">
                     <span className="text-[11px] text-rose-200 font-semibold uppercase">Status</span>
                     <span className="text-[13px] font-bold flex items-center gap-1 mt-1 bg-white/20 px-2 py-0.5 rounded-md text-white">
                        <ArrowUpRight className="w-3 h-3" /> Barqaror
                     </span>
                  </div>
               </div>
            </div>
         </Card>
      </div>

      {/* Transaction History Table */}
      <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-transparent">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-[#3e4cf1]/10 text-[#3e4cf1] rounded-lg"><Search className="w-5 h-5" /></div>
             <h2 className="text-[18px] font-bold text-[#141724] dark:text-white">So'nggi Tranzaksiyalar</h2>
           </div>
           <div className="flex gap-3 w-full md:w-auto">
             <div className="relative w-full md:w-[300px]">
               <Input 
                 placeholder="ID yoki Ism bo'yicha qidiruv..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="pl-4 h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 rounded-xl focus-visible:ring-[#3e4cf1] text-[14px] font-medium" 
               />
             </div>
             <Button variant="outline" className="h-11 px-4 rounded-xl border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-white/5">
                <Filter className="w-4 h-4" />
             </Button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f4f7f6]/50 dark:bg-[#0b0e14]/50 border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Tranzaksiya ID</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">O'quvchi</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Turi & Vaqt</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Metod</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Summa (UZS)</th>
                <th className="px-6 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider text-right">Holati</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {filteredTransactions.length > 0 ? filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-[13px] font-black text-gray-500 dark:text-gray-400">
                    {tx.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-[14.5px] text-[#141724] dark:text-white group-hover:text-[#3e4cf1] transition-colors">{tx.student}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-bold text-[13.5px] text-[#141724] dark:text-gray-200">{tx.type}</span>
                      <span className="text-[12px] font-semibold text-gray-500 mt-0.5">{tx.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-3 py-1 text-[12px] font-extrabold rounded-md ${
                       tx.method === 'Payme' ? 'bg-[#33cccc]/10 text-[#33cccc]' :
                       tx.method === 'Click' ? 'bg-[#00a1ea]/10 text-[#00a1ea]' :
                       'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300'
                     }`}>
                        {tx.method}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[15px] font-black text-[#141724] dark:text-white">
                    {tx.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Badge 
                       variant="outline" 
                       className={`border-none px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide ${
                          tx.status === 'Tasdiqlangan' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 
                          tx.status === 'Kutilmoqda' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 animate-pulse' : 
                          'bg-rose-50 text-rose-600 dark:bg-rose-500/10'
                       }`}
                    >
                       {tx.status}
                    </Badge>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500 font-medium">Bu so'rov bo'yicha to'lov topilmadi</td>
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
                <h2 className="text-xl font-black text-[#141724] dark:text-white">To'lov qabul qilish</h2>
                <p className="text-sm font-medium text-gray-500 mt-1">O'quvchidan dars to'lovini tizimga kiritish.</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">O'quvchini tanlang *</label>
                <select 
                  required 
                  value={newPayment.studentId} 
                  onChange={(e) => setNewPayment({...newPayment, studentId: e.target.value})}
                  className="w-full h-11 px-3 bg-white dark:bg-[#0b0e14] border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-[#3e4cf1] text-[14px]"
                >
                  <option value="">O'quvchini tanlang</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                   <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">To'lov usuli</label>
                   <select value={newPayment.method} onChange={(e) => setNewPayment({...newPayment, method: e.target.value})} className="w-full h-11 px-3 bg-white dark:bg-[#0b0e14] border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#3e4cf1] outline-none text-[14px]">
                      <option value="Naqd">Naqd pul</option>
                      <option value="Payme">Payme</option>
                      <option value="Click">Click</option>
                      <option value="Humo/Uzcard">Karta orqali</option>
                   </select>
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">To'lov Turi</label>
                   <select value={newPayment.type} onChange={(e) => setNewPayment({...newPayment, type: e.target.value})} className="w-full h-11 px-3 bg-white dark:bg-[#0b0e14] border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#3e4cf1] outline-none text-[14px]">
                      <option value="Oylik To'lov">Oylik To'lov</option>
                      <option value="Qarz to'lovi">Qarz to'lovi</option>
                      <option value="Yarim to'lov">Yarim to'lov</option>
                   </select>
                 </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">To'lov summasi (UZS) *</label>
                <Input type="number" required value={newPayment.amount} onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})} placeholder="Masalan: 550000" className="h-11 bg-white dark:bg-[#0b0e14] border-gray-200 dark:border-white/10 focus-visible:ring-[#3e4cf1]" />
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1 h-11 font-bold border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5">
                  Bekor qilish
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1 h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg">
                  {isLoading ? "Saqlanmoqda..." : "To'lovni Tasdiqlash"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

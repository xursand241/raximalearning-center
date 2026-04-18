import { useState, useEffect } from "react";
import { CreditCard, Wallet, Download, Clock, Receipt } from "lucide-react";
import { financeService } from "@/services/financeService";
import { useAuthStore } from "@/store/auth";

export default function Payments() {
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [payAmount, setPayAmount] = useState("350000");
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
       fetchPayments();
    }
  }, [user]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await financeService.getStudentPayments(user!.id);
      
      const mapped = data.map((item: any) => ({
        id: item.id,
        target: "Joriy to'lov",
        date: new Date(item.paid_at).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        amount: item.amount_paid,
        status: "paid"
      }));

      setTransactions(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async () => {
    if (!payAmount || Number(payAmount) <= 0) return;
    try {
      await financeService.createPayment({
        student_id: user!.id,
        amount_paid: Number(payAmount),
        payment_method: 'karta',
        processed_by: 'student_portal'
      });
      alert(`${payAmount} UZS miqdorida muvaffaqiyatli to'landi!`);
      setShowModal(false);
      fetchPayments();
    } catch (e) {
      console.error(e);
      alert("Xatolik yuz berdi.");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[28px] font-black text-[#141724] dark:text-white">To'lovlar</h1>
          <p className="text-slate-500 font-medium text-[15px] mt-1">Hisobingiz, oylik to'lovlar va tarix.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition-all active:scale-95"
        >
          <CreditCard className="w-5 h-5" />
          To'lov qilish
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="col-span-1 md:col-span-2 bg-gradient-to-tr from-slate-900 to-slate-800 dark:from-[#111827] dark:to-[#1f2937] rounded-[32px] p-8 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="flex flex-col h-full justify-between relative z-10">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                     <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-white/80">Joriy Hisobingiz</h2>
               </div>
               <div className="mt-8">
                  <div className="text-[12px] font-bold tracking-widest text-emerald-400 uppercase mb-1">Ohirgi to'langan summa</div>
                  <div className="text-5xl font-black text-white flex items-end gap-2">
                     {transactions[0]?.amount?.toLocaleString() || 0} <span className="text-2xl text-white/50 mb-1">UZS</span>
                  </div>
               </div>
               <div className="mt-8 text-sm font-medium text-white/60 bg-white/5 px-4 py-3 rounded-xl border border-white/10 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" /> Keyingi to'lov sanasini ma'muriyat belgilaydi
               </div>
            </div>
         </div>
      </div>

      <div className="bg-white dark:bg-[#141724] rounded-[32px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-white/5">
         <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">To'lovlar tarixi</h3>
         </div>
         <div className="p-4">
            {loading ? (
               <div className="py-12 text-center text-slate-500">To'lovlar yuklanmoqda...</div>
            ) : transactions.length === 0 ? (
               <div className="py-16 text-center flex flex-col items-center justify-center">
                  <Receipt className="w-12 h-12 text-slate-300 mb-4" />
                  <p className="text-slate-900 dark:text-white font-bold text-lg">Sizda xali to'lovlar mavjud emas</p>
               </div>
            ) : (
               <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                    {transactions.map((tr) => (
                      <tr key={tr.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                           <div className="font-bold border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#0b0e14] w-12 h-12 flex items-center justify-center rounded-xl text-emerald-500">
                             <CreditCard className="w-5 h-5" />
                           </div>
                        </td>
                        <td className="py-4 px-4">
                           <div className="font-bold text-[15px] text-slate-900 dark:text-white">{tr.target}</div>
                           <div className="font-medium text-[13px] text-slate-500">{tr.date}</div>
                        </td>
                        <td className="py-4 px-4 text-right">
                           <div className="font-black text-[16px] text-slate-900 dark:text-white mb-0.5">{tr.amount.toLocaleString()} UZS</div>
                           <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">To'landi</span>
                        </td>
                        <td className="py-4 px-4 text-right w-16">
                           <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-indigo-500 transition-colors">
                              <Download className="w-4 h-4" />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            )}
         </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm z-50">
           <div className="bg-white dark:bg-[#141724] rounded-[32px] p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">To'lov qilish</h3>
              <p className="text-slate-500 font-medium mb-6">Plastik karta orqali to'lovni amaldan oshirish (Kassa mockup).</p>
              
              <div className="space-y-4 mb-8">
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">To'lov miqdori (UZS)</label>
                    <input 
                      type="number" 
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-white/10 rounded-xl font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                 </div>
              </div>

              <div className="flex gap-3">
                 <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl hover:bg-slate-200 transition-colors">Bekor qilish</button>
                 <button onClick={handlePay} className="flex-1 px-4 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition-all">To'lash</button>
              </div>
           </div>
        </div>
      )}
    </div>
  )
}

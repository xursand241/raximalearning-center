import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, Clock, Download, CheckCircle, Search } from "lucide-react";

export default function ParentPayments() {
  const { user } = useAuthStore();
  const [payments, setPayments] = useState([
    { id: 1, title: "Ingliz tili kursi", amount: 450000, date: "2026-04-10", status: "paid", student: "Timur Azizov", receipt: "#INV-2026-001" },
    { id: 2, title: "Matematika kursi", amount: 300000, date: "2026-03-15", status: "paid", student: "Timur Azizov", receipt: "#INV-2026-002" },
    { id: 3, title: "Fizika kursi", amount: 350000, date: "2026-04-20", status: "pending", student: "Jasur Rakhimov", receipt: "Kutilmoqda" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = payments.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-black text-[#141724] dark:text-white">To'lovlar tarixi</h1>
           <p className="text-gray-500 font-medium mt-1">Farzandlaringizning o'qish to'lovlari ro'yxati</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-[24px]">
            <CardContent className="p-8">
               <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6 backdrop-blur-md">
                 <DollarSign className="w-6 h-6 text-white"/>
               </div>
               <p className="text-indigo-100 font-medium text-sm font-black uppercase tracking-widest">Jami to'langan</p>
               <h2 className="text-3xl font-black mt-2">750,000 UZS</h2>
            </CardContent>
         </Card>
         
         <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-[24px]">
            <CardContent className="p-8">
               <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center mb-6 text-amber-500">
                 <Clock className="w-6 h-6"/>
               </div>
               <p className="text-gray-400 font-medium text-sm font-black uppercase tracking-widest">Kutilayotgan to'lov</p>
               <h2 className="text-3xl font-black mt-2 text-[#141724] dark:text-white">350,000 UZS</h2>
            </CardContent>
         </Card>
         
         <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-[24px]">
            <CardContent className="p-8">
               <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-500">
                 <CheckCircle className="w-6 h-6"/>
               </div>
               <p className="text-gray-400 font-medium text-sm font-black uppercase tracking-widest">So'nggi to'lov</p>
               <h2 className="text-3xl font-black mt-2 text-[#141724] dark:text-white">10.04.2026</h2>
            </CardContent>
         </Card>
      </div>

      <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-[24px] overflow-hidden">
        <CardHeader className="border-b border-gray-50 dark:border-white/5 px-8 py-6 flex sm:flex-row flex-col items-start sm:items-center justify-between gap-4">
           <CardTitle className="text-[18px] font-black">Barcha to'lovlar</CardTitle>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
              <input 
                 type="text" 
                 placeholder="Qidirish..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-white/5 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium outline-none w-full sm:w-[250px]"
              />
           </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                <th className="px-8 py-4 text-left text-[12px] font-black text-gray-400 uppercase tracking-wider">Kurs</th>
                <th className="px-8 py-4 text-left text-[12px] font-black text-gray-400 uppercase tracking-wider">O'quvchi</th>
                <th className="px-8 py-4 text-left text-[12px] font-black text-gray-400 uppercase tracking-wider">Sana</th>
                <th className="px-8 py-4 text-left text-[12px] font-black text-gray-400 uppercase tracking-wider">Miqdor</th>
                <th className="px-8 py-4 text-left text-[12px] font-black text-gray-400 uppercase tracking-wider">Holat</th>
                <th className="px-8 py-4 text-right text-[12px] font-black text-gray-400 uppercase tracking-wider">Chek</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                  <td className="px-8 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                         <CreditCard className="w-5 h-5"/>
                       </div>
                       <span className="font-bold text-[15px]">{payment.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap font-medium text-gray-600 dark:text-gray-300">
                    {payment.student}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap font-medium text-gray-600 dark:text-gray-300">
                    {payment.date}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap font-black text-[15px]">
                    {payment.amount.toLocaleString()} UZS
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    {payment.status === 'paid' ? (
                      <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-none font-black text-[11px] px-3 py-1">TO'LANGAN</Badge>
                    ) : (
                      <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-none font-black text-[11px] px-3 py-1">KUTILMOQDA</Badge>
                    )}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap text-right">
                    {payment.status === 'paid' ? (
                      <button className="p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 dark:bg-white/5 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors inline-flex items-center gap-2 font-black text-xs">
                         <Download className="w-4 h-4"/> PDF
                      </button>
                    ) : (
                      <span className="text-gray-400 font-medium text-sm">--</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPayments.length === 0 && (
            <div className="py-12 text-center text-gray-500 font-medium">Hech qanday to'lov qilinmagan.</div>
          )}
        </div>
      </Card>
    </div>
  );
}

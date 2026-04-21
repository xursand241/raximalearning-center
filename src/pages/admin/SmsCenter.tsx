import { useState, useEffect } from "react";
import { Smartphone, Send, History, Settings, CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { smsService } from "@/services/smsService";
import type { SmsLog } from "@/services/smsService";

export default function SmsCenter() {
  const [logs, setLogs] = useState<SmsLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewSmsOpen, setIsNewSmsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendSms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !message) return;
    setIsSending(true);
    try {
      await smsService.sendSms(phone, message);
      setPhone("");
      setMessage("");
      setIsNewSmsOpen(false);
      // Refresh logs
      const data = await smsService.getLogs();
      setLogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    async function fetchLogs() {
      setIsLoading(true);
      try {
        const data = await smsService.getLogs();
        setLogs(data);
      } catch (err) {
        console.error("Error fetching SMS logs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLogs();
  }, []);

  const totalSent = logs.length;
  const successCount = logs.filter(l => l.status === 'sent').length;
  const errorCount = logs.filter(l => l.status === 'failed').length;
  const successRate = totalSent > 0 ? ((successCount / totalSent) * 100).toFixed(1) : 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-3xl font-black tracking-tight text-[#141724] dark:text-white leading-tight">SMS Markaz</h1>
           <p className="text-gray-500 font-medium mt-1 text-[15px]">Avtomatlashtirilgan xabarlar va Eskiz API sozlamalari.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" onClick={() => document.getElementById('api-settings')?.scrollIntoView({ behavior: 'smooth' })} className="h-11 px-5 border-gray-200 dark:border-white/10 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
             <Settings className="w-4 h-4 mr-2" /> Sozlamalar
           </Button>
           <Button onClick={() => setIsNewSmsOpen(true)} className="h-11 px-6 bg-[#3e4cf1] hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20">
             <Send className="w-4 h-4 mr-2" /> Yangi SMS
           </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-all duration-500"><Smartphone className="w-20 h-20"/></div>
            <CardContent className="p-6 relative z-10">
               <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-1">Jami Yuborilgan</p>
               <h3 className="text-[32px] font-black text-[#141724] dark:text-white">{totalSent.toLocaleString()}</h3>
               <div className="flex items-center text-[13px] font-bold text-gray-500 mt-2">
                 Limit: Ma'lumot yo'q
               </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-2xl overflow-hidden group">
            <CardContent className="p-6">
               <p className="text-[12px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">Muvaffaqiyatli</p>
               <h3 className="text-[32px] font-black text-[#141724] dark:text-white">{successRate}%</h3>
               <div className="flex items-center gap-1.5 text-[13px] font-bold text-emerald-600 mt-2">
                 <CheckCircle2 className="w-4 h-4" /> {successCount} ta SMS yetkazildi
               </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-2xl overflow-hidden group">
            <CardContent className="p-6">
               <p className="text-[12px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-1">Xatoliklar</p>
               <h3 className="text-[32px] font-black text-[#141724] dark:text-white">{errorCount} ta</h3>
               <div className="flex items-center gap-1.5 text-[13px] font-bold text-rose-600 mt-2">
                 <AlertCircle className="w-4 h-4" /> Qayta urinish talab etiladi
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
         <Card className="lg:col-span-2 border-none shadow-sm bg-white dark:bg-[#141724] rounded-[32px] overflow-hidden">
            <CardHeader className="px-8 py-6 border-b border-gray-50 dark:border-white/5">
                <CardTitle className="text-[18px] font-black">Xabarlar Tarixi</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
               <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-50 dark:border-white/5 bg-gray-50/50 dark:bg-transparent">
                      <TableHead className="px-8 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Qabul qiluvchi</TableHead>
                      <TableHead className="px-8 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Turi</TableHead>
                      <TableHead className="px-8 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider">Vaqti</TableHead>
                      <TableHead className="px-8 py-4 text-[12px] font-black text-gray-400 uppercase tracking-wider text-right">Holat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.length > 0 ? logs.map((log: any) => (
                      <TableRow key={log.id} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                        <TableCell className="px-8 py-5">
                          <div className="font-bold text-[14px] text-[#141724] dark:text-gray-200">
                            {log.profiles ? `${log.profiles.first_name} ${log.profiles.last_name}` : "Noma'lum o'quvchi"}
                          </div>
                          <div className="text-[12px] font-medium text-gray-500">{log.phone}</div>
                        </TableCell>
                        <TableCell className="px-8 py-5 text-[14px] font-medium text-gray-600 dark:text-gray-400">
                           {log.message.length > 30 ? log.message.substring(0, 30) + "..." : log.message}
                        </TableCell>
                        <TableCell className="px-8 py-5 text-[14px] font-medium text-gray-500">
                          {log.created_at ? new Date(log.created_at).toLocaleString('uz-UZ') : '---'}
                        </TableCell>
                        <TableCell className="px-8 py-5 text-right">
                          <Badge className={`border-none px-3 py-1 font-black text-[10px] tracking-widest uppercase ${log.status === "sent" ? "bg-emerald-500/10 text-emerald-600" : log.status === "pending" ? "bg-amber-500/10 text-amber-600" : "bg-rose-500/10 text-rose-600"}`}>
                            {log.status === "sent" ? "YUBORILDI" : log.status === "pending" ? "KUTILMOQDA" : "XATOLIK"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                         <TableCell colSpan={4} className="py-12 text-center text-gray-500 font-bold">Hech qanday SMS yuborilmagan.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
               </Table>
            </div>
         </Card>

         <Card id="api-settings" className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-[32px] overflow-hidden">
            <CardHeader className="px-8 py-6 border-b border-gray-50 dark:border-white/5">
                <CardTitle className="text-[18px] font-black text-[#141724] dark:text-white">API Sozlamalari</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                 <div className="space-y-1.5">
                   <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Eskiz.uz Email</label>
                   <Input defaultValue="sozlanmagan@eskiz.uz" className="h-11 bg-gray-50 dark:bg-white/5 border-none rounded-xl font-medium" disabled />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[13px] font-bold text-gray-700 dark:text-gray-400">Secret Token</label>
                   <Input type="password" defaultValue="**********************" className="h-11 bg-gray-50 dark:bg-white/5 border-none rounded-xl" disabled />
                 </div>
                
                 <div className="pt-4 space-y-3">
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent opacity-50 cursor-not-allowed">
                       <div>
                          <p className="text-[14px] font-black text-[#141724] dark:text-white">Davomat SMS</p>
                          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">Sozlanmagan</p>
                       </div>
                       <div className="w-10 h-5 rounded-full bg-gray-300 dark:bg-gray-700 relative">
                          <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                       </div>
                    </div>
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent opacity-50 cursor-not-allowed">
                       <div>
                          <p className="text-[14px] font-black text-[#141724] dark:text-white">To'lov SMS</p>
                          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">Sozlanmagan</p>
                       </div>
                       <div className="w-10 h-5 rounded-full bg-gray-300 dark:bg-gray-700 relative">
                          <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                       </div>
                    </div>
                 </div>
            </CardContent>
         </Card>
      </div>

      {isNewSmsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-md border-none shadow-2xl bg-white dark:bg-[#141724] rounded-3xl overflow-hidden scale-in-95 animate-in duration-200">
            <CardHeader className="px-6 py-5 border-b border-gray-50 dark:border-white/5 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black text-[#141724] dark:text-white">Yangi SMS Yuborish</CardTitle>
              <button type="button" onClick={() => setIsNewSmsOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </CardHeader>
            <form onSubmit={handleSendSms}>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Telefon raqam</label>
                  <Input 
                    placeholder="+998 90 123 45 67" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    className="h-12 bg-gray-50 dark:bg-white/5 border-none rounded-xl font-medium text-[#141724] dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Xabar matni</label>
                  <textarea 
                    placeholder="Xabar matnini kiriting..." 
                    value={message} 
                    onChange={e => setMessage(e.target.value)}
                    className="w-full h-32 p-3 bg-gray-50 dark:bg-white/5 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-sm font-medium text-[#141724] dark:text-white"
                    required
                  />
                </div>
              </CardContent>
              <div className="p-6 pt-0 flex gap-3">
                <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl dark:border-white/10 dark:hover:bg-white/5" onClick={() => setIsNewSmsOpen(false)}>Bekor qilish</Button>
                <Button type="submit" disabled={isSending} className="flex-1 h-12 bg-[#3e4cf1] hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 font-bold">
                  {isSending ? "Yuborilmoqda..." : "Yuborish"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

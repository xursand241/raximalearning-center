import { Smartphone, Send, History, Settings, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SmsCenter() {
  const smsLogs = [
    { id: "MSG-101", to: "+998 90 123 45 67", type: "Tolam", status: "Sent", time: "10:45 AM, Bugun", provider: "Eskiz" },
    { id: "MSG-102", to: "+998 91 987 65 43", type: "Davomat (Yo'q)", status: "Sent", time: "09:12 AM, Bugun", provider: "Eskiz" },
    { id: "MSG-103", to: "+998 93 321 76 54", type: "Qarz ogohlantirish", status: "Failed", time: "Kechagi kungi", provider: "Eskiz" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">SMS Markaz</h1>
           <p className="text-muted-foreground mt-1 text-[15px]">Avtomatlashtirilgan xabarlar va Eskiz API sozlamalari.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="gap-2 bg-white dark:bg-card border-gray-200 dark:border-white/10">
             <Settings className="w-4 h-4" />
             API Sozlamalari
           </Button>
           <Button className="gap-2 bg-[#3e4cf1] hover:bg-[#3e4cf1]/90 text-white shadow-md">
             <Send className="w-4 h-4" />
             Yangi SMS
           </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         <Card className="shadow-sm border-gray-200/60 dark:border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Smartphone className="w-16 h-16" />
            </div>
            <CardContent className="p-6">
               <p className="text-sm font-semibold text-muted-foreground mb-1">Jami Yuborilgan (Shu oy)</p>
               <h3 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">1,492</h3>
               <div className="flex items-center text-xs font-medium text-gray-500 mt-2">
                 Limit: 10,000 SMS
               </div>
            </CardContent>
         </Card>
         <Card className="shadow-sm border-gray-200/60 dark:border-white/5">
            <CardContent className="p-6">
               <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Muvaffaqiyatli</p>
               <h3 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">98.5%</h3>
               <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 mt-2">
                 <CheckCircle2 className="w-3.5 h-3.5" />
                 1,470 ta SMS yetkazildi
               </div>
            </CardContent>
         </Card>
         <Card className="shadow-sm border-gray-200/60 dark:border-white/5">
            <CardContent className="p-6">
               <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 mb-1">Xatoliklar</p>
               <h3 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">22 ta</h3>
               <div className="flex items-center gap-1.5 text-xs font-medium text-rose-600 mt-2">
                 <AlertCircle className="w-3.5 h-3.5" />
                 Qayta urinish talab etiladi
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
         <Card className="lg:col-span-2 shadow-sm border-gray-200/60 dark:border-white/5">
            <CardHeader className="pb-4">
               <CardTitle className="text-lg">So'nggi Xabarlar Tarixi</CardTitle>
               <CardDescription>Barcha yuborilgan xabarlarning holati.</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                 <TableHeader>
                   <TableRow className="border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
                     <TableHead className="w-[120px]">Qabul qiluvchi</TableHead>
                     <TableHead>Turi</TableHead>
                     <TableHead>Vaqti</TableHead>
                     <TableHead className="text-right">Holat</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {smsLogs.map((log) => (
                     <TableRow key={log.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02]">
                       <TableCell className="font-semibold text-[13px]">{log.to}</TableCell>
                       <TableCell className="text-[13px] text-gray-600 dark:text-gray-400">{log.type}</TableCell>
                       <TableCell className="text-[13px] text-gray-500">{log.time}</TableCell>
                       <TableCell className="text-right">
                         <Badge variant={log.status === "Sent" ? "success" : "destructive"} className="text-[11px] px-2 py-0.5">
                           {log.status === "Sent" ? "Yuborildi" : "Xatolik"}
                         </Badge>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
            </CardContent>
         </Card>

         <Card className="shadow-sm border-gray-200/60 dark:border-white/5">
            <CardHeader className="pb-4 border-b border-gray-100 dark:border-white/5">
               <CardTitle className="text-lg">Eskiz API API sozlamalari</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
               <div className="space-y-2">
                 <label className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">Email / Email Address</label>
                 <Input defaultValue="api@eskiz.uz" className="bg-gray-50 dark:bg-[#0b0e14] border-gray-200 dark:border-white/10" disabled />
               </div>
               <div className="space-y-2">
                 <label className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">Secret / Token</label>
                 <Input type="password" defaultValue="**********************" className="bg-gray-50 dark:bg-[#0b0e14] border-gray-200 dark:border-white/10" disabled />
               </div>
               
               <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02]">
                     <div>
                        <p className="text-[13px] font-bold">Davomat (Avto SMS)</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">Darsga kelmaganda jo'natiladi</p>
                     </div>
                     <div className="w-8 h-4 rounded-full bg-emerald-500 relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02]">
                     <div>
                        <p className="text-[13px] font-bold">To'lov (Avto SMS)</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">Eslatma va qarz haqida</p>
                     </div>
                     <div className="w-8 h-4 rounded-full bg-emerald-500 relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

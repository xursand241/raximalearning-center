import { CheckCircle2, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AttendancePage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Davomat Markazi</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Avtomatlashtirilgan davomat va jarayonlarni kuzatish.</p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3 mt-8">
         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-[#3e4cf1] rounded-2xl overflow-hidden p-6 text-white text-center">
             <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
             <h2 className="text-xl font-black mb-2">Kunlik Davomat</h2>
             <p className="text-[13px] text-blue-100 mb-6 font-medium">Barcha guruhlarning bugungi holatini tahlil qilish</p>
             <Button className="w-full bg-white text-[#3e4cf1] hover:bg-gray-100 font-bold">Ko'rish</Button>
         </Card>
         
         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-emerald-500 rounded-2xl overflow-hidden p-6 text-white text-center">
             <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
             <h2 className="text-xl font-black mb-2">Yo'qlamalar Tarixi</h2>
             <p className="text-[13px] text-emerald-100 mb-6 font-medium">O'quvchilar kesimida qoldirilgan darslar analizi</p>
             <Button className="w-full bg-emerald-700 text-white hover:bg-emerald-800 font-bold border-none">Ochish</Button>
         </Card>

         <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden p-6 text-center">
             <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
             <h2 className="text-xl font-black mb-2 text-[#141724] dark:text-white">API Integratsiya</h2>
             <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-6 font-medium">Face ID yoki Turniket bilan hamkorlik qilish (Tez kunda)</p>
             <Button disabled variant="outline" className="w-full font-bold">Ulanish uqilmoqda...</Button>
         </Card>
      </div>
    </div>
  );
}

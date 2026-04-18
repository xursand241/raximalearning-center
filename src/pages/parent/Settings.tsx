import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Lock, Phone, Mail, Bell, Shield, Save } from "lucide-react";

export default function ParentSettings() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="animate-in fade-in duration-500 space-y-8 pb-12">
      <div>
         <h1 className="text-3xl font-black text-[#141724] dark:text-white">Sozlamalar</h1>
         <p className="text-gray-500 font-medium mt-1">Shaxsiy hisob va xavfsizlik sozlamalari</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full md:w-[280px] shrink-0 space-y-2">
           <button 
             onClick={() => setActiveTab('profile')}
             className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl text-[14.5px] font-bold transition-all ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white dark:bg-[#141724] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm'}`}
           >
              <User className="w-5 h-5"/> Shaxsiy ma'lumotlar
           </button>
           <button 
             onClick={() => setActiveTab('security')}
             className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl text-[14.5px] font-bold transition-all ${activeTab === 'security' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white dark:bg-[#141724] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm'}`}
           >
              <Lock className="w-5 h-5"/> Xavfsizlik va Parol
           </button>
           <button 
             onClick={() => setActiveTab('notifications')}
             className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl text-[14.5px] font-bold transition-all ${activeTab === 'notifications' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white dark:bg-[#141724] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm'}`}
           >
              <Bell className="w-5 h-5"/> Xabarnomalar
           </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-[24px] overflow-hidden">
               <CardHeader className="border-b border-gray-50 dark:border-white/5 px-8 py-6">
                 <CardTitle className="text-[18px] font-black flex items-center gap-2">
                   <User className="w-5 h-5 text-indigo-600"/> Profil ma'lumotlari
                 </CardTitle>
               </CardHeader>
               <CardContent className="p-8">
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-50 dark:border-white/5">
                     <div className="w-24 h-24 rounded-[20px] bg-indigo-100 flex items-center justify-center text-4xl font-black text-indigo-600">
                        {user?.name?.[0] || 'O'}
                     </div>
                     <div>
                        <h3 className="text-xl font-black">{user?.name || "Ota-ona"}</h3>
                        <p className="text-gray-500 font-medium">Ota-ona hisobi</p>
                        <button className="mt-3 text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-lg transition-colors">
                           Rasmni o'zgartirish
                        </button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Ism</label>
                        <input type="text" defaultValue={user?.name?.split(' ')[0]} className="w-full bg-gray-50 dark:bg-white/5 border-none px-4 py-3.5 rounded-xl text-[14px] font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Familiya</label>
                        <input type="text" defaultValue={user?.name?.split(' ')[1]} className="w-full bg-gray-50 dark:bg-white/5 border-none px-4 py-3.5 rounded-xl text-[14px] font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
                     </div>
                     <div className="space-y-2 relative">
                        <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Telefon raqam</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                          <input type="text" defaultValue="+998 90 123 45 67" className="w-full bg-gray-50 dark:bg-white/5 border-none pl-11 pr-4 py-3.5 rounded-xl text-[14px] font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
                        </div>
                     </div>
                     <div className="space-y-2 relative">
                        <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Email manzili</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                          <input type="email" defaultValue="parent@example.com" className="w-full bg-gray-50 dark:bg-white/5 border-none pl-11 pr-4 py-3.5 rounded-xl text-[14px] font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-50 dark:border-white/5 flex justify-end">
                     <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-black text-[14px] flex items-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">
                        <Save className="w-4 h-4"/> O'ZGARISHLARNI SAQLASH
                     </button>
                  </div>
               </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-[24px] overflow-hidden">
               <CardHeader className="border-b border-gray-50 dark:border-white/5 px-8 py-6">
                 <CardTitle className="text-[18px] font-black flex items-center gap-2">
                   <Shield className="w-5 h-5 text-indigo-600"/> Xavfsizlik va Parol
                 </CardTitle>
               </CardHeader>
               <CardContent className="p-8 space-y-6">
                  <div className="space-y-2 max-w-md">
                     <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Joriy parol</label>
                     <input type="password" placeholder="••••••••" className="w-full bg-gray-50 dark:bg-white/5 border-none px-4 py-3.5 rounded-xl text-[14px] font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
                  </div>
                  <div className="space-y-2 max-w-md">
                     <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Yangi parol</label>
                     <input type="password" placeholder="Parolni kiriting..." className="w-full bg-gray-50 dark:bg-white/5 border-none px-4 py-3.5 rounded-xl text-[14px] font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
                  </div>
                  <div className="space-y-2 max-w-md">
                     <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Yangi parolni tasdiqlang</label>
                     <input type="password" placeholder="Parolni qayta kiriting..." className="w-full bg-gray-50 dark:bg-white/5 border-none px-4 py-3.5 rounded-xl text-[14px] font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-50 dark:border-white/5 flex justify-start">
                     <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-black text-[14px] flex items-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">
                        PAROLNI YANGILASH
                     </button>
                  </div>
               </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-[24px] overflow-hidden">
               <CardHeader className="border-b border-gray-50 dark:border-white/5 px-8 py-6">
                 <CardTitle className="text-[18px] font-black flex items-center gap-2">
                   <Bell className="w-5 h-5 text-indigo-600"/> Xabarnomalar sozlamalari
                 </CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-gray-50 dark:divide-white/5">
                     <div className="p-8 flex items-center justify-between">
                        <div>
                           <h4 className="font-bold text-[15px] text-[#141724] dark:text-white">SMS Xabarnomalar</h4>
                           <p className="text-[13px] text-gray-500 mt-1">Sms orqali dars qoldirilishi va to'lovlar haqida xabar olish</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                        </label>
                     </div>
                     <div className="p-8 flex items-center justify-between">
                        <div>
                           <h4 className="font-bold text-[15px] text-[#141724] dark:text-white">Telegram bildirishnomalari</h4>
                           <p className="text-[13px] text-gray-500 mt-1">Telegram boti orqali kunlik ballar va vazifalar xaqida ma'lumot</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                        </label>
                     </div>
                     <div className="p-8 flex items-center justify-between opacity-70">
                        <div>
                           <h4 className="font-bold text-[15px] text-[#141724] dark:text-white">Email xabarlar</h4>
                           <p className="text-[13px] text-gray-500 mt-1">Elektron pochta orqali oylik xisobotlarni qabul qilish</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                        </label>
                     </div>
                  </div>
               </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}

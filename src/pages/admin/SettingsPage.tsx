import { useState, useEffect } from "react";
import { Save, Building2, Bell, Shield, Key, LayoutTemplate, Smartphone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { themeService } from "@/services/themeService";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("appearance");
  const [currentSettings, setCurrentSettings] = useState(themeService.getSettings());

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    themeService.setTheme(theme);
    setCurrentSettings(prev => ({ ...prev, theme }));
  };

  const handleAccentChange = (color: 'blue' | 'emerald' | 'rose' | 'amber' | 'purple') => {
    themeService.setAccentColor(color);
    setCurrentSettings(prev => ({ ...prev, accent: color }));
  };

  const tabs = [
    { id: "general", name: "Umumiy", icon: Building2 },
    { id: "notifications", name: "Bildirishnomalar", icon: Bell },
    { id: "security", name: "Xavfsizlik", icon: Shield },
    { id: "api", name: "API & Integratsiya", icon: Key },
    { id: "appearance", name: "Tashqi ko'rinish", icon: LayoutTemplate },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6 min-h-[calc(100vh-120px)] flex flex-col">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-[28px] font-black tracking-tight text-[#141724] dark:text-white">Sozlamalar</h1>
           <p className="text-gray-500 font-medium text-[15px] mt-1">Platforma, xavfsizlik va integratsiyalarni boshqarish.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="bg-[#3e4cf1] hover:bg-[#3442d9] text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-[#3e4cf1]/20 transition-all">
             <Save className="w-5 h-5 mr-2" strokeWidth={2.5} /> O'zgarishlarni Saqlash
           </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6 flex-1">
         
         {/* Sidebar Tabs */}
         <div className="w-full md:w-[280px] shrink-0 space-y-1">
            {tabs.map(tab => {
               const Icon = tab.icon;
               const isActive = activeTab === tab.id;
               return (
                  <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[14px] font-bold transition-all ${
                        isActive 
                        ? "bg-white dark:bg-[#141724] text-[#3e4cf1] shadow-sm border border-gray-100 dark:border-white/5" 
                        : "text-gray-500 hover:text-[#141724] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"
                     }`}
                  >
                     <Icon className={`w-5 h-5 ${isActive ? "text-[#3e4cf1]" : "text-gray-400"}`} strokeWidth={isActive ? 2.5 : 2} />
                     {tab.name}
                  </button>
               )
            })}
         </div>

         {/* Settings Content Area */}
         <div className="flex-1">
            <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none bg-white dark:bg-[#141724] rounded-2xl overflow-hidden p-6 sm:p-8 relative">
               
               {activeTab === "general" && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
                     <div>
                        <h2 className="text-[18px] font-black text-[#141724] dark:text-white mb-1">Tashkilot Ma'lumotlari</h2>
                        <p className="text-[13px] font-medium text-gray-500">Akademiyangizning rasmiy nomi va ma'lumotlarini kiriting.</p>
                     </div>
                     
                     <div className="flex flex-col sm:flex-row gap-6 items-start">
                        {/* Fake Logo Upload */}
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#3e4cf1] to-indigo-500 flex items-center justify-center text-white text-3xl font-black shadow-lg shrink-0">
                           RA
                        </div>
                        <div className="space-y-1.5 flex-1 w-full">
                           <label className="text-[12px] font-extrabold text-gray-400 uppercase tracking-widest">Akademiya Nomi</label>
                           <Input defaultValue="Raxima Academy" className="h-12 bg-[#f4f7f6] dark:bg-[#0b0e14] border-gray-100 dark:border-white/5 rounded-xl font-bold text-[#141724] dark:text-white focus-visible:ring-[#3e4cf1]" />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                           <label className="text-[12px] font-extrabold text-gray-400 uppercase tracking-widest">Aloqa Raqami</label>
                           <Input defaultValue="+998 90 123 45 67" className="h-12 bg-[#f4f7f6] dark:bg-[#0b0e14] border-gray-100 dark:border-white/5 rounded-xl font-semibold focus-visible:ring-[#3e4cf1]" />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[12px] font-extrabold text-gray-400 uppercase tracking-widest">Email (Administrator)</label>
                           <Input defaultValue="admin@raxima.uz" type="email" className="h-12 bg-[#f4f7f6] dark:bg-[#0b0e14] border-gray-100 dark:border-white/5 rounded-xl font-semibold focus-visible:ring-[#3e4cf1]" />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                           <label className="text-[12px] font-extrabold text-gray-400 uppercase tracking-widest">Manzil</label>
                           <Input defaultValue="Toshkent shahar, Yunusobod tumani, 14-mavze" className="h-12 bg-[#f4f7f6] dark:bg-[#0b0e14] border-gray-100 dark:border-white/5 rounded-xl font-semibold focus-visible:ring-[#3e4cf1]" />
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === "api" && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
                     <div>
                        <h2 className="text-[18px] font-black text-[#141724] dark:text-white mb-1">To'lov & API Integratsiyalar</h2>
                        <p className="text-[13px] font-medium text-gray-500">Tashqi to'lov tizimlari va xizmatlarni ulash kalitlari (Tokenlar).</p>
                     </div>
                     
                     <div className="space-y-6">
                        
                        {/* Eskiz SMS API Section */}
                        <div className="p-6 border border-gray-100 dark:border-white/5 rounded-2xl bg-[#f4f7f6] dark:bg-[#0b0e14]/50">
                           <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center font-black text-sm">
                                 SMS
                              </div>
                              <div>
                                 <h4 className="text-[15px] font-bold text-[#141724] dark:text-white">Eskiz.uz SMS </h4>
                                 <p className="text-[12px] text-gray-500 font-medium">Barcha xabarnomalarni yuborish uchun markaz</p>
                              </div>
                              <Badge className="ml-auto bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 hover:bg-emerald-50 border-none px-3 font-bold">Faol</Badge>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                              <div className="space-y-1.5">
                                 <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Email (Login)</label>
                                 <Input defaultValue="academy@raxima.uz" className="h-11 bg-white dark:bg-[#141724] border-gray-200 dark:border-white/10 rounded-xl" />
                              </div>
                              <div className="space-y-1.5">
                                 <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Maxfiy Kalit (Secret Token)</label>
                                 <div className="flex gap-2">
                                    <Input type="password" value="eskiz_f123j123kl1j23l12j3" readOnly className="h-11 bg-white dark:bg-[#141724] border-gray-200 dark:border-white/10 rounded-xl" />
                                    <Button variant="outline" className="h-11 px-4 rounded-xl border-gray-200 font-bold dark:border-white/10 dark:text-white text-gray-600">Qayta tiklash</Button>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Payme Integrations */}
                        <div className="p-6 border border-gray-100 dark:border-white/5 rounded-2xl bg-[#f4f7f6] dark:bg-[#0b0e14]/50">
                           <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-white dark:bg-white/5 rounded-lg flex items-center justify-center p-2 shadow-sm border border-gray-100 dark:border-white/5">
                                 <Smartphone className="w-full h-full text-[#33cccc]" />
                              </div>
                              <div>
                                 <h4 className="text-[15px] font-bold text-[#141724] dark:text-white">Payme Merchant</h4>
                                 <p className="text-[12px] text-gray-500 font-medium">To'lovlarni qabul qilish va tekshirish (Billing)</p>
                              </div>
                              <Badge className="ml-auto bg-gray-100 text-gray-500 dark:bg-white/5 border-none px-3 font-bold hover:bg-gray-100 dark:hover:bg-white/10">Noaktiv</Badge>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                              <div className="space-y-1.5">
                                 <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Merchant ID</label>
                                 <Input placeholder="Payme biznes ID raqami" className="h-11 bg-white dark:bg-[#141724] border-gray-200 dark:border-white/10 rounded-xl" />
                              </div>
                              <div className="space-y-1.5">
                                 <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Test & Live Kalitlari</label>
                                 <div className="flex gap-2">
                                    <Input type="password" placeholder="Keyni kiriting" className="h-11 bg-white dark:bg-[#141724] border-gray-200 dark:border-white/10 rounded-xl" />
                                    <Button className="bg-[#3e4cf1] hover:bg-[#3442d9] text-white h-11 px-6 rounded-xl font-bold">Saqlash</Button>
                                 </div>
                              </div>
                           </div>
                        </div>

                     </div>
                  </div>
               )}

               {activeTab === "notifications" && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
                     <div>
                        <h2 className="text-[18px] font-black text-[#141724] dark:text-white mb-1">Bildirishnomalar</h2>
                        <p className="text-[13px] font-medium text-gray-500">Qaysi holatlarda elektron pochta yoki SMS orqali ogohlantirish olishni tanlang.</p>
                     </div>
                     
                     <div className="space-y-4">
                        <div className="p-5 border border-gray-100 dark:border-white/5 rounded-2xl flex justify-between items-center bg-[#f4f7f6] dark:bg-[#0b0e14]/50 group hover:border-[#3e4cf1]/30 transition-colors">
                           <div>
                              <h4 className="text-[15px] font-bold text-[#141724] dark:text-white">To'lov kechikishi</h4>
                              <p className="text-[12px] text-gray-500 font-medium mt-0.5">O'quvchining oylik to'lovi 3 kundan oshganda xabar berish</p>
                           </div>
                           <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3e4cf1]"></div>
                           </label>
                        </div>
                        
                        <div className="p-5 border border-gray-100 dark:border-white/5 rounded-2xl flex justify-between items-center bg-[#f4f7f6] dark:bg-[#0b0e14]/50 group hover:border-[#3e4cf1]/30 transition-colors">
                           <div>
                              <h4 className="text-[15px] font-bold text-[#141724] dark:text-white">Yangi a'zo qo'shilishi</h4>
                              <p className="text-[12px] text-gray-500 font-medium mt-0.5">Yangi o'quvchi yoki o'qituvchi bazaga qo'shilganda</p>
                           </div>
                           <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3e4cf1]"></div>
                           </label>
                        </div>

                        <div className="p-5 border border-gray-100 dark:border-white/5 rounded-2xl flex justify-between items-center bg-[#f4f7f6] dark:bg-[#0b0e14]/50 group hover:border-[#3e4cf1]/30 transition-colors">
                           <div>
                              <h4 className="text-[15px] font-bold text-[#141724] dark:text-white">Tizim xavfsizligi</h4>
                              <p className="text-[12px] text-gray-500 font-medium mt-0.5">Yangi qurilmadan hisobga kirilganda ogohlantirish</p>
                           </div>
                           <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3e4cf1]"></div>
                           </label>
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === "security" && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
                     <div>
                        <h2 className="text-[18px] font-black text-[#141724] dark:text-white mb-1">Xavfsizlik va Parol</h2>
                        <p className="text-[13px] font-medium text-gray-500">Hisobingizni ishonchli himoya qiling va faol seanslarni boshqaring.</p>
                     </div>

                     <div className="space-y-4 max-w-xl">
                        <div className="space-y-1.5">
                           <label className="text-[12px] font-extrabold text-gray-400 uppercase tracking-widest">Joriy Parol</label>
                           <Input type="password" placeholder="••••••••" className="h-12 bg-[#f4f7f6] dark:bg-[#0b0e14] border-gray-100 dark:border-white/5 rounded-xl font-bold focus-visible:ring-[#3e4cf1]" />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[12px] font-extrabold text-gray-400 uppercase tracking-widest">Yangi Parol</label>
                           <Input type="password" placeholder="Yangi parolni kiriting" className="h-12 bg-[#f4f7f6] dark:bg-[#0b0e14] border-gray-100 dark:border-white/5 rounded-xl font-bold focus-visible:ring-[#3e4cf1]" />
                        </div>
                        <Button className="bg-[#141724] dark:bg-white text-white dark:text-[#141724] font-bold h-11 px-6 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 w-fit mt-2">
                           Parolni Yangilash
                        </Button>
                     </div>

                     <hr className="border-gray-100 dark:border-white/5" />

                     <div className="space-y-4">
                        <div className="p-5 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-emerald-50/50 dark:bg-emerald-500/5">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center p-2.5">
                                 <Shield className="w-full h-full text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <div>
                                 <h4 className="text-[15px] font-bold text-[#141724] dark:text-white">Ikki Bosqichli Tasdiqlash (2FA)</h4>
                                 <p className="text-[12px] text-gray-500 font-medium mt-0.5">Hisobingizga kirishda qoshimcha SMS kod so'raladi</p>
                              </div>
                           </div>
                           <Button className="bg-emerald-600 hover:bg-emerald-700 text-white ml-auto h-10 rounded-xl font-bold">Faollashtirish</Button>
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === "appearance" && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
                     <div>
                        <h2 className="text-[18px] font-black text-[#141724] dark:text-white mb-1">Tashqi ko'rinish</h2>
                        <p className="text-[13px] font-medium text-gray-500">Platformaning vizual mavzusi va aksent ranglarini moslashtirish.</p>
                     </div>

                     <div className="space-y-4">
                    <label className="text-[12px] font-extrabold text-[#141724] dark:text-gray-300 uppercase tracking-widest">Asosiy Mavzu (Theme)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                       
                       {/* Light Theme Option */}
                       <div className="cursor-pointer group" onClick={() => handleThemeChange('light')}>
                          <div className={`border-2 rounded-2xl p-2 bg-[#f4f7f6] dark:bg-[#0b0e14]/50 transition-colors relative ${currentSettings.theme === 'light' ? 'border-[#3e4cf1] shadow-[0_0_15px_rgba(62,76,241,0.15)]' : 'border-transparent hover:border-[#3e4cf1]/50'}`}>
                             {currentSettings.theme === 'light' && (
                               <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-[#3e4cf1] text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-[#141724] z-10">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                               </div>
                             )}
                             <div className="h-24 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col p-2 space-y-2">
                                <div className="flex items-center gap-2">
                                   <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                   <div className="h-2 w-10 bg-gray-200 rounded-full"></div>
                                </div>
                                <div className="flex gap-2 flex-1">
                                   <div className="w-1/3 bg-gray-50 rounded-lg h-full"></div>
                                   <div className="flex-1 bg-gray-100 rounded-lg h-full"></div>
                                </div>
                             </div>
                          </div>
                          <p className={`text-center text-[13px] mt-3 transition-colors ${currentSettings.theme === 'light' ? 'font-black text-[#141724] dark:text-white' : 'font-bold text-gray-500 group-hover:text-[#3e4cf1]'}`}>Yorug' (Light)</p>
                       </div>

                       {/* Dark Theme Option */}
                       <div className="cursor-pointer group" onClick={() => handleThemeChange('dark')}>
                          <div className={`border-2 rounded-2xl p-2 bg-[#f4f7f6] dark:bg-[#0b0e14]/50 relative transition-colors ${currentSettings.theme === 'dark' ? 'border-[#3e4cf1] shadow-[0_0_15px_rgba(62,76,241,0.15)]' : 'border-transparent hover:border-[#3e4cf1]/50'}`}>
                             {currentSettings.theme === 'dark' && (
                               <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-[#3e4cf1] text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-[#141724] z-10">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                               </div>
                             )}
                             <div className="h-24 bg-[#0b0e14] rounded-xl shadow-sm border border-gray-800 flex flex-col p-2 space-y-2">
                                <div className="flex items-center gap-2">
                                   <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                   <div className="h-2 w-10 bg-gray-700 rounded-full"></div>
                                </div>
                                <div className="flex gap-2 flex-1">
                                   <div className="w-1/3 bg-[#141724] rounded-lg h-full"></div>
                                   <div className="flex-1 bg-gray-800 rounded-lg h-full"></div>
                                </div>
                             </div>
                          </div>
                          <p className={`text-center text-[13px] mt-3 transition-colors ${currentSettings.theme === 'dark' ? 'font-black text-[#141724] dark:text-white' : 'font-bold text-gray-500 group-hover:text-[#3e4cf1]'}`}>Tungi (Dark)</p>
                       </div>

                       {/* System Theme Option */}
                       <div className="cursor-pointer group" onClick={() => handleThemeChange('system')}>
                          <div className={`border-2 rounded-2xl p-2 bg-[#f4f7f6] dark:bg-[#0b0e14]/50 transition-colors relative ${currentSettings.theme === 'system' ? 'border-[#3e4cf1] shadow-[0_0_15px_rgba(62,76,241,0.15)]' : 'border-transparent hover:border-[#3e4cf1]/50'}`}>
                             {currentSettings.theme === 'system' && (
                               <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-[#3e4cf1] text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-[#141724] z-10">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                               </div>
                             )}
                             <div className="h-24 flex rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                                <div className="w-1/2 bg-white flex flex-col p-2 space-y-2 border-r border-gray-100">
                                   <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                   </div>
                                   <div className="flex gap-1 flex-1">
                                      <div className="w-full bg-gray-100 rounded-lg h-full"></div>
                                   </div>
                                </div>
                                <div className="w-1/2 bg-[#0b0e14] flex flex-col p-2 space-y-2">
                                   <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                   </div>
                                   <div className="flex gap-1 flex-1">
                                      <div className="w-full bg-gray-800 rounded-lg h-full"></div>
                                   </div>
                                </div>
                             </div>
                          </div>
                          <p className={`text-center text-[13px] mt-3 transition-colors ${currentSettings.theme === 'system' ? 'font-black text-[#141724] dark:text-white' : 'font-bold text-gray-500 group-hover:text-[#3e4cf1]'}`}>Tizim (Auto)</p>
                       </div>

                    </div>
                 </div>

                 <div className="space-y-4 pt-4">
                    <label className="text-[12px] font-extrabold text-[#141724] dark:text-gray-300 uppercase tracking-widest">Aksent Rangi</label>
                    <div className="flex items-center gap-4">
                       <button onClick={() => handleAccentChange('blue')} className={`w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center border-2 border-white dark:border-[#141724] transition-all ${currentSettings.accent === 'blue' ? 'shadow-[0_0_15px_rgba(62,76,241,0.6)] scale-110' : 'opacity-70 hover:opacity-100'}`}>
                          {currentSettings.accent === 'blue' && <CheckCircle2 className="w-4 h-4 text-white" />}
                       </button>
                       <button onClick={() => handleAccentChange('emerald')} className={`w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center border-2 border-white dark:border-[#141724] transition-all ${currentSettings.accent === 'emerald' ? 'shadow-[0_0_15px_rgba(16,185,129,0.6)] scale-110' : 'opacity-70 hover:opacity-100'}`}>
                          {currentSettings.accent === 'emerald' && <CheckCircle2 className="w-4 h-4 text-white" />}
                       </button>
                       <button onClick={() => handleAccentChange('rose')} className={`w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center border-2 border-white dark:border-[#141724] transition-all ${currentSettings.accent === 'rose' ? 'shadow-[0_0_15px_rgba(244,63,94,0.6)] scale-110' : 'opacity-70 hover:opacity-100'}`}>
                          {currentSettings.accent === 'rose' && <CheckCircle2 className="w-4 h-4 text-white" />}
                       </button>
                       <button onClick={() => handleAccentChange('amber')} className={`w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center border-2 border-white dark:border-[#141724] transition-all ${currentSettings.accent === 'amber' ? 'shadow-[0_0_15px_rgba(245,158,11,0.6)] scale-110' : 'opacity-70 hover:opacity-100'}`}>
                          {currentSettings.accent === 'amber' && <CheckCircle2 className="w-4 h-4 text-white" />}
                       </button>
                       <button onClick={() => handleAccentChange('purple')} className={`w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-400 flex items-center justify-center border-2 border-white dark:border-[#141724] transition-all ${currentSettings.accent === 'purple' ? 'shadow-[0_0_15px_rgba(168,85,247,0.6)] scale-110' : 'opacity-70 hover:opacity-100'}`}>
                          {currentSettings.accent === 'purple' && <CheckCircle2 className="w-4 h-4 text-white" />}
                       </button>
                    </div>
                 </div>
                  </div>
               )}

               {activeTab !== "general" && activeTab !== "api" && activeTab !== "notifications" && activeTab !== "security" && activeTab !== "appearance" && (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-300">
                     <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                        {tabs.find(t => t.id === activeTab)?.icon({ className: "w-8 h-8 text-gray-300" })}
                     </div>
                     <h3 className="text-lg font-black text-[#141724] dark:text-white mb-2">Bu bo'lim tayyorlanmoqda</h3>
                     <p className="text-sm text-gray-500 max-w-sm">"{tabs.find(t => t.id === activeTab)?.name}" sozlamalari keyingi yangilanishlarda to'liq faollashadi.</p>
                  </div>
               )}

            </Card>
         </div>
      </div>
    </div>
  );
}

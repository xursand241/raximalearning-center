import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { profileService } from "@/services/profileService";
import type { Profile } from "@/services/profileService";
import { financeService } from "@/services/financeService";
import { attendanceService } from "@/services/attendanceService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CreditCard, Clock, CheckCircle, ChevronRight, MessageSquare, Award } from "lucide-react";

export default function ParentDashboard() {
  const { user } = useAuthStore();
  const [children, setChildren] = useState<Profile[]>([]);
  const [selectedChild, setSelectedChild] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        // In a real app, we'd fetch children linked to this parent parent_id
        // For now, we'll mock the link but use the profileService
        // const data = await profileService.getLinkedChildren(user.id);
        
        // Mocking the result of a linked query
        const mockChildren: Profile[] = [
          { id: 'child-1', first_name: 'Timur', last_name: 'Azizov', role: 'student', is_active: true, phone: null, created_at: '' },
          { id: 'child-2', first_name: 'Jasur', last_name: 'Rakhimov', role: 'student', is_active: true, phone: null, created_at: '' }
        ];
        
        setChildren(mockChildren);
        setSelectedChild(mockChildren[0]);
      } catch (err) {
        console.error("Error loading parent dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [user?.id]);

  if (isLoading) return <div className="p-10 text-center">Yuklanmoqda...</div>;

  return (
    <div className="animate-in fade-in duration-500 space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-black text-[#141724] dark:text-white">Ota-ona paneli</h1>
           <p className="text-gray-500 font-medium mt-1">Farzandlaringizning o'qish jarayoni va to'lovlarini kuzatib boring.</p>
        </div>
        
        <div className="flex bg-white dark:bg-[#141724] p-1.5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
           {children.map(child => (
             <button 
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={`px-5 py-2.5 rounded-xl text-[13.5px] font-black transition-all ${selectedChild?.id === child.id ? 'bg-[#3e4cf1] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}
             >
                {child.first_name}
             </button>
           ))}
        </div>
      </div>

      {selectedChild && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-2xl">
                  <CardContent className="p-6">
                     <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4"><Clock className="w-5 h-5"/></div>
                     <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Davomat</p>
                     <p className="text-2xl font-black mt-1">92%</p>
                  </CardContent>
               </Card>
               <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-2xl">
                  <CardContent className="p-6">
                     <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4"><Award className="w-5 h-5"/></div>
                     <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">O'rtacha baho</p>
                     <p className="text-2xl font-black mt-1">4.8</p>
                  </CardContent>
               </Card>
               <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-2xl col-span-2 md:col-span-1">
                  <CardContent className="p-6">
                     <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4"><CreditCard className="w-5 h-5"/></div>
                     <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">To'lov holati</p>
                     <Badge className="mt-2 bg-emerald-500 text-white border-none font-black">TO'LANGAN</Badge>
                  </CardContent>
               </Card>
            </div>

            {/* Recent Lessons */}
            <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-3xl overflow-hidden">
               <CardHeader className="border-b border-gray-50 dark:border-white/5 px-8 py-6">
                  <CardTitle className="text-[18px] font-black">So'nggi darslar & Vazifalar</CardTitle>
               </CardHeader>
               <div className="divide-y divide-gray-50 dark:divide-white/5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-black">
                             {i}
                          </div>
                          <div>
                             <p className="font-black text-[15px]">Lesson #{i}: Advanced Grammar</p>
                             <p className="text-[13px] font-medium text-gray-400">12-aprel, 14:00 • Xona-12</p>
                          </div>
                       </div>
                       <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-600 font-black uppercase text-[10px] tracking-widest px-2.5">Keldi</Badge>
                    </div>
                  ))}
               </div>
            </Card>
          </div>

          <div className="space-y-8">
             {/* Child Profile Card */}
             <Card className="border-none shadow-sm bg-[#141724] text-white rounded-[32px] overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Users className="w-32 h-32"/></div>
                <CardContent className="p-8 relative z-10 text-center">
                   <div className="w-24 h-24 rounded-[32px] bg-white text-[#141724] flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-xl border-4 border-white/20">
                      {selectedChild.first_name[0]}
                   </div>
                   <h2 className="text-2xl font-black">{selectedChild.first_name} {selectedChild.last_name}</h2>
                   <p className="text-indigo-300 font-bold mt-1 uppercase tracking-widest text-[11px]">Enrolled Student</p>
                   
                   <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="bg-white/5 rounded-2xl p-4 text-center">
                         <p className="text-[10px] font-black text-indigo-300 uppercase">Guruhlar</p>
                         <p className="text-xl font-black mt-1">2 ta</p>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 text-center">
                         <p className="text-[10px] font-black text-indigo-300 uppercase">Reyting</p>
                         <p className="text-xl font-black mt-1">#4</p>
                      </div>
                   </div>
                </CardContent>
             </Card>

             {/* Message to Teacher */}
             <Card className="border-none shadow-sm bg-white dark:bg-[#141724] rounded-3xl">
                <CardContent className="p-6">
                   <h3 className="text-[16px] font-black mb-4 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#3e4cf1]"/> Ustozga murojaat
                   </h3>
                   <textarea 
                      placeholder="Savolingizni yozing..." 
                      className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl p-4 text-[14px] min-h-[120px] focus:ring-2 focus:ring-[#3e4cf1] transition-all outline-none"
                   ></textarea>
                   <button className="w-full mt-4 bg-[#3e4cf1] text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all">
                      XABARNI YUBORISH
                   </button>
                </CardContent>
             </Card>
          </div>
        </div>
      )}
    </div>
  );
}

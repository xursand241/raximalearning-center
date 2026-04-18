import { useState } from "react";
import { BookOpen, Plus, FileText, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Assessments() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Unit 5 Reading Task", type: "Homework", group: "IELTS B2", deadline: "Ertaga, 23:59" },
    { id: 2, title: "Mock Exam #1", type: "Exam", group: "Foundation", deadline: "10 May, 15:00" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleSave = () => {
    if(!newTaskTitle) return;
    setTasks([{ id: Date.now(), title: newTaskTitle, type: "Homework", group: "Barchasi", deadline: "Tez kunda" }, ...tasks]);
    setNewTaskTitle("");
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[28px] font-black text-[#141724] dark:text-white">Vazifalar & Testlar</h1>
          <p className="text-gray-500 font-medium text-[15px] mt-1">O'quvchilarga yangi vazifalar va testlar biriktirish</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 px-6 font-bold shadow-lg shadow-indigo-500/20">
          <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} /> Yangi qo'shish
        </Button>
      </div>
      
      <div className="grid gap-5 md:grid-cols-2 pt-4">
        {tasks.map(task => (
           <Card key={task.id} className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none rounded-3xl p-6 bg-white dark:bg-[#141724] group hover:scale-[1.01] transition-transform">
             <div className="flex justify-between items-start mb-5">
                <div className="p-3.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl">
                  {task.type === "Homework" ? <FileText className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                </div>
                <span className="text-[11px] font-bold text-gray-500 bg-gray-50 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-gray-100 dark:border-white/5 uppercase tracking-wide">{task.group}</span>
             </div>
             <h3 className="text-[18px] font-black text-[#141724] dark:text-white mb-3 group-hover:text-indigo-600 transition-colors">{task.title}</h3>
             <div className="flex items-center text-[13px] font-bold text-gray-400">
                <Clock className="w-4 h-4 mr-1.5" /> Muddat: {task.deadline}
             </div>
           </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
           <Card className="w-full max-w-md border-none shadow-2xl bg-white dark:bg-[#141724] rounded-[24px] overflow-hidden p-8 relative scale-in-95 animate-in duration-200">
              <h2 className="text-[20px] font-black mb-6 text-[#141724] dark:text-white">Yangi vazifa yoki test</h2>
              
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                   <label className="text-[13px] font-bold text-gray-500">Mavzu yoki sarlavha</label>
                   <input value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} type="text" placeholder="Masalan: Unit 6 So'zlar yodlash" className="w-full h-12 bg-gray-50 dark:bg-white/5 border-none rounded-xl px-4 dark:text-white font-medium focus:ring-2 ring-indigo-500/20 outline-none transition-all text-sm" />
                </div>
              </div>

              <div className="flex gap-4">
                 <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1 h-12 rounded-xl border-gray-200 dark:border-white/10 font-bold dark:hover:bg-white/5">Bekor qilish</Button>
                 <Button onClick={handleSave} className="flex-1 h-12 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 font-bold">Saqlash</Button>
              </div>
           </Card>
        </div>
      )}
    </div>
  )
}

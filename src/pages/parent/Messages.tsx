import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Search, Send, Paperclip, CheckCheck } from "lucide-react";

export default function ParentMessages() {
  const [contacts] = useState<any[]>([]);
  const [activeContact, setActiveContact] = useState<any>(null);
  
  const [messages, setMessages] = useState<any[]>([]);
  
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'me', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setNewMessage("");
  };

  return (
    <div className="animate-in fade-in duration-500 h-[calc(100vh-160px)] pb-4 flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0">
        <div>
           <h1 className="text-3xl font-black text-[#141724] dark:text-white">Xabarlar</h1>
           <p className="text-gray-500 font-medium mt-1">O'qituvchilar va ma'muriyat bilan aloqa</p>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 gap-6">
         {/* Contacts List */}
         <Card className="w-full max-w-[320px] border-none shadow-sm bg-white dark:bg-[#141724] rounded-[24px] overflow-hidden flex flex-col shrink-0 hidden md:flex">
            <div className="p-6 border-b border-gray-50 dark:border-white/5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                  <input 
                     type="text" 
                     placeholder="Qidirish..." 
                     className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-white/5 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium outline-none"
                  />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
               {contacts.map((contact) => (
                 <div 
                   key={contact.id} 
                   onClick={() => setActiveContact(contact)}
                   className={`px-6 py-4 flex items-center gap-4 cursor-pointer transition-colors ${activeContact.id === contact.id ? 'bg-indigo-50 dark:bg-indigo-500/10 border-l-4 border-indigo-600' : 'hover:bg-gray-50 dark:hover:bg-white/[0.02] border-l-4 border-transparent'}`}
                 >
                    <div className="relative">
                       <div className="w-12 h-12 rounded-[16px] bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 font-black text-lg">
                          {contact.name[0]}
                       </div>
                       {contact.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-[#141724] rounded-full"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-[14px] truncate text-[#141724] dark:text-white">{contact.name}</h4>
                          <span className="text-[10px] font-bold text-gray-400">{contact.time}</span>
                       </div>
                       <p className="text-[12px] font-medium text-gray-500 truncate">{contact.role}</p>
                    </div>
                    {contact.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black">
                         {contact.unread}
                      </div>
                    )}
                 </div>
               ))}
            </div>
         </Card>

         {/* Chat Area */}
         <Card className="flex-1 border-none shadow-sm bg-white dark:bg-[#141724] rounded-[24px] overflow-hidden flex flex-col relative h-full">
            {/* Chat header */}
            <div className="px-8 py-5 border-b border-gray-50 dark:border-white/5 flex items-center justify-between bg-white/95 dark:bg-[#141724]/95 z-20">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[16px] bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg">
                     {activeContact.name[0]}
                  </div>
                  <div>
                    <h3 className="font-black text-[15px] text-[#141724] dark:text-white">{activeContact.name}</h3>
                    <p className="text-[12px] font-medium text-indigo-600 dark:text-indigo-400">{activeContact.online ? 'Hozir onlayn' : 'Oflayn'}</p>
                  </div>
               </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 bg-slate-50 dark:bg-[#0b0e14]/50 z-10">
               <div className="flex justify-center mb-2">
                 <span className="px-3 py-1 bg-gray-200/50 dark:bg-white/10 rounded-full text-[10px] font-black uppercase text-gray-500 tracking-widest">Bugun</span>
               </div>
               
               {messages.map((msg) => (
                 <div key={msg.id} className={`flex max-w-[85%] ${msg.sender === 'me' ? 'self-end' : 'self-start'}`}>
                    <div className={`px-5 py-3 rounded-[20px] relative shadow-sm ${msg.sender === 'me' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white dark:bg-white/10 text-[#141724] dark:text-gray-200 rounded-bl-sm border border-gray-100 dark:border-white/5'}`}>
                       <p className="text-[14px] leading-relaxed">{msg.text}</p>
                       <div className={`flex items-center gap-1 mt-2 justify-end ${msg.sender === 'me' ? 'text-indigo-200' : 'text-gray-400'}`}>
                         <span className="text-[10px] font-bold">{msg.time}</span>
                         {msg.sender === 'me' && <CheckCheck className="w-3.5 h-3.5 ml-0.5"/>}
                       </div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Input area */}
            <div className="p-4 bg-white dark:bg-[#141724] border-t border-gray-50 dark:border-white/5 z-20">
               <div className="flex items-center gap-3">
                  <button className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-colors">
                     <Paperclip className="w-5 h-5"/>
                  </button>
                  <input 
                     type="text" 
                     placeholder="Xabar yozish..." 
                     value={newMessage}
                     onChange={(e) => setNewMessage(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                     className="flex-1 bg-gray-50 dark:bg-white/5 py-3.5 px-5 rounded-[16px] text-[14px] font-medium border-none focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <button 
                     onClick={handleSend}
                     className="w-12 h-12 bg-indigo-600 text-white flex items-center justify-center rounded-[16px] hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 active:scale-95"
                  >
                     <Send className="w-5 h-5 ml-1"/>
                  </button>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
}

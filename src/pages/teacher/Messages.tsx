import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Messages() {
  const [message, setMessage] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  const [activeChatId, setActiveChatId] = useState(1);
  
  const [chatData, setChatData] = useState<any>({});

  const activeChat = chatData[activeChatId as keyof typeof chatData];

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (activeChat) {
      scrollToBottom();
    }
  }, [activeChat?.messages]);

  const handleSend = () => {
    if(!message.trim()) return;
    
    setChatData(prev => ({
      ...prev,
      [activeChatId]: {
        ...prev[activeChatId as keyof typeof chatData],
        messages: [
          ...prev[activeChatId as keyof typeof chatData].messages,
          { id: Date.now(), sender: "Siz", text: message, time: "Hozir" }
        ]
      }
    }));
    
    setMessage("");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[28px] font-black text-[#141724] dark:text-white">Xabarlar</h1>
          <p className="text-gray-500 font-medium text-[15px] mt-1">Ota-onalar va rahbariyat bilan to'g'ridan-to'g'ri aloqa</p>
        </div>
      </div>

      <div className="flex gap-6 h-[calc(100vh-200px)] min-h-[500px]">
        {/* Chat List (Sidebar) */}
        <Card className="w-[300px] lg:w-[350px] border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none rounded-[32px] bg-white dark:bg-[#141724] p-4 flex flex-col gap-2 overflow-y-auto hidden md:flex">
          <div className="px-3 pb-2 pt-1 font-bold text-gray-500 text-[12px] uppercase tracking-widest border-b border-gray-50 dark:border-white/5 mb-2 shrink-0">So'nggi suhbatlar</div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {Object.values(chatData).map(chat => {
               const lastMsg = chat.messages[chat.messages.length - 1];
               const isActive = activeChatId === chat.id;
               return (
                 <div 
                   key={chat.id} 
                   onClick={() => setActiveChatId(chat.id)}
                   className={`p-4 rounded-2xl cursor-pointer transition-all mb-2 ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/10' : 'bg-transparent hover:bg-gray-50 dark:hover:bg-white/5'}`}
                 >
                    <div className="flex justify-between items-start mb-1">
                       <h4 className={`font-bold text-[14px] ${isActive ? 'text-indigo-700 dark:text-indigo-300' : 'text-[#141724] dark:text-white'}`}>{chat.name}</h4>
                       <span className={`text-[10px] font-bold rounded px-1.5 py-0.5 ${isActive ? 'text-gray-400 bg-white dark:bg-[#0b0e14]' : 'text-gray-400 bg-gray-50 dark:bg-white/5'}`}>{lastMsg?.time.split(' ')[0]}</span>
                    </div>
                    <p className={`text-[12px] font-medium truncate ${isActive ? 'text-indigo-500/80' : 'text-gray-500'}`}>{lastMsg?.sender === 'Siz' ? 'Siz: ' : ''}{lastMsg?.text}</p>
                 </div>
               )
            })}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none rounded-[32px] bg-white dark:bg-[#141724] flex flex-col overflow-hidden relative">
           <div className="px-8 py-5 border-b border-gray-50 dark:border-white/5 flex items-center gap-4 bg-white/50 dark:bg-transparent backdrop-blur z-10">
              <div className={`w-12 h-12 rounded-full border-2 p-0.5 flex items-center justify-center relative overflow-hidden ${activeChat.online ? 'border-emerald-500' : 'border-gray-200 dark:border-gray-600'}`}>
                 <div className={`w-full h-full rounded-full flex items-center justify-center text-white font-black text-lg ${activeChat.online ? 'bg-gradient-to-tr from-emerald-400 to-teal-500' : 'bg-gradient-to-tr from-gray-400 to-slate-500'}`}>{activeChat.name[0]}</div>
              </div>
              <div>
                 <h3 className="font-black text-[17px] text-[#141724] dark:text-white">{activeChat.name}</h3>
                 <p className={`text-[12px] font-bold ${activeChat.online ? 'text-emerald-500' : 'text-gray-400'}`}>{activeChat.online ? 'Online' : 'Tarmoqda emas'}</p>
              </div>
           </div>

           <div className="flex-1 p-8 overflow-y-auto space-y-6 scrollbar-thin dark:scrollbar-thumb-gray-800 bg-gray-50/30 dark:bg-transparent">
              <div className="text-center my-4"><span className="bg-gray-100 dark:bg-[#0b0e14] px-3 py-1 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">Suhbat tarixi</span></div>
              
              {activeChat.messages.map(chat => (
                <div key={chat.id} className={`flex flex-col ${chat.sender === 'Siz' ? 'items-end' : 'items-start'}`}>
                   <div className={`p-4 rounded-[20px] max-w-[75%] shadow-sm ${chat.sender === 'Siz' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-gray-100 dark:border-white/5 dark:bg-[#0b0e14] text-[#141724] dark:text-white rounded-tl-sm'}`}>
                      <p className="text-[14px] font-medium leading-relaxed">{chat.text}</p>
                   </div>
                   <div className="flex items-center gap-1.5 mt-1.5 px-1">
                      <span className="text-[11px] font-bold text-gray-400">{chat.time}</span>
                      {chat.sender === 'Siz' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />}
                   </div>
                </div>
              ))}
              <div ref={endOfMessagesRef} />
           </div>

           <div className="p-4 bg-white dark:bg-[#141724] border-t border-gray-50 dark:border-white/5 pb-6">
              <div className="flex gap-3 bg-gray-50 dark:bg-[#0b0e14] p-2 rounded-2xl border border-transparent focus-within:border-indigo-500/30 transition-all shadow-inner">
                 <input 
                    type="text" 
                    placeholder="Xabar yozing..." 
                    className="flex-1 bg-transparent border-none outline-none font-medium text-[#141724] dark:text-white text-[14px] px-4"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                 />
                 <button onClick={handleSend} className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 active:scale-95 transition-all shrink-0">
                    <Send className="w-5 h-5 ml-0.5" strokeWidth={2.5} />
                 </button>
              </div>
           </div>
        </Card>
      </div>
    </div>
  )
}

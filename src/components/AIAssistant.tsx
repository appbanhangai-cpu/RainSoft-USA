import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  HelpCircle, 
  ArrowUpRight, 
  Bot, 
  User, 
  CircleDot, 
  AlertTriangle 
} from 'lucide-react';
import { ChatMessage } from '../types';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Xin chào anh/chị! Tôi là **Trợ lý Đối Tác AI** chính thức của SHAHA Việt Nam. \n\nTôi rất hào hứng được giải đáp tất cả các băn khoăn của anh/chị về chương trình hợp tác phát triển hệ thống lọc tổng **RainSoft USA** (nhập khẩu từ Mỹ từ năm 1953). Anh/chị có thể hỏi tôi về:\n* **Biên lợi nhuận & Lợi ích thương mại**\n* **Cam kết bảo hành TRỌN ĐỜI đặc chủng**\n* **Các giai đoạn đào tạo, Test Kit thực chiến**\n* **Chính sách hỗ trợ showroom và lắp đặt.**\n\nAnh/chị đang hoạt động ở lĩnh vực nào để tôi tư vấn tốt nhất ạ?',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const FAQ_SUGGESTIONS = [
    { text: 'Biên lợi nhuận trung bình bao nhiêu?', label: 'Biên Lợi Nhuận' },
    { text: 'Chính sách bảo hành TRỌN ĐỜI chi tiết ra sao?', label: 'Bảo Hành Trọn Đời' },
    { text: 'SHAHA hỗ trợ vali thử nước Test Kit thế nào?', label: 'Vali Test Nước' },
    { text: 'Quy trình và hỗ trợ showroom 3D ra sao?', label: 'Hỗ trợ Showroom' }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = [...messages, userMsg].map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Lỗi hệ thống AI.');
      }

      const data = await response.json();
      const modelMsg: ChatMessage = {
        id: 'msg_' + (Date.now() + 1),
        role: 'model',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err: any) {
      setError(err.message || 'Hệ thống AI đang quá tải. Đăng ký thông tin để chúng tôi liên hệ trực tiếp nhé!');
      setMessages(prev => [
        ...prev,
        {
          id: 'error_' + Date.now(),
          role: 'model',
          text: 'Có một lỗi kết nối nhỏ. Đừng lo lắng, anh/chị có thể điền thông tin vào form đăng ký hợp tác ở phần dưới trang để nhận đầy đủ Brochure và tài liệu chính sách bản cứng qua Zalo nhé!',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Safe and clean React-based markdown-like formatter for luxury lines and lists
  const formatText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      // Bold patterns: **text**
      let parts = [];
      let currentIdx = 0;
      const boldRegex = /\*\*(.*?)\*\*/g;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > currentIdx) {
          parts.push(line.substring(currentIdx, match.index));
        }
        parts.push(
          <strong key={`bold-${idx}-${match.index}`} className="font-extrabold text-blue-300">
            {match[1]}
          </strong>
        );
        currentIdx = boldRegex.lastIndex;
      }
      if (currentIdx < line.length) {
        parts.push(line.substring(currentIdx));
      }

      const rawLine = parts.length > 0 ? parts : line;

      // Bullet points
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const cleanedParts = typeof rawLine === 'string' 
          ? rawLine.replace(/^[\*\-]\s+/, '') 
          : parts; // bold already formatted
          
        return (
          <li key={idx} className="ml-4 list-disc text-slate-300 pl-1 text-xs sm:text-sm my-0.5 leading-relaxed">
            {cleanedParts}
          </li>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="text-xs sm:text-sm text-slate-250 leading-relaxed font-sans my-1">
          {rawLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* Absolute Bottom Right Floating Launcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500 text-white flex items-center justify-center shadow-2xl cursor-pointer select-none glow-blue-strong relative border border-white/10"
          id="ai-chatbox-trigger"
        >
          {isOpen ? (
            <X className="w-6 h-6 animate-spin-slow" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6" />
              {/* Pulsing indicator */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0f172a] animate-pulse" />
            </>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Container Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[340px] sm:w-[400px] h-[550px] max-h-[80vh] rounded-2xl glass-effect z-50 overflow-hidden shadow-2xl flex flex-col border border-white/15 glow-blue"
            id="ai-assistant-window"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center relative">
                  <Bot className="w-5.5 h-5.5 text-blue-400 animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0f172a]" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-semibold text-white tracking-wide flex items-center gap-1.5">
                    Trợ lý Đối Tác AI 
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-bounce" />
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400 font-medium">Bản quyền SHAHA VN • Đang hoạt động</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all cursor-pointer"
                id="ai-assistant-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/40">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border text-[10px] ${
                    m.role === 'user' 
                      ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-300' 
                      : 'bg-blue-600/20 border-blue-500/30 text-blue-300'
                  }`}>
                    {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`rounded-2xl p-3.5 text-sm ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-sm font-medium pr-4' 
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-sm shadow-sm'
                  }`}>
                    <div className="space-y-1">
                      {formatText(m.text)}
                    </div>
                    <span className="block text-[9px] text-slate-500 text-right mt-1.5 font-mono">{m.timestamp}</span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5 max-w-[80%]">
                  <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 animate-bounce" />
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl rounded-tl-sm p-4 w-full">
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium text-xs">
                      <CircleDot className="w-3.5 h-3.5 text-blue-400 animate-ping" />
                      Trợ lý SHAHA đang ghi câu trả lời...
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-2 text-xs text-red-400 font-medium items-start">
                  <AlertTriangle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggestions if empty or initial state */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-900/60 flex flex-col gap-2 shrink-0">
              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> Gợi ý câu hỏi thường gặp:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-18 overflow-y-auto">
                {FAQ_SUGGESTIONS.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(faq.text)}
                    className="flex items-center gap-0.5 px-2.5 py-1 text-[11px] font-medium bg-slate-900 border border-slate-800 text-slate-300 rounded-full hover:border-blue-500/50 hover:text-white hover:bg-slate-800/40 transition-all text-left cursor-pointer"
                    id={`faq-suggestion-${i}`}
                  >
                    {faq.label}
                    <ArrowUpRight className="w-2.5 h-2.5 text-slate-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>

            {/* Form Input area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-slate-950 border-t border-slate-800/80 flex gap-2 shrink-0"
              id="ai-assistant-input-form"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi trợ lý: Ví dụ hoa hồng, hỗ trợ kỹ thuật..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 transition-all"
                disabled={loading}
                id="ai-assistant-input-field"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition-all cursor-pointer glow-blue"
                id="ai-assistant-send-btn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

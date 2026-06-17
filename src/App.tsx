import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  ShieldCheck, 
  Droplets, 
  BadgePercent, 
  Users, 
  ChevronRight, 
  ArrowRight,
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  PhoneCall, 
  Lock, 
  Database, 
  ShieldAlert, 
  Sparkles,
  Play,
  FileText,
  BadgeDollarSign,
  Briefcase,
  Layers,
  CheckCircle,
  Clock,
  Store,
  ChevronDown,
  Handshake,
  Rocket,
  FileEdit,
  MessageSquare,
  Diamond,
  Download,
  Globe
} from 'lucide-react';

import { PARTNER_GROUPS, SUPPORT_PROGRAMS, DISCOVERY_STAGES, Lead } from './types';
import LeadForm from './components/LeadForm';
import AIAssistant from './components/AIAssistant';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState('showroom');
  const [activeStage, setActiveStage] = useState(1);
  const [selectedProductTab, setSelectedProductTab] = useState<'image1' | 'image2'>('image1');
  const [showAdmin, setShowAdmin] = useState(false);
  const [leadsSyncedCounter, setLeadsSyncedCounter] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [latestRegistrantName, setLatestRegistrantName] = useState('');

  // Floating ambient bubbles/particles to mimic pristine water purification
  const [bubbles, setBubbles] = useState<{ id: number; left: string; size: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    // Generate randomized water bubbles for elegant ambient background
    const initialBubbles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 6 + 4}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 12 + 8}s`
    }));
    setBubbles(initialBubbles);
  }, []);

  const handleLeadSuccess = (lead: Lead) => {
    setLatestRegistrantName(lead.fullName);
    setLeadsSyncedCounter(prev => prev + 1);
    
    // Show a nice transient toast notification
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 6000);
  };

  const currentGroup = PARTNER_GROUPS.find(g => g.id === activeTab) || PARTNER_GROUPS[0];
  const currentStage = DISCOVERY_STAGES.find(s => s.phase === activeStage) || DISCOVERY_STAGES[0];

  return (
    <div className="min-h-screen bg-[#020617] text-[#DDEBFF] font-sans relative overflow-x-hidden selection:bg-[#fff3b0]/20 selection:text-[#ffd700]">
      
      {/* Floating Pristine Water Bubble Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[125px]" />
        
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className="absolute bottom-0 bg-[#00D4FF]/15 rounded-full animate-bubble"
            style={{
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
              animationDelay: bubble.delay,
              animationDuration: bubble.duration,
              animationIterationCount: 'infinite'
            }}
          />
        ))}
      </div>

      {/* Global CSS animation injected inside React for the custom bubble flow & diagonal light beams */}
      <style>{`
        @keyframes floating-bubble {
          0% { transform: translateY(100vh) scale(0.8); opacity: 0; }
          20% { opacity: 0.7; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-20vh) scale(1.2); opacity: 0; }
        }
        .animate-bubble {
          animation-name: floating-bubble;
          animation-timing-function: linear;
        }
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.02); }
        }
        .animate-pulse-subtle {
          animation: subtle-pulse 6s infinite ease-in-out;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>

      {/* FIXED GLASS HEADER WITH GOLD ACCENTS */}
      <header className="sticky top-0 z-40 bg-[#020617]/90 backdrop-blur-xl border-b border-[#d4af37]/20 py-4 shadow-[0_4px_30px_rgba(3,20,45,0.4)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand with Gold Shield theme */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd700] to-[#b8860b] flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.3)] text-[#020617] font-display font-black text-xl select-none">
              R
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-display font-extrabold text-base tracking-wider text-transparent bg-gradient-to-r from-[#fff3b0] via-[#ffd700] to-[#b8860b] bg-clip-text">SHAHA</span>
                <span className="text-[9px] font-bold font-mono text-[#00D4FF] border border-[#00D4FF]/30 px-1 rounded bg-[#00D4FF]/5">VIỆT NAM</span>
              </div>
              <span className="text-[9px] text-[#DDEBFF]/75 tracking-wider font-semibold block uppercase">Cổng Đối Tác RainSoft USA từ 1953</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-wider font-bold text-[#DDEBFF]/80">
            <a href="#why" className="hover:text-[#ffd700] transition-colors">Vì sao hợp tác?</a>
            <a href="#segments" className="hover:text-[#ffd700] transition-colors">Đối tác phù hợp</a>
            <a href="#supports" className="hover:text-[#ffd700] transition-colors">SHAHA hỗ trợ</a>
            <a href="#roadmap" className="hover:text-[#ffd700] transition-colors">Lộ trình phát triển</a>
            <a href="#market" className="hover:text-[#ffd700] transition-colors">Sức hút thị trường</a>
            <a href="#onboarding" className="hover:text-[#ffd700] transition-colors">Đăng ký</a>
          </nav>

          {/* Top CTA with luxury metallic shine */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('onboarding');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#fff3b0] via-[#ffd700] to-[#b8860b] hover:from-[#ffffff] hover:to-[#ffd700] text-[#020617] hover:shadow-[0_0_20px_rgba(255,215,0,0.45)] cursor-pointer transition-all border border-[#ffd700]/30 btn-shine-effect"
              id="header-cta-btn"
            >
              Đại lý RainSoft
            </button>
          </div>
        </div>
      </header>

      {/* FLOAT TRANSIENT NOTIFICATION TOAST */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
            id="toast-notification"
          >
            <div className="p-4 rounded-2xl border-gold-glow border border-emerald-500/40 flex items-start gap-3.5 bg-[#03142d]/95 text-white shadow-2xl">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <CheckCircle2 className="w-5 h-5 animate-bounce" />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase tracking-wider">Hợp Tác Đối Tác Ghi Nhận</span>
                <p className="text-sm font-semibold text-[#ffd700]">Chào đón: {latestRegistrantName}!</p>
                <p className="text-xs text-[#DDEBFF]/80">Một chuyên viên SHAHA Việt Nam đã được kết nối để liên hệ trực tiếp cho bạn qua cuộc gọi.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO - BANNER ĐẦU TRANG PHONG CÁCH QUẦN THỂ SIÊU LUXURY HOA KỲ */}
      <section className="relative pt-4 pb-6 sm:pt-6 sm:pb-8 lg:pt-8 lg:pb-10 overflow-hidden z-10" id="hero">
        
        {/* Deep starry space and dynamic water ambient backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#01091a] via-[#02132b] to-[#01091a] -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,212,255,0.12),transparent_45%)] -z-10" />
        <div className="absolute -top-[10%] -left-[5%] w-[50%] h-[100%] bg-gradient-to-br from-transparent via-[#ffd700]/3 to-transparent rotate-12 pointer-events-none" />
        
        {/* Soft center-right gold & blue planetary light glow */}
        <div className="absolute top-[40%] right-[10%] w-[550px] h-[550px] bg-gradient-to-tr from-[#00D4FF]/10 to-[#ffd700]/5 rounded-full blur-[140px] pointer-events-none animate-pulse-subtle" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zoom: 0.8 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (7 of 12) - Majestic Texts and Grid Badges */}
            <div className="lg:col-span-7 text-left space-y-5 lg:space-y-6">
              
              {/* Premium Golden Badge (Matched strictly with Image 1 border style) */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#03142d]/90 border border-[#ffd700]/45 text-amber-300 text-[9px] sm:text-xs font-mono font-black tracking-[0.08em] uppercase shadow-[0_0_15px_rgba(255,215,0,0.12)]">
                <span className="text-[#ffd700] text-sm animate-pulse">★</span>
                <span>RainSoft USA Since 1953 • Chuẩn Mỹ Hoàn Toàn</span>
              </div>

              {/* High-End Metallic Heading with Laser Gold and Vivid Cyan */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-4xl lg:text-[3.25rem] font-display font-black tracking-tight leading-[1.1] uppercase">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#fff3b0] to-[#b8860b] drop-shadow-[0_2px_8px_rgba(255,215,0,0.3)] block">
                    Trở thành đối tác
                  </span>
                  <span className="text-white block mt-0.5 tracking-tight">
                    phát triển RainSoft
                  </span>
                </h1>
                <span className="text-[#00D4FF] text-lg sm:text-2xl lg:text-[1.65rem] tracking-[0.2em] font-mono font-black uppercase block pt-1 drop-shadow-[0_0_10px_rgba(0,212,255,0.35)]">
                  tại việt nam
                </span>
              </div>

              {/* Descriptive context matching precisely */}
              <p className="text-[11px] sm:text-xs text-[#DDEBFF]/90 leading-relaxed max-w-xl font-normal font-sans">
                Cùng <strong className="text-white font-extrabold border-b border-[#00D4FF]/45 pb-0.5">SHAHA Việt Nam</strong> xây dựng hệ sinh thái lọc tổng cao cấp toàn cầu. RainSoft USA từ 1953 – thương hiệu lọc tổng xa xỉ hàng đầu thế giới, định vị cho nhóm khách hàng biệt thự, villa, penthouse, căn hộ duplex sang trọng, và các gia đình sở hữu cuộc sống thượng đỉnh có tiêu chuẩn sinh hoạt cao nhất.
              </p>

              {/* 4 Custom Feature badging cards arranged exactly like Image 1 2x2 grid with high visual rhythm */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-xl">
                
                {/* Badge 1 */}
                <div className="p-2 xs:p-3 sm:p-3.5 rounded-lg xs:rounded-xl bg-[#03142d]/80 border border-[#ffd700]/30 hover:border-[#ffd700] hover:bg-[#071F42] hover:shadow-[0_0_15px_rgba(255,215,0,0.12)] duration-300 flex items-center gap-2 xs:gap-3 group">
                  <div className="w-7 h-7 xs:w-9 xs:h-9 rounded-full bg-gradient-to-br from-[#ffd700] to-[#b8860b] flex items-center justify-center text-slate-950 shadow-[0_2px_8px_rgba(255,215,0,0.25)] shrink-0 transition-transform group-hover:scale-110 animate-pulse-subtle">
                    <ShieldCheck className="w-3.5 h-3.5 xs:w-4.5 xs:h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[8px] xs:text-[10px] font-sans font-black text-white tracking-wider sm:tracking-widest uppercase">HIỆU NĂNG XỬ LÝ</h4>
                    <p className="text-[7.5px] xs:text-[9px] text-[#00D4FF] font-mono tracking-wider font-bold mt-0.5">SIÊU BỨT PHÁ</p>
                  </div>
                </div>

                {/* Badge 2 */}
                <div className="p-2 xs:p-3 sm:p-3.5 rounded-lg xs:rounded-xl bg-[#03142d]/80 border border-[#ffd700]/30 hover:border-[#ffd700] hover:bg-[#071F42] hover:shadow-[0_0_15px_rgba(255,215,0,0.12)] duration-300 flex items-center gap-2 xs:gap-3 group">
                  <div className="w-7 h-7 xs:w-9 xs:h-9 rounded-full bg-gradient-to-br from-[#ffd700] to-[#b8860b] flex items-center justify-center text-slate-950 shadow-[0_2px_8px_rgba(255,215,0,0.25)] shrink-0 transition-transform group-hover:scale-110 animate-pulse-subtle">
                    <Award className="w-3.5 h-3.5 xs:w-4.5 xs:h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[8px] xs:text-[10px] font-sans font-black text-white tracking-wider sm:tracking-widest uppercase">BẢO HÀNH TRỌN ĐỜI</h4>
                    <p className="text-[7.5px] xs:text-[9px] text-[#ffd700] font-mono tracking-wider font-bold mt-0.5">TỪ HOA KỲ</p>
                  </div>
                </div>

                {/* Badge 3 */}
                <div className="p-2 xs:p-3 sm:p-3.5 rounded-lg xs:rounded-xl bg-[#03142d]/80 border border-[#ffd700]/30 hover:border-[#ffd700] hover:bg-[#071F42] hover:shadow-[0_0_15px_rgba(255,215,0,0.12)] duration-300 flex items-center gap-2 xs:gap-3 group">
                  <div className="w-7 h-7 xs:w-9 xs:h-9 rounded-full bg-gradient-to-br from-[#ffd700] to-[#b8860b] flex items-center justify-center text-slate-950 shadow-[0_2px_8px_rgba(255,215,0,0.25)] shrink-0 transition-transform group-hover:scale-110 animate-pulse-subtle">
                    <Store className="w-3.5 h-3.5 xs:w-4.5 xs:h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[8px] xs:text-[10px] font-sans font-black text-white tracking-wider sm:tracking-widest uppercase">HỖ TRỢ SHOWROOM</h4>
                    <p className="text-[7.5px] xs:text-[9px] text-[#00D4FF] font-mono tracking-wider font-bold mt-0.5">VÀ 3D TỦ MẪU</p>
                  </div>
                </div>

                {/* Badge 4 */}
                <div className="p-2 xs:p-3 sm:p-3.5 rounded-lg xs:rounded-xl bg-[#03142d]/80 border border-[#ffd700]/30 hover:border-[#ffd700] hover:bg-[#071F42] hover:shadow-[0_0_15px_rgba(255,215,0,0.12)] duration-300 flex items-center gap-2 xs:gap-3 group">
                  <div className="w-7 h-7 xs:w-9 xs:h-9 rounded-full bg-gradient-to-br from-[#ffd700] to-[#b8860b] flex items-center justify-center text-slate-950 shadow-[0_2px_8px_rgba(255,215,0,0.25)] shrink-0 transition-transform group-hover:scale-110 animate-pulse-subtle">
                    <Droplets className="w-3.5 h-3.5 xs:w-4.5 xs:h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[8px] xs:text-[10px] font-sans font-black text-white tracking-wider sm:tracking-widest uppercase">ĐÀO TẠO, VÂN MẪU</h4>
                    <p className="text-[7.5px] xs:text-[9px] text-[#ffd700] font-mono tracking-wider font-bold mt-0.5">TEST KIT THỰC TẾ</p>
                  </div>
                </div>

              </div>

              {/* Dual Action CTAs with extreme premium polish and precise text labels */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1.5 max-w-xl w-full">
                <button
                  onClick={() => {
                    const el = document.getElementById('onboarding');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-[#fff3b0] via-[#ffd700] to-[#b8860b] hover:from-white hover:to-[#ffd700] text-slate-950 font-sans font-black text-[10px] sm:text-[11px] uppercase tracking-widest rounded-xl shadow-[0_4px_15px_rgba(255,215,0,0.25)] hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] group cursor-pointer flex items-center justify-center gap-2 border border-[#ffd700]/40 transition-all duration-350"
                  id="hero-register-btn"
                >
                  <span>Đăng ký đối tác</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-1.5 duration-200" />
                </button>
                
                <button
                  onClick={() => {
                    const el = document.getElementById('supports');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3.5 bg-[#020d1c]/90 hover:bg-[#07162b] border-2 border-[#d4af37]/40 hover:border-[#ffd700] text-white hover:text-[#ffd700] font-sans font-black text-[10px] sm:text-[11px] uppercase tracking-widest rounded-xl shadow-[0_0_10px_rgba(3,20,45,0.3)] cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-350"
                  id="hero-docs-btn"
                >
                  <span>Tài liệu hợp tác</span>
                  <Download className="w-3.5 h-3.5 text-[#ffd700]" />
                </button>
              </div>

            </div>

            {/* Right Column (5 of 12) - Transparent Cyber Glass Showcase Sitting beautiful generated photo */}
            <div className="lg:col-span-5 flex items-center justify-center relative mt-6 lg:mt-0 w-full px-2 sm:px-0">
              
              {/* Starry ring aura behind product stage */}
              <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-[#00D4FF]/10 animate-spin-slow pointer-events-none" />
              <div className="absolute w-[90%] h-[90%] rounded-full border-2 border-dashed border-[#ffd700]/5 pointer-events-none" />

              {/* The frame box */}
              <div className="relative w-full max-w-[210px] xs:max-w-[250px] sm:max-w-[320px] md:max-w-sm rounded-[1.25rem] xs:rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-[#03142d]/85 via-[#020d1c]/90 to-[#01091a]/95 border-2 border-[#ffd700]/25 p-2 xs:p-3 sm:p-4.5 shadow-[0_15px_40px_rgba(1,9,26,0.95),0_0_20px_rgba(0,212,255,0.1)] overflow-hidden group">
                
                {/* Floating bubbles elements inside representation */}
                <div className="absolute top-[20%] left-[10%] w-6 h-6 rounded-full bg-[#00D4FF]/10 blur-[1px] animate-bounce" style={{ animationDuration: '6s' }} />
                <div className="absolute bottom-[25%] right-[8%] w-8 h-8 rounded-full bg-[#ffd700]/10 blur-[2px] animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1s' }} />

                {/* Golden Shield Brand Stamp atop the photo frame (matches top-right stamp in Image 1) */}
                <div className="absolute top-2.5 right-2.5 xs:top-4 xs:right-4 z-20 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-gradient-to-b from-[#b8860b] via-[#ffd700] to-[#8b6508] p-[1px] xs:p-[1.5px] rounded-[10px] xs:rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300 pointer-events-none">
                  <div className="w-full h-full bg-slate-950 rounded-[9px] xs:rounded-[14px] p-1 xs:p-2 flex flex-col items-center justify-center text-center">
                    <div className="flex gap-0.5 text-[#ffd700]">
                      <span className="text-[6px] xs:text-[8px]">★</span>
                      <span className="text-[8px] xs:text-[10px] -mt-0.5 xs:-mt-1 font-bold">★</span>
                      <span className="text-[6px] xs:text-[8px]">★</span>
                    </div>
                    <span className="text-[7px] xs:text-[9px] font-display font-black text-white leading-none tracking-wider mt-0.5">RAINSOFT</span>
                    <span className="text-[9px] xs:text-[12px] font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#fff3b0] to-[#b8860b] leading-none tracking-widest mt-0.5 xs:mt-1 block">USA</span>
                    <div className="w-5 xs:w-8 h-[1px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent my-0.5 xs:my-1" />
                    <span className="text-[4px] xs:text-[6px] font-mono text-slate-400 uppercase tracking-widest font-bold">SINCE 1953</span>
                  </div>
                </div>

                {/* Majestic 3D Generated Photo showing systems on podium */}
                <div className="relative w-full aspect-[4/5] rounded-[1rem] xs:rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-slate-800 bg-[#020d1c] shadow-inner">
                  <img
                    src="/src/assets/images/hero_product_pedestal_1781703353546.jpg"
                    alt="Hệ thống lọc mềm tổng RainSoft cao cấp chuẩn Mỹ trên bục hào quang"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle gloss overlay reflection */}
                  <div className="absolute top-0 bottom-0 left-[-150%] w-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] transition-all duration-[1200ms] group-hover:left-[200%]" />
                </div>

                {/* Caption below image representing premium hardware */}
                <div className="pt-2 sm:pt-3 pb-0.5 text-center">
                  <span className="text-[8px] xs:text-[10px] font-mono text-amber-200 tracking-wider xs:tracking-widest font-black uppercase">RainSoft EC4 Softener & Carbon Filter Q2</span>
                  <p className="text-[7.5px] xs:text-[9px] text-[#DDEBFF]/65 mt-0.5 xs:mt-1 font-sans">Vật trưng bày tại Showroom SHAHA Việt Nam</p>
                </div>

              </div>

            </div>

          </div>

          {/* Majestic Trust Badges Bar (Matched strictly with the 5 columns at the bottom of Image 1) */}
          <div className="w-full border-t border-b border-[#d4af37]/35 bg-[#03142d]/75 backdrop-blur-md py-4 px-5 rounded-2xl mt-8 sm:mt-10 lg:mt-12 shadow-[0_0_25px_rgba(255,215,0,0.05)] relative overflow-hidden">
            <div className="absolute bottom-[-10%] left-[20%] w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-3 text-left relative z-10">
              
              {/* Col 1 */}
              <div className="flex items-start gap-3 lg:border-r lg:border-slate-800/80 pr-3">
                <div className="w-10 h-10 rounded-full border border-[#d4af37]/35 flex items-center justify-center bg-slate-900 shadow-[0_0_10px_rgba(255,215,0,0.1)] shrink-0 font-sans text-lg">
                  🇺🇸
                </div>
                <div>
                  <h5 className="text-xs font-display font-black text-white uppercase tracking-wider">Thương hiệu Mỹ</h5>
                  <p className="text-[10px] text-[#DDEBFF]/80 mt-1 leading-snug">Hơn 70 năm kinh nghiệm xử lý nước hàng đầu</p>
                </div>
              </div>

              {/* Col 2 */}
              <div className="flex items-start gap-3 lg:border-r lg:border-slate-800/80 pr-3">
                <div className="w-10 h-10 rounded-full border border-[#d4af37]/35 flex items-center justify-center bg-gradient-to-br from-[#ffd700]/10 to-[#b8860b]/10 text-[#ffd700] shadow-[0_0_10px_rgba(255,215,0,0.1)] shrink-0">
                  <Diamond className="w-5 h-5 text-[#ffd700]" />
                </div>
                <div>
                  <h5 className="text-xs font-display font-black text-white uppercase tracking-wider">Định vị cao cấp</h5>
                  <p className="text-[10px] text-[#DDEBFF]/80 mt-1 leading-snug">Phân khúc biệt thự, villa, penthouse, duplex</p>
                </div>
              </div>

              {/* Col 3 */}
              <div className="flex items-start gap-3 lg:border-r lg:border-slate-800/80 pr-3">
                <div className="w-10 h-10 rounded-full border border-[#d4af37]/35 flex items-center justify-center bg-gradient-to-br from-[#00D4FF]/10 to-indigo-505/10 text-[#00D4FF] shadow-[0_0_10px_rgba(0,212,255,0.1)] shrink-0">
                  <Globe className="w-5 h-5 text-[#00D4FF]" />
                </div>
                <div>
                  <h5 className="text-xs font-display font-black text-white uppercase tracking-wider">Công nghệ mới</h5>
                  <p className="text-[10px] text-[#DDEBFF]/80 mt-1 leading-snug">Hiệu suất vượt trội, tiết kiệm điện, nước, muối</p>
                </div>
              </div>

              {/* Col 4 */}
              <div className="flex items-start gap-3 lg:border-r lg:border-slate-800/80 pr-3">
                <div className="w-10 h-10 rounded-full border border-[#d4af37]/35 flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-[#ffd700]/10 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.1)] shrink-0">
                  <Handshake className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h5 className="text-xs font-display font-black text-white uppercase tracking-wider">Đồng hành bền</h5>
                  <p className="text-[10px] text-[#DDEBFF]/80 mt-1 leading-snug">Đối tác đào tạo, tư vấn kỹ thuật, setup showroom</p>
                </div>
              </div>

              {/* Col 5 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full border border-[#d4af37]/35 flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-[#ffd700]/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)] shrink-0">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h5 className="text-xs font-display font-black text-white uppercase tracking-wider">Lợi nhuận cao</h5>
                  <p className="text-[10px] text-[#DDEBFF]/80 mt-1 leading-snug">Chiết khấu cực sâu, gặt hái phí thay lõi dồi dào</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: VÌ SAO NÊN HỢP TÁC RAINSOFT? - 4 CORE VALUE WITH HIGH-END STYLE */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#010919] border-t border-[#d4af37]/15 z-10 relative overflow-hidden" id="why">
        {/* Ambient starry backdrop grid and radiant outer space neon halos */}
        <div className="absolute inset-0 bg-[#020713]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08),transparent_70%)] pointer-events-none" />
        
        {/* Floating Water Splashes & Transparent Water Droplets at left and right margins matching the image */}
        <div className="absolute left-0 top-[10%] w-48 sm:w-80 h-[500px] pointer-events-none opacity-40 sm:opacity-75 select-none z-10">
          <svg viewBox="0 0 200 500" className="w-full h-full text-cyan-400" fill="currentColor">
            {/* Liquid trails/sprays */}
            <path d="M0,80 C60,110 90,60 110,130 C130,200 40,230 80,310 C100,350 20,400 0,450 Z" className="opacity-15 text-cyan-500" />
            <path d="M0,120 C45,140 75,90 90,165 C105,235 25,265 55,340 C70,375 10,410 0,460 Z" className="opacity-25 text-cyan-400" />
            {/* Flying physical water spheres */}
            <circle cx="120" cy="100" r="10" className="opacity-40 text-cyan-300 animate-bounce" style={{ animationDuration: '4s' }} />
            <circle cx="145" cy="180" r="7" className="opacity-45 text-cyan-200" />
            <circle cx="130" cy="220" r="14" className="opacity-30 text-cyan-300 animate-pulse" />
            <circle cx="160" cy="285" r="8" className="opacity-55 text-cyan-200" />
            <circle cx="175" cy="340" r="11" className="opacity-40 text-cyan-300" />
            <circle cx="105" cy="410" r="6" className="opacity-65 text-cyan-100" />
            <circle cx="90" cy="60" r="12" className="opacity-35 text-cyan-400 animate-ping" style={{ animationDuration: '6s' }} />
            {/* Beautiful light reflections on drops */}
            <ellipse cx="116" cy="96" rx="3" ry="5" fill="white" className="opacity-75Rotate" />
            <ellipse cx="142" cy="176" rx="2" ry="3" fill="white" className="opacity-80" />
            <ellipse cx="126" cy="214" rx="4" ry="7" fill="white" className="opacity-60" />
          </svg>
        </div>

        <div className="absolute right-0 top-[5%] w-48 sm:w-80 h-[500px] pointer-events-none opacity-40 sm:opacity-75 select-none z-10">
          <svg viewBox="0 0 200 500" className="w-full h-full text-cyan-400" fill="currentColor">
            <path d="M200,60 C140,90 110,40 90,110 C70,180 160,210 120,290 C100,330 180,380 200,430 Z" className="opacity-15 text-cyan-500" />
            <path d="M200,100 C155,120 125,70 110,145 C95,215 175,245 145,320 C130,355 190,390 200,440 Z" className="opacity-25 text-cyan-400" />
            <circle cx="80" cy="90" r="9" className="opacity-45 text-cyan-300 animate-bounce" style={{ animationDuration: '3.5s' }} />
            <circle cx="55" cy="170" r="12" className="opacity-35 text-cyan-200 animate-pulse" />
            <circle cx="70" cy="240" r="6" className="opacity-55 text-cyan-300" />
            <circle cx="40" cy="280" r="14" className="opacity-40 text-cyan-200" />
            <circle cx="55" cy="360" r="10" className="opacity-50 text-cyan-300" />
            <circle cx="95" cy="430" r="8" className="opacity-60 text-cyan-100" />
            {/* Reflections */}
            <ellipse cx="76" cy="86" rx="2.5" ry="4.5" fill="white" className="opacity-80" />
            <ellipse cx="51" cy="164" rx="3.5" ry="6" fill="white" className="opacity-70" />
          </svg>
        </div>

        {/* Ambient background blur colors */}
        <div className="absolute top-[35%] left-1/4 w-80 h-80 bg-cyan-500/4 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-[45%] right-1/4 w-96 h-96 bg-purple-500/4 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          {/* Section heading header exactly matching image 100% */}
          <div className="text-center space-y-3 mb-16 max-w-4xl mx-auto">
            
            {/* Top decorative badge with gold marks */}
            <div className="flex items-center justify-center gap-3.5 select-none">
              <div className="flex items-center gap-1 opacity-90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd700] shadow-[0_0_8px_#ffd700] shrink-0" />
                <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#ffd700]" />
              </div>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#00E5FF] tracking-[0.25em] uppercase">
                NỀN TẢNG RAINSOFT DEALER
              </span>
              <div className="flex items-center gap-1 opacity-90">
                <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#ffd700]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd700] shadow-[0_0_8px_#ffd700] shrink-0" />
              </div>
            </div>

            {/* Main header: VÌ SAO NÊN HỢP TÁC? (VÌ SAO in white, NÊN HỢP TÁC? in luxury gold gradient) */}
            <h2 className="text-4xl sm:text-7xl font-sans font-black text-white tracking-tight uppercase leading-tight mt-3">
              VÌ SAO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe066] via-[#ffd700] to-[#b8860b] drop-shadow-[0_2px_15px_rgba(255,215,0,0.5)] font-display font-black">NÊN HỢP TÁC?</span>
            </h2>

            {/* Sub-heading standard: 4 nền tảng phát triển thương hiệu (italic cursive font style) */}
            <p className="text-xl sm:text-3.5xl text-white font-sans font-medium tracking-wide mt-2">
              4 nền tảng <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe57f] via-[#ffd700] to-[#b8860b] font-serif font-semibold italic tracking-wide lowercase">phát triển thương hiệu</span>
            </p>

            {/* Sub-description matching exactly */}
            <p className="text-xs sm:text-sm text-[#DDEBFF]/80 leading-relaxed max-w-4xl mx-auto pt-4 font-sans font-normal">
              Mô hình RainSoft Dealer phát huy tối đa 4 trụ cột tăng trưởng vững bền: <br className="hidden sm:block" />
              Sản phẩm tốt đỉnh, Chương trình chuyên sâu, Lợi nhuận vượt bậc và Con người đồng hành.
            </p>
          </div>

          {/* Cards Grid using genuine luxury glassmorphism and thin gold border alignments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Value 1: Product (Gold Theme) */}
            <div className="p-6 sm:p-7 pt-9 pb-5 rounded-[2rem] bg-gradient-to-b from-[#03142d]/85 via-[#020d1c]/95 to-[#01091a]/100 border border-[#ffd700]/30 hover:border-[#ffd700] hover:shadow-[0_0_35px_rgba(255,215,0,0.22)] transition-all duration-350 relative group flex flex-col justify-between h-full overflow-hidden">
              <div>
                
                {/* Gold Circle Badge Header containing star/award icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 p-[1.5px] shadow-[0_0_20px_rgba(255,215,0,0.35)] flex items-center justify-center shrink-0 group-hover:scale-110 duration-300">
                    <div className="w-full h-full bg-[#020d1c] rounded-full flex items-center justify-center text-[#ffd700]">
                      <Award className="w-7 h-7 text-[#ffd700] animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Number & Name Title Block */}
                <div className="text-center">
                  <h3 className="text-base font-sans font-bold text-slate-400 tracking-wide uppercase">
                    <span className="text-[#ffd700] font-mono font-black text-xl mr-2">01</span>PRODUCT
                  </h3>
                  <span className="text-xs font-mono font-black text-[#ffd700] tracking-widest uppercase block mt-1 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
                    SẢN PHẨM TỐT ĐỈNH
                  </span>
                </div>

                {/* Description */}
                <p className="text-[11px] sm:text-[12px] text-[#DDEBFF]/85 leading-relaxed mt-4 font-normal font-sans text-justify">
                  Thương hiệu Mỹ có bề dày từ 1953, định vị phân hiệu siêu xa xỉ độc quyền. Đạt chứng chỉ uy tín thế giới Gold Seal (WQA, NSF) cam kết bảo vệ trọn vẹn gia đình thượng lưu.
                </p>
              </div>

              {/* Dynamic CSS Canister Illustration at Bottom (Render 100% matching image) */}
              <div className="relative w-full h-44 mt-6 rounded-2xl bg-[#020c19] border border-[#ffd700]/15 overflow-hidden flex items-center justify-center shadow-inner">
                {/* Base gradients */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(2,12,25,0)_40%,#03162f_100%)] z-10" />
                <div className="absolute bottom-0 w-full h-[60px] bg-[radial-gradient(ellipse_at_center,rgba(0,110,255,0.18),transparent_60%)] pointer-events-none" />
                
                {/* Holographic Glowing Oval Platform */}
                <div className="absolute bottom-2 w-48 h-8 rounded-full border border-[#ffd700]/35 bg-gradient-to-b from-[#031530] to-[#010817] shadow-[0_4px_15px_rgba(255,215,0,0.25)] flex items-center justify-center">
                  <div className="w-[90%] h-[90%] rounded-full border border-dashed border-[#00D4FF]/25 animate-spin-slow" />
                </div>

                {/* Actual Custom canister columns of Gold Seal Product */}
                <div className="relative z-25 flex items-end justify-center gap-2.5 pb-4 h-full scale-[0.9]">
                  
                  {/* Canister 1 Left (Luxurious Black Active Carbon Bottle) */}
                  <div className="relative w-4.5 h-22 bg-gradient-to-b from-[#222] via-[#080808] to-[#121212] rounded-full border border-slate-700/50 shadow-md flex flex-col justify-between items-center py-1">
                    <div className="w-3.5 h-2 bg-slate-950 rounded-t-sm border-b border-[#ffd700]/30" />
                    {/* Brand print */}
                    <div className="w-3 h-6 bg-white/5 rounded flex flex-col items-center justify-center gap-0.5">
                      <span className="text-[3px] font-sans font-bold text-amber-400 scale-[0.6] leading-none">RainSoft</span>
                      <div className="w-2.5 h-[1px] bg-slate-600 scale-75" />
                    </div>
                    <div className="w-full h-[1px] bg-slate-800" />
                  </div>

                  {/* Canister 2 Center (Large High-End Pearl White Softener Canister with Chrome Cap) */}
                  <div className="relative w-7 h-28 bg-gradient-to-b from-slate-100 via-white to-slate-200 rounded-full border border-slate-300 shadow-[0_0_12px_rgba(255,215,0,0.15)] flex flex-col justify-between items-center py-2.5">
                    <div className="absolute top-0 bottom-0 left-[2.5px] w-[1px] bg-white/40" />
                    {/* Metal cap on center bottle */}
                    <div className="w-5.5 h-4.5 bg-slate-950 rounded-t-md flex flex-col items-center justify-center border-b border-[#ffd700]/40">
                      <div className="w-2.5 h-[1.5px] bg-[#00E5FF] animate-pulse rounded-full" />
                    </div>
                    {/* Gold separator */}
                    <div className="w-full h-1 bg-[#ffd700]" />
                    {/* Label badge */}
                    <div className="w-5.5 h-8 bg-[#040e24] rounded border border-[#ffd700]/25 flex flex-col items-center justify-center p-0.5 relative">
                      <span className="text-[3px] font-bold text-white scale-[0.8] leading-none">RainSoft</span>
                      <div className="w-3.5 h-[0.5px] bg-[#ffd700] scale-90 mt-0.5" />
                      <div className="w-1.5 h-[0.5px] bg-slate-500 scale-90 mt-0.5" />
                    </div>
                    <div className="w-5 h-1.5 bg-slate-950 rounded-b-full" />
                  </div>

                  {/* Canister 3 Right (Medium Metallic Titanium Silver Filter) */}
                  <div className="relative w-5 h-24 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-700 rounded-full border border-slate-300 shadow-md flex flex-col justify-between items-center py-2">
                    <div className="w-4 h-2 bg-slate-950 rounded-t-sm" />
                    {/* Blue water status band indicator */}
                    <div className="w-2.5 h-7 bg-cyan-950/40 rounded flex flex-col items-center justify-center p-0.5 border border-cyan-500/10">
                      <div className="w-1 h-3 bg-cyan-400 animate-pulse rounded-full shadow-[0_0_4px_#00E5FF]" />
                    </div>
                    <div className="w-full h-[1px] bg-slate-600" />
                  </div>
                </div>

                {/* Golden Protection Star Shield check at bottom left */}
                <div className="absolute bottom-5 left-4 z-30 transform -rotate-12 hover:rotate-6 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#ffd700] via-[#b8860b] to-[#ffd700] p-[1.5px] shadow-[0_5px_12px_rgba(255,215,0,0.35)]">
                    <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-[#ffd700]" />
                    </div>
                  </div>
                </div>

                {/* Glints */}
                <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-[#ffd700] rounded-full animate-ping" />
                <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
              </div>

              <div className="w-full h-1 bg-gradient-to-r from-[#ffd700] via-[#b8860b] to-[#ffd700] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute bottom-0 left-0 rounded-b-3xl" />
            </div>

            {/* Value 2: Program (Blue/Cyan Theme) */}
            <div className="p-6 sm:p-7 pt-9 pb-5 rounded-[2rem] bg-gradient-to-b from-[#03142d]/85 via-[#020d1c]/95 to-[#01091a]/100 border border-[#00D4FF]/25 hover:border-[#00D4FF] hover:shadow-[0_0_35px_rgba(0,212,255,0.22)] transition-all duration-350 relative group flex flex-col justify-between h-full overflow-hidden">
              <div>
                
                {/* Cyan Circle Badge Header */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-600 p-[1.5px] shadow-[0_0_20px_rgba(0,212,255,0.35)] flex items-center justify-center shrink-0 group-hover:scale-110 duration-300">
                    <div className="w-full h-full bg-[#020d1c] rounded-full flex items-center justify-center text-[#00D4FF]">
                      <Layers className="w-7 h-7 text-[#00D4FF] animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Number & Title Block */}
                <div className="text-center">
                  <h3 className="text-base font-sans font-bold text-slate-400 tracking-wide uppercase">
                    <span className="text-[#00D4FF] font-mono font-black text-xl mr-2">02</span>PROGRAM
                  </h3>
                  <span className="text-xs font-mono font-black text-[#00D4FF] tracking-widest uppercase block mt-1 drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]">
                    HỖ TRỢ SÂU RỘNG
                  </span>
                </div>

                {/* Description Wording exactly matching the image */}
                <p className="text-[11px] sm:text-[12px] text-[#DDEBFF]/85 leading-relaxed mt-4 font-normal font-sans text-justify">
                  Hệ thống đào tạo kỹ năng tư vấn khép kín, bộ tài nguyên truyền thông độc quyền, phối ghép demo, vật tư cực quan sinh động và kịch bản marketing vùng tự động cao.
                </p>
              </div>

              {/* Dynamic Academic Training Laptop Design */}
              <div className="relative w-full h-44 mt-6 rounded-2xl bg-[#020c19] border border-[#00D4FF]/15 overflow-hidden flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(2,12,25,0)_40%,#03162f_100%)] z-10" />
                <div className="absolute bottom-0 w-full h-[60px] bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.18),transparent_60%)] pointer-events-none" />

                {/* Laptop scale representation */}
                <div className="relative z-20 flex flex-col items-center justify-center w-[150px] h-28 transform hover:scale-105 duration-300 scale-[0.92]">
                  {/* Laptop Screen */}
                  <div className="w-[110px] h-[68px] bg-[#020612] rounded-t-xl border border-cyan-500/30 p-1 shadow-[0_0_20px_rgba(0,212,255,0.15)] flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[60px] h-[60px] bg-gradient-to-bl from-cyan-500/5 to-transparent pointer-events-none" />
                    <div className="flex items-center justify-between border-b border-cyan-500/15 pb-0.5">
                      <div className="flex gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-red-500" />
                        <span className="w-1 h-1 rounded-full bg-yellow-400" />
                        <span className="w-1 h-1 rounded-full bg-green-500" />
                      </div>
                      <span className="text-[4.5px] font-mono text-cyan-400">RAINSOFT ONL</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center py-1 gap-1">
                      <div className="w-[90%] h-3.5 bg-cyan-950/40 rounded border border-cyan-500/10 flex items-center justify-center">
                        <span className="text-[4.5px] font-mono text-cyan-300 font-bold">TRAINING SYSTEM</span>
                      </div>
                      <div className="w-[90%] flex gap-1">
                        <div className="flex-1 h-2.5 bg-[#ffd700]/5 rounded border border-[#ffd700]/15 flex items-center justify-center">
                          <span className="text-[4px] font-mono text-amber-300 scale-90">CURRICULUM</span>
                        </div>
                        <div className="flex-1 h-2.5 bg-cyan-950/50 rounded border border-cyan-500/10 flex items-center justify-center">
                          <span className="text-[4px] font-mono text-cyan-400 scale-90">VALI DEMO</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-[1.5px] bg-cyan-500/15" />
                  </div>

                  {/* Base */}
                  <div className="relative w-[136px] h-[5px] bg-gradient-to-b from-slate-400 to-slate-700 rounded-b-md shadow-2xl border-t border-slate-300">
                    <div className="absolute top-[0.5px] left-1/2 -translate-x-1/2 w-7 h-[1.5px] bg-slate-900 rounded" />
                  </div>
                </div>

                {/* Cute Graduation Cap */}
                <div className="absolute top-1/4 left-5 z-30 transform -rotate-12 select-none pointer-events-none scale-90">
                  <div className="relative">
                    <div className="w-11 h-4.5 bg-slate-950 border border-slate-700 shadow-2xl relative flex items-center justify-center [transform:rotateX(55deg)_rotateZ(45deg)]">
                      <div className="absolute w-1 h-1 bg-[#ffd700] rounded-full shadow" />
                    </div>
                    <div className="w-5 h-2 bg-slate-950 border-x border-b border-slate-800 rounded-full mx-auto -mt-1 shadow-inner" />
                    <div className="absolute left-[30px] top-2.5 w-[0.8px] h-5 bg-[#ffd700]/80 shadow" />
                  </div>
                </div>

                {/* Network nodes coordinates background */}
                <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20%" cy="35%" r="1.5" fill="#00D4FF" />
                  <circle cx="80%" cy="25%" r="2" fill="#00D4FF" />
                  <circle cx="85%" cy="75%" r="1.5" fill="#00D4FF" />
                  <line x1="20%" y1="35%" x2="45%" y2="50%" stroke="#00D4FF" strokeWidth="0.5" />
                  <line x1="80%" y1="25%" x2="60%" y2="45%" stroke="#00D4FF" strokeWidth="0.5" />
                </svg>
              </div>

              <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-indigo-650 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute bottom-0 left-0 rounded-b-3xl" />
            </div>

            {/* Value 3: Profit (Purple Theme) */}
            <div className="p-6 sm:p-7 pt-9 pb-5 rounded-[2rem] bg-gradient-to-b from-[#03142d]/85 via-[#020d1c]/95 to-[#01091a]/100 border border-purple-500/25 hover:border-[#a855f7] hover:shadow-[0_0_35px_rgba(168,85,247,0.22)] transition-all duration-350 relative group flex flex-col justify-between h-full overflow-hidden">
              <div>
                
                {/* Purple Circle Badge Header */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-b from-purple-300 via-fuchsia-400 to-fuchsia-600 p-[1.5px] shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center justify-center shrink-0 group-hover:scale-110 duration-300">
                    <div className="w-full h-full bg-[#020d1c] rounded-full flex items-center justify-center text-purple-450">
                      <BadgeDollarSign className="w-7 h-7 text-purple-400 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Number & Title Block */}
                <div className="text-center">
                  <h3 className="text-base font-sans font-bold text-slate-400 tracking-wide uppercase">
                    <span className="text-purple-400 font-mono font-black text-xl mr-2">03</span>PROFIT
                  </h3>
                  <span className="text-xs font-mono font-black text-purple-400 tracking-widest uppercase block mt-1 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                    LỢI NHUẬN ĐỘT PHÁ
                  </span>
                </div>

                {/* Description text matches 100% exactly */}
                <p className="text-[11px] sm:text-[12px] text-[#DDEBFF]/85 leading-relaxed mt-4 font-normal font-sans text-justify">
                  Sở hữu tỷ lệ chiết khấu ưu tiên cùng dòng sản phẩm giá trị đơn hàng vượt trội, tối ưu hóa điểm số doanh thu trên từng khách gặt hái dòng tiền an tâm dài dào.
                </p>
              </div>

              {/* Dynamic Rising Profit Growth vector and coins representation */}
              <div className="relative w-full h-44 mt-6 rounded-2xl bg-[#020c19] border border-purple-500/15 overflow-hidden flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(2,12,25,0)_40%,#03162f_100%)] z-10" />
                <div className="absolute bottom-0 w-full h-[60px] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.18),transparent_60%)] pointer-events-none" />

                {/* The growth bar graphs */}
                <div className="absolute bottom-4 left-6 right-20 z-20 h-22 flex items-end justify-between gap-1.5">
                  {[
                    { h: "22%", d: "0s" },
                    { h: "38%", d: "0.15s" },
                    { h: "54%", d: "0.3s" },
                    { h: "72%", d: "0.45s" },
                    { h: "94%", d: "0.6s" }
                  ].map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center group-hover:scale-y-105 duration-300 origin-bottom">
                      <div className="w-[4px] h-[4px] rounded-full bg-purple-400 shadow-[0_0_6px_#a855f7] mb-0.5 animate-pulse" style={{ animationDelay: bar.d }} />
                      <div 
                        style={{ height: bar.h }}
                        className="w-2.5 rounded-t bg-gradient-to-t from-purple-950 via-purple-600 to-fuchsia-400 shadow-[0_0_8px_rgba(168,85,247,0.35)]"
                      />
                    </div>
                  ))}
                </div>

                {/* shooting glowing arrow svg overlay */}
                <div className="absolute bottom-4 left-4 right-18 h-22 z-25 pointer-events-none">
                  <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M 10 75 Q 35 55 60 38 T 100 12" 
                      fill="none" 
                      stroke="url(#arrow-purple-gradient)" 
                      strokeWidth="2.5" 
                      className="animate-pulse-subtle"
                    />
                    <polygon 
                      points="96,16 102,9 101,21" 
                      fill="#f472b6" 
                      className="animate-bounce"
                      style={{ animationDuration: '2.5s' }}
                    />
                    <defs>
                      <linearGradient id="arrow-purple-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7e22ce" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#f472b6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Stacks. Of. Gold. Coins! */}
                <div className="absolute bottom-3 right-4 z-30 flex items-end gap-0.5 group-hover:-translate-y-1 duration-300">
                  {/* Flat stacked cylinder coin stack left */}
                  <div className="flex flex-col-reverse -space-y-3.5 scale-75 select-none animate-pulse-subtle">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-6 h-3.5 bg-gradient-to-r from-amber-600 via-amber-300 to-yellow-500 rounded-full border border-amber-400 shadow-sm relative">
                        <div className="absolute inset-[1px] rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 border border-amber-300/40" />
                      </div>
                    ))}
                  </div>

                  {/* Star gold coin stack right (standing taller) */}
                  <div className="flex flex-col-reverse -space-y-3.5 scale-95 select-none relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-7 h-4 bg-gradient-to-r from-amber-600 via-amber-300 to-yellow-500 rounded-full border border-amber-400/90 shadow-md relative flex items-center justify-center">
                        <div className="absolute inset-[1px] rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 border border-amber-200/50 flex items-center justify-center">
                          {i === 4 && <span className="text-[7.5px] font-black text-yellow-950 font-mono scale-90 leading-none">$</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Big Gold Coin lean in front of stacked gold coins */}
                  <div className="absolute bottom-0 right-[4px] w-6 h-6 rounded-full bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-600 border border-[#ffd700] flex items-center justify-center shadow-[0_2px_8px_rgba(251,191,36,0.5)] z-20 hover:scale-110 duration-200">
                    <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 border border-yellow-250 flex items-center justify-center">
                      <span className="text-[9px] font-black text-amber-950">$</span>
                    </div>
                  </div>
                </div>

                {/* Sparkling dot */}
                <div className="absolute top-1/3 right-10 w-1.5 h-1.5 rounded-full bg-[#ffd700] blur-[1px] animate-ping" />
              </div>

              <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute bottom-0 left-0 rounded-b-3xl" />
            </div>

            {/* Value 4: People (Teal/Green Theme) */}
            <div className="p-6 sm:p-7 pt-9 pb-5 rounded-[2rem] bg-gradient-to-b from-[#03142d]/85 via-[#020d1c]/95 to-[#01091a]/100 border border-[#10b981]/25 hover:border-[#10b981] hover:shadow-[0_0_35px_rgba(16,185,129,0.22)] transition-all duration-350 relative group flex flex-col justify-between h-full overflow-hidden">
              <div>
                
                {/* Green Circle Badge Header */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-b from-emerald-300 via-teal-400 to-teal-600 p-[1.5px] shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center justify-center shrink-0 group-hover:scale-110 duration-300">
                    <div className="w-full h-full bg-[#020d1c] rounded-full flex items-center justify-center text-[#10b981]">
                      <Users className="w-7 h-7 text-[#10b981] animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Number & Title Block */}
                <div className="text-center">
                  <h3 className="text-base font-sans font-bold text-slate-400 tracking-wide uppercase">
                    <span className="text-emerald-400 font-mono font-black text-xl mr-2">04</span>PEOPLE
                  </h3>
                  <span className="text-xs font-mono font-black text-[#10b981] tracking-widest uppercase block mt-1 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                    ĐỒNG HÀNH THỰC CHIẾN
                  </span>
                </div>

                {/* Description wording exactly matches 100% */}
                <p className="text-[11px] sm:text-[12px] text-[#DDEBFF]/85 leading-relaxed mt-4 font-normal font-sans text-justify">
                  Chuyên viên SHAHA Việt Nam sẵn sàng hỗ trợ trực tiếp từ đo lường mẫu nước thực nghiệm bằng vali Test Kit Hoa Kỳ, tư vấn chốt deal và tối ưu kỹ nghệ lắp đặt.
                </p>
              </div>

              {/* Dynamic Cyber Earth Globe and Silhouetted Lineup representation */}
              <div className="relative w-full h-44 mt-6 rounded-2xl bg-[#020c19] border border-[#10b981]/15 overflow-hidden flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(2,12,25,0)_40%,#03162f_100%)] z-10" />
                <div className="absolute bottom-0 w-full h-[60px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.18),transparent_60%)] pointer-events-none" />

                {/* Holographic earth sphere background rotating */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-24 z-20 opacity-20 pointer-events-none">
                  <div className="w-full h-full rounded-full border border-dashed border-emerald-400 animate-spin-slow flex items-center justify-center relative">
                    <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-cyan-400" />
                    <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-emerald-400" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-emerald-400" />
                  </div>
                </div>

                {/* Base radar lines on grid */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-40 h-10 z-15 flex items-center justify-center pointer-events-none">
                  <div className="w-36 h-6 rounded-full border-2 border-emerald-400/20 bg-emerald-950/10 [transform:rotateX(65deg)] flex items-center justify-center relative shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <div className="w-[85%] h-[85%] rounded-full border border-dashed border-emerald-400/40 animate-spin-slow" />
                    <div className="w-[50%] h-[50%] rounded-full border border-emerald-400/60 animate-ping opacity-50" />
                  </div>
                </div>

                {/* 3 Executive shadow models standing */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-25 flex items-end justify-center w-full h-20 gap-3 px-8 pointer-events-none scale-[0.88]">
                  
                  {/* Left executive */}
                  <div className="flex flex-col items-center scale-90 opacity-60">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-slate-900 border border-emerald-500/50" />
                      <svg className="w-8 h-8 -mt-1 text-slate-900 fill-current" viewBox="0 0 100 100">
                        <path d="M 15 90 C 20 40, 80 40, 85 90 Z" stroke="#10b981" strokeWidth="3" />
                      </svg>
                    </div>
                  </div>

                  {/* Center Leader Proudly Styled */}
                  <div className="flex flex-col items-center scale-105 z-10">
                    <div className="relative flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                      <div className="relative -mt-1 w-10 h-12 bg-slate-900 border-t-2 border-x-2 border-emerald-400 rounded-t-full shadow-md overflow-hidden flex flex-col items-center pt-1 px-2.5">
                        <div className="w-2.5 h-2.5 border-b border-x border-[#10b981]/50 rounded-b-xl" />
                        <div className="w-1.5 h-5 bg-gradient-to-b from-emerald-400 to-teal-600 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Right executive */}
                  <div className="flex flex-col items-center scale-90 opacity-60">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-slate-900 border border-emerald-500/50" />
                      <svg className="w-8 h-8 -mt-1 text-slate-900 fill-current" viewBox="0 0 100 100">
                        <path d="M 15 90 C 20 40, 80 40, 85 90 Z" stroke="#10b981" strokeWidth="3" />
                      </svg>
                    </div>
                  </div>

                </div>

                <div className="absolute top-1/4 left-10 w-0.5 h-8 bg-emerald-500/20" />
              </div>

              <div className="w-full h-1 bg-gradient-to-r from-emerald-400 to-[#10b981] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute bottom-0 left-0 rounded-b-3xl" />
            </div>

          </div>

          {/* Golden Quote Band Quote Block at bottom representing premium commitment */}
          <div className="mt-16 flex justify-center">
            <div className="relative inline-flex items-center px-10 sm:px-14 py-4 rounded-full bg-slate-950/75 border border-[#ffd700]/30 shadow-[0_0_20px_rgba(255,215,0,0.1)] max-w-3xl text-center group hover:border-[#ffd700]/60 transition-all duration-300">
              <div className="absolute top-[-5px] left-[15%] w-2 h-2 bg-[#ffd700] rounded-full blur-[1px] animate-ping" />
              <span className="text-xs sm:text-xs md:text-sm text-[#DDEBFF] leading-relaxed font-sans font-bold flex items-center justify-center gap-1.5 flex-wrap">
                <span className="text-[#ffd700] text-lg font-serif">❝</span>
                Đối tác không đi một mình – <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#fff3b0] to-[#b8860b] font-sans font-black tracking-wider uppercase">SHAHA Việt Nam</span> đồng hành từ A-Z
                <span className="text-[#ffd700] text-lg font-serif">❞</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* NEW SECTION: PREMIUM PRODUCT LINEUP & INTERACTIVE CATALOG (Matched strictly with Image 1 & Image 2 filters) */}
      <section className="py-24 bg-[#010919] border-t border-[#ffd700]/25 relative z-10" id="products">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,212,255,0.08),transparent_40%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#ffd700] uppercase tracking-widest block">Công nghệ tột đỉnh</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase leading-none">
              Thiết Bị Lọc Tổng RainSoft
            </h2>
            <p className="text-sm text-[#DDEBFF]/80 leading-relaxed font-normal">
              Trực quan hóa hệ danh mục sản phẩm từ dòng thiết lập cao cấp độc bản (Ảnh 1) đến toàn cảnh quần thể gia đình thiết bị đa dạng công suất (Ảnh 2) được SHAHA phân phối ủy quyền.
            </p>
          </div>

          {/* Dynamic Switch Filter and Control Tabs for Image 1 vs Image 2 */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#03142d]/90 border border-[#ffd700]/30 shadow-[0_0_25px_rgba(255,215,0,0.05)]">
              <button
                onClick={() => setSelectedProductTab('image1')}
                className={`px-6 py-3.5 rounded-xl font-sans font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  selectedProductTab === 'image1'
                    ? 'bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-slate-950 shadow-[0_5px_15px_rgba(255,215,0,0.25)]'
                    : 'text-[#DDEBFF]/70 hover:text-white hover:bg-slate-950/40'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Hệ Thống Ảnh 1 (Flagship Series)</span>
              </button>
              <button
                onClick={() => setSelectedProductTab('image2')}
                className={`px-6 py-3.5 rounded-xl font-sans font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  selectedProductTab === 'image2'
                    ? 'bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-slate-950 shadow-[0_5px_15px_rgba(255,215,0,0.25)]'
                    : 'text-[#DDEBFF]/70 hover:text-white hover:bg-slate-950/40'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>Hệ Thống Ảnh 2 (Advanced fleet)</span>
              </button>
            </div>
          </div>

          {/* Interactive Responsive Grid Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Box - Image Presentation With Automatic Cross-fades */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              
              <AnimatePresence mode="wait">
                {selectedProductTab === 'image1' ? (
                  <motion.div
                    key="tab-image1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#ffd700]/30 shadow-[0_20px_45px_rgba(0,212,255,0.15)] bg-slate-950 group"
                  >
                    <img
                      src="/src/assets/images/hero_product_pedestal_1781703353546.jpg"
                      alt="Cận cảnh bộ đôi vàng lọc tổng RainSoft"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6">
                      <span className="text-[10px] font-mono text-[#ffd700] font-black uppercase tracking-widest">Ảnh 1: Cận Cảnh Trên Bục Trưng Bày</span>
                      <p className="text-xs text-white mt-1">Sự phối hợp đỉnh cao của van điện tử EC5 nước cứng và tháp lọc Q2 Carbon đen tuyền.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="tab-image2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#ffd700]/30 shadow-[0_20px_45px_rgba(255,215,0,0.15)] bg-slate-950 group"
                  >
                    <img
                      src="/src/assets/images/product_catalog_lineup_1781703379289.jpg"
                      alt="Bức tranh toàn cảnh các giải pháp lọc RainSoft"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6">
                      <span className="text-[10px] font-mono text-[#00D4FF] font-black uppercase tracking-widest">Ảnh 2: Quần Thể Gia Đình Thiết Bị Đa Diện</span>
                      <p className="text-xs text-white mt-1">Từ các cột Slim độc lập, thùng muối tách rời đến model Cabinet nguyên khối cho Penthouse.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative detail badge */}
              <div className="mt-4 px-4 py-2 border border-slate-800 rounded-xl bg-[#03142d]/40 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono text-slate-400">Hình ảnh bản quyền thuộc về RainSoft Hoa Kỳ & SHAHA VN</span>
              </div>

            </div>

            {/* Right Box - Detailed specifications of the active selection (The strict filters) */}
            <div className="lg:col-span-7 space-y-6">
              
              <AnimatePresence mode="wait">
                {selectedProductTab === 'image1' ? (
                  <motion.div
                    key="products-image1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    
                    {/* Device 1 */}
                    <div className="p-6 rounded-2xl bg-[#03142d]/50 border border-[#ffd700]/20 hover:border-[#ffd700]/50 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3 mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#ffd700]/10 flex items-center justify-center text-[#ffd700] border border-[#ffd700]/20">
                            <Sparkles className="w-4.5 h-4.5" />
                          </div>
                          <h3 className="text-base sm:text-lg font-display font-black text-white uppercase tracking-wider">
                            Cột Lọc Mềm RainSoft EC5 Platinum
                          </h3>
                        </div>
                        <span className="text-[9px] font-mono font-bold px-2 py-1 rounded bg-[#ffd700]/10 text-[#ffd700] uppercase border border-[#ffd700]/30 tracking-widest self-start sm:self-auto">
                          Signature Softener
                        </span>
                      </div>
                      
                      <p className="text-xs text-[#DDEBFF]/95 leading-relaxed font-sans mb-4">
                        Thiết bị triệt tiêu nước cứng, đá vôi siêu hiệu quả của RainSoft. Trang bị vỏ bọc Chrome tráng bạc mịn sang trọng, chống tia cực tím độc bọt phá, đảm bảo mỹ quan trong nhà hoặc hầm kỹ thuật biệt thự.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#DDEBFF]/80 font-sans">
                        <div className="flex items-center gap-2 bg-slate-950/30 p-2 rounded-lg border border-slate-900">
                          <span className="text-emerald-400">✓</span>
                          <span>Van điện tử LCD thông minh, tự báo bảo trì</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-950/30 p-2 rounded-lg border border-slate-900">
                          <span className="text-emerald-400">✓</span>
                          <span>Chống mất áp lực nước khi sục xả</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-950/30 p-2 rounded-lg border border-slate-900">
                          <span className="text-emerald-400">✓</span>
                          <span>Hạt màng lọc trao đổi ion bền bỉ tủ mẫu</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-950/30 p-2 rounded-lg border border-slate-900">
                          <span className="text-emerald-400">✓</span>
                          <span>BẢO HÀNH TRỌN ĐỜI từ nhà máy Hoa Kỳ</span>
                        </div>
                      </div>
                    </div>

                    {/* Device 2 */}
                    <div className="p-6 rounded-2xl bg-[#03142d]/50 border border-[#00D4FF]/20 hover:border-[#00D4FF]/50 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3 mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF] border border-[#00D4FF]/20">
                            <Layers className="w-4.5 h-4.5" />
                          </div>
                          <h3 className="text-base sm:text-lg font-display font-black text-white uppercase tracking-wider">
                            Hệ Thống Lọc Than Hoạt Tính Q2 Carbon
                          </h3>
                        </div>
                        <span className="text-[9px] font-mono font-bold px-2 py-1 rounded bg-[#00D4FF]/10 text-[#00D4FF] uppercase border border-[#00D4FF]/35 tracking-widest self-start sm:self-auto">
                          Luxury Carbon Block
                        </span>
                      </div>
                      
                      <p className="text-xs text-[#DDEBFF]/95 leading-relaxed font-sans mb-4">
                        Linh hồn xử lý hóa chất độc, màu mùi lạ và clo dư trong nước máy đô thị. Màu sơn nhám sang trọng, trang trí bằng dải LED tinh tế báo trạng thái lưu thông ở mặt tiền của thiết bị.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#DDEBFF]/80 font-sans">
                        <div className="flex items-center gap-2 bg-slate-950/30 p-2 rounded-lg border border-slate-900">
                          <span className="text-emerald-400">✓</span>
                          <span>Khử sạch clo, vi kim loại, tàn dư công nghiệp</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-950/30 p-2 rounded-lg border border-slate-900">
                          <span className="text-emerald-400">✓</span>
                          <span>Vỏ composite đúc phủ kim cương bền bỉ</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-950/30 p-2 rounded-lg border border-slate-900">
                          <span className="text-emerald-400">✓</span>
                          <span>Không thay màng tốn kém định kỳ</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-950/30 p-2 rounded-lg border border-slate-900">
                          <span className="text-emerald-400">✓</span>
                          <span>Công nghệ tái sinh than tự động độc quyền</span>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div
                    key="products-image2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    
                    {/* Device 3 */}
                    <div className="p-5 rounded-2xl bg-[#03142d]/50 border border-slate-800 hover:border-slate-700 transition-all">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <h4 className="text-sm font-display font-black text-white uppercase tracking-wider">Hệ Lọc Sinh Hoạt Cabinet Nguyên Khối Lọc-Mềm Tích Hợp</h4>
                        <span className="text-[8px] font-mono text-[#ffd700] uppercase font-bold bg-[#ffd700]/5 px-1.5 py-0.5 rounded">All-In-One Elite</span>
                      </div>
                      <p className="text-xs text-[#DDEBFF]/80 leading-relaxed font-sans mb-2">
                        Thiết kế thùng chứa muối thông minh ôm trọn cột làm mềm bên trong. Vẻ ngoài thanh thoát màu trứng sữa sang trọng tối giản, đo lường khớp tắp cho chung cư hạng sang, Penthouse hay hộ villa diện tích giới hạn.
                      </p>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-3">
                        <span>Tiết kiệm diện tích: 55%</span>
                        <span>•</span>
                        <span>Đúc nhựa nhiệt dẻo ABS cường độ cao</span>
                      </div>
                    </div>

                    {/* Device 4 */}
                    <div className="p-5 rounded-2xl bg-[#03142d]/50 border border-slate-800 hover:border-slate-700 transition-all">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <h4 className="text-sm font-display font-black text-white uppercase tracking-wider">Hệ Cột Đôi Chạy Song Song RainSoft Twin Tank</h4>
                        <span className="text-[8px] font-mono text-[#00D4FF] uppercase font-bold bg-[#00D4FF]/5 px-1.5 py-0.5 rounded">Villa & Castle Capacity</span>
                      </div>
                      <p className="text-xs text-[#DDEBFF]/80 leading-relaxed font-sans mb-2">
                        Giải cấu trúc cho biệt thự quy mô lớn, lâu đài hay tòa dinh dinh đại gia đình. Hai cột trao đổi ion liên hợp luân phiên sục rửa giúp dòng nước mềm vô tận 24/7, không bao giờ ngắt áp lực nước.
                      </p>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-3">
                        <span>Lưu lượng vượt lớn cực đại</span>
                        <span>•</span>
                        <span>Không gián đoạn trong chu trình hoàn nguyên</span>
                      </div>
                    </div>

                    {/* Device 5 */}
                    <div className="p-5 rounded-2xl bg-[#03142d]/50 border border-slate-800 hover:border-slate-700 transition-all">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <h4 className="text-sm font-display font-black text-white uppercase tracking-wider">Tháp Hấp Thụ Cacbon Tích Hợp Bán Công Nghiệp TC-M</h4>
                        <span className="text-[8px] font-mono text-[#ffd700] uppercase font-bold bg-[#ffd700]/5 px-1.5 py-0.5 rounded">High volume series</span>
                      </div>
                      <p className="text-xs text-[#DDEBFF]/80 leading-relaxed font-sans mb-2">
                        Phiên cột chất liệu composite bọc sợi hữu cơ bền nhiệt và lực vượt cấp. Với van sục rửa tự động định lưu, lọc sạch toàn bộ mỡ dầu, rỉ than hay cặn bẩn thô ở nguồn giếng khoan quy mô tư nhân sâu rộng.
                      </p>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-3">
                        <span>Vận hành tự động tự rửa lập trình sẵn</span>
                        <span>•</span>
                        <span>Độ bền cao dải nhiệt độ lên tới 50°C</span>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

              {/* Central CTA of the section */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => {
                    const el = document.getElementById('onboarding');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-sans font-black text-[11px] uppercase tracking-wider bg-gradient-to-r from-slate-900 to-slate-950 border border-[#ffd700]/40 text-[#ffd700] hover:text-white hover:bg-[#ffd705]/10 duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 shrink-0 text-[#ffd700]" />
                  <span>Yêu cầu Tư vấn 3D tủ mẫu & Báo giá đại lý</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: ĐỐI TÁC PHÙ HỢP - INTERACTIVE SEGMENT FINDER WITH GOLD GLOW STYLE */}
      <section className="py-24 bg-[#020617] border-t border-[#d4af37]/15 relative z-10" id="segments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16 max-w-5xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest block">Đối tác tiềm năng</span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase leading-none md:whitespace-nowrap">
              Phân Khúc Đối Tác Phù Hợp
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-[#DDEBFF]/80 leading-relaxed font-normal md:whitespace-nowrap">
              Lựa chọn mô hình định hình kinh doanh chính để nhận định cơ hội hợp lực phát triển và dự toán dòng tiền khai phá của bạn.
            </p>
          </div>

          {/* Interactive Navigation Tabs styled with luxury thin gold borders */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 max-w-5xl mx-auto">
            {PARTNER_GROUPS.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveTab(g.id)}
                className={`px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                  activeTab === g.id 
                    ? 'bg-gradient-to-r from-[#ffd700] via-[#b8860b] to-[#ffd700] border-[#ffd700] text-[#020617] shadow-[0_0_25px_rgba(255,215,0,0.3)]' 
                    : 'bg-[#03142d]/80 border-[#d4af37]/25 text-[#DDEBFF]/70 hover:text-white hover:bg-[#061b33] hover:border-[#ffd700]/50'
                }`}
                id={`segment-tab-${g.id}`}
              >
                {g.id === 'showroom' && <Store className="w-4 h-4" />}
                {g.id === 'mep' && <TrendingUp className="w-4 h-4" />}
                {g.id === 'architect' && <Briefcase className="w-4 h-4" />}
                {g.id === 'contractor' && <Layers className="w-4 h-4" />}
                {g.id === 'entrepreneur' && <Users className="w-4 h-4" />}
                {g.title.split(' ')[0]}
                <span className="hidden sm:inline">{g.title.substring(g.title.indexOf(' '))}</span>
              </button>
            ))}
          </div>

          {/* Tab Frame Contents styled as premium Glassmorphic Poster card with gold borders & light shadows */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 rounded-3xl p-8 sm:p-12 bg-[#03142d]/75 border border-[#d4af37]/45 relative overflow-hidden shadow-[0_0_50px_rgba(3,20,45,0.8),0_0_30px_rgba(0,212,255,0.1)]"
              id="segment-content-display"
            >
              {/* Decorative backgrounds inside container */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#ffd700]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#00D4FF]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Left Column (3 of 5) - Text details */}
              <div className="lg:col-span-3 space-y-8 text-left">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#00D4FF] font-bold uppercase tracking-widest block">{currentGroup.tagline}</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-transparent bg-gradient-to-r from-white via-amber-200 to-[#ffd700] bg-clip-text leading-tight uppercase">{currentGroup.title}</h3>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {currentGroup.description}
                </p>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#00D4FF] block uppercase font-mono tracking-wider">Tệp Khách Hàng Mục Tiêu:</span>
                  <div className="flex flex-wrap gap-2">
                    {currentGroup.audience.map((aud, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#020617] border border-[#d4af37]/30 rounded-xl text-xs font-semibold text-[#DDEBFF] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ffd700] shrink-0" />
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 bg-[#020617]/80 p-5 rounded-2xl border border-[#d4af37]/20">
                  <span className="text-xs font-bold text-[#ffd700] block uppercase font-mono tracking-wider">Cơ Hội Tiếp Cận Thị Trường:</span>
                  <p className="text-xs sm:text-sm text-[#DDEBFF]/90 leading-relaxed font-normal">{currentGroup.opportunity}</p>
                </div>
              </div>

              {/* Right Column (2 of 5) - ROI Simulator highlight */}
              <div className="lg:col-span-2 p-8 rounded-3xl bg-[#03142d]/90 border border-[#d4af37]/35 flex flex-col justify-between text-left h-full shadow-[0_15px_35px_rgba(255,215,0,0.05)]">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#ffd700] uppercase">
                    <TrendingUp className="w-4 h-4 animate-bounce text-[#ffd700]" />
                    Dự Phóng Doanh Thu Thượng Hạng
                  </div>
                  <h4 className="text-lg font-display font-black text-white tracking-wide uppercase leading-snug">Lợi Thế Tài Chính Dự Kiến</h4>
                  <p className="text-xs text-[#DDEBFF]/80 leading-relaxed font-sans">
                    Mô hình lọc nước trung tâm RainSoft có trị giá đơn hàng cao cấp giúp đối tác tối ưu hóa điểm số dòng tiền ròng trung bình trên một khách hàng siêu tốc.
                  </p>
                </div>

                <div className="my-6 p-4 rounded-xl bg-[#00D4FF]/5 border border-[#ffd700]/15 text-slate-250">
                  <span className="text-[10px] font-mono text-[#00D4FF] uppercase tracking-widest block font-bold">Điển hình đối tác thành công:</span>
                  <p className="text-xs sm:text-sm text-amber-100 mt-2 italic leading-relaxed font-medium">
                    "{currentGroup.roiExample}"
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('onboarding');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-4 rounded-2xl font-display font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#fff3b0] via-[#ffd700] to-[#b8860b] hover:from-[#ffffff] hover:to-[#ffd700] text-[#020617] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(255,215,0,0.2)] btn-shine-effect"
                >
                  Nhận chính sách đại lý đại diện
                  <ArrowRight className="w-3.5 h-3.5 text-[#020617]" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* SECTION 4: SHAHA VIỆT NAM HỖ TRỢ ĐỐI TÁC NHỮNG GÌ? (REDESIGNED LUXURY CARDSTYLE) */}
      <section className="py-24 bg-[#020617] border-t border-[#d4af37]/15 relative z-10" id="supports">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-20 max-w-5xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest block">Hỗ trợ đối tác toàn diện</span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase leading-none md:whitespace-nowrap">
              SHAHA Việt Nam Đồng Hành Phát Triển
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-[#DDEBFF]/80 leading-relaxed mt-3 font-normal md:whitespace-nowrap">
              Chúng tôi dẹp bỏ hoàn thành mọi rào cản bước vào ngành nước phân khúc xa xỉ bằng các chương trình hỗ trợ, vali test, 3D showroom độc quyền độc đáo.
            </p>
          </div>

          {/* Supports Grid Cards with Gold Borders and Glass backgrounds */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SUPPORT_PROGRAMS.map((prog, index) => {
              return (
                <div 
                  key={prog.id}
                  className="p-8 rounded-3xl bg-[#03142d]/65 border border-[#d4af37]/25 hover:border-[#ffd700] hover:bg-[#03142d]/90 duration-300 text-left flex flex-col justify-between group shadow-[0_15px_30px_rgba(0,0,0,0.15)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D4FF]/2 rounded-full blur-xl" />
                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5 pb-2">
                      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd700] to-[#b8860b] text-[#020617] font-mono text-sm font-bold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,215,0,0.25)]">
                        0{index + 1}
                      </span>
                      <h4 className="text-lg font-display font-black text-white uppercase group-hover:text-[#ffd700] transition-colors">{prog.title}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#DDEBFF]/80 leading-relaxed font-sans">{prog.description}</p>
                  </div>

                  <ul className="mt-6 space-y-2.5 pt-5 border-t border-[#d4af37]/15 text-xs">
                    {prog.items.map((it, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#DDEBFF]/95">
                        <span className="text-[#ffd700] font-bold shrink-0 mt-0.5">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 5: MÔ HÌNH PHÁT TRIỂN CÙNG ĐỐI TÁC - INTERACTIVE DEVELOPMENT STEPPER */}
      <section className="py-24 bg-[#020617] border-t border-[#d4af37]/15 relative z-10" id="roadmap">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-20 max-w-5xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest block">Lộ trình 5 giai đoạn</span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase leading-none md:whitespace-nowrap">
              Mô Hình Đồng Hành Phát Triển
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-[#DDEBFF]/80 leading-relaxed mt-3 font-normal md:whitespace-nowrap">
              Triệt tiêu rủi ro kinh doanh, hỗ trợ đại lý xây dựng quy trình tiếp cận chuẩn mực từ thực chiến, đào tạo vali tới mở rộng showroom vùng thịnh vượng.
            </p>
          </div>

          {/* Stepper buttons timeline line with rich golden theme */}
          <div className="relative max-w-5xl mx-auto mb-16">
            
            {/* The horizontal track (hidden on small viewports) representing golden flow line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ffd700]/10 via-[#ffd700]/50 to-[#ffd700]/10 -translate-y-1/2 hidden md:block" />

            {/* Stepper buttons list */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
              {DISCOVERY_STAGES.map((stg) => {
                const isActive = activeStage === stg.phase;
                return (
                  <button
                    key={stg.phase}
                    onClick={() => setActiveStage(stg.phase)}
                    className="z-10 flex flex-row md:flex-col items-center gap-4 md:gap-3 bg-[#03142d]/85 px-4.5 py-3 md:py-0 md:px-0 rounded-2xl md:bg-transparent border md:border-0 border-[#d4af37]/25 md:w-auto w-full text-left md:text-center cursor-pointer select-none"
                    id={`roadmap-stage-btn-${stg.phase}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm transition-all duration-300 border-2 ${
                      isActive 
                        ? 'bg-gradient-to-br from-[#fff3b0] to-[#b8860b] border-[#ffd700] text-[#020617] shadow-[0_0_20px_rgba(255,215,0,0.35)] scale-110' 
                        : 'bg-[#020617] border-[#d4af37]/35 text-[#DDEBFF]/60 hover:border-[#ffd700]/40'
                    }`}>
                      {stg.phase}
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase tracking-wider block font-black transition-colors ${isActive ? 'text-[#ffd700]' : 'text-[#DDEBFF]/55'}`}>Giai đoạn 0{stg.phase}</span>
                      <span className={`text-xs font-bold block sm:hidden md:block text-[#DDEBFF]`}>{stg.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Stage Detail Display Frame in Glassmorphic Poster card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto rounded-3xl p-8 sm:p-12 bg-[#03142d]/80 border border-[#d4af37]/45 flex flex-col md:flex-row gap-8 sm:gap-12 text-left relative overflow-hidden shadow-[0_0_40px_rgba(3,20,45,0.7)]"
              id="roadmap-stage-display-card"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#ffd700]/3 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-5 md:w-7/12">
                <span className="text-[10px] font-mono font-bold text-[#ffd700] border border-[#ffd700]/35 px-3 py-1 rounded-full bg-[#ffd700]/5 uppercase tracking-wide inline-block">
                  Lộ trình 0{currentStage.phase} • {currentStage.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-wide leading-tight">{currentStage.title}</h3>
                <p className="text-xs sm:text-sm text-[#DDEBFF]/90 leading-relaxed font-sans">{currentStage.description}</p>
                
                <div className="pt-4 flex items-center gap-4 text-xs font-semibold">
                  <span className="text-[#DDEBFF]/70">Trạng thái đồng hành:</span>
                  <span className="text-[#00D4FF] flex items-center gap-1.5 font-mono">
                    <Clock className="w-4 h-4 animate-spin-slow text-[#00D4FF]" />
                    Chuyên gia hỗ trợ đại lý 24/7
                  </span>
                </div>
              </div>

              {/* Deliverable checklists list */}
              <div className="p-6 rounded-2xl bg-[#020617]/95 border border-[#d4af37]/25 md:w-5/12 flex flex-col justify-center shadow-inner">
                <span className="text-[10px] font-mono text-[#00D4FF] tracking-widest font-bold uppercase block mb-4 border-b border-[#ffd700]/15 pb-2">Kết Quả Đạt Được:</span>
                <ul className="space-y-3.5 text-xs text-[#DDEBFF]">
                  {currentStage.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#ffd700] font-black shrink-0">✓</span>
                      <span className="font-sans font-medium">{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* SECTION 6: LÝ DO THỊ TRƯỜNG ĐANG CẦN RAINSOFT - WATER COMPARISON TABLE */}
      <section className="py-24 bg-[#020617] border-t border-[#d4af37]/15 relative z-10 animate-fade-in" id="market">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-20 max-w-5xl mx-auto font-sans">
            <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest block">Sức hút thị trường lọc tổng</span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase leading-none md:whitespace-nowrap">
              Thị Trường Đón Đầu Phân Khúc Cao Cấp
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-[#DDEBFF]/80 leading-relaxed mt-3 font-normal md:whitespace-nowrap">
              Lọc thô tại vòi hay lọc nước uống nhỏ giọt chỉ xử lý ngọn. Giới biệt thự cao cấp đòi hỏi nguồn nước mềm trung tâm bảo vệ trọn vẹn sức khỏe sinh hoạt lâu năm.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center max-w-6xl mx-auto">
            
            {/* Left 2 segments: Text insights */}
            <div className="lg:col-span-2 space-y-6 text-left text-xs sm:text-sm">
              <div className="p-6 rounded-3xl bg-[#03142d]/65 border border-[#d4af37]/25 space-y-3 shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                <h4 className="font-display font-black text-[#ffd700] text-base tracking-wide uppercase">1. Trọn Vẹn Thiết Bị Được Bảo Vệ</h4>
                <p className="text-[#DDEBFF]/80 leading-relaxed text-xs">
                  Thiết bị vệ sinh Luxury mạ vàng, bồn sục jacuzzi đắt đỏ, máy sưởi nước, bình năng lượng mặt trời nhập khẩu châu Âu cực kỳ dễ bị hoen rỉ phá hủy bởi cặn độ cứng (CaCO3). Thiết bị sau 1-2 năm sử dụng bị bám mảng bám vĩnh viễn nếu không làm mềm bằng lọc tổng RainSoft.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#03142d]/65 border border-[#d4af37]/25 space-y-3 shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                <h4 className="font-display font-black text-[#00D4FF] text-base tracking-wide uppercase">2. Gia Đình Thượng Lưu Sẵn Sàng Đầu Tư</h4>
                <p className="text-[#DDEBFF]/80 leading-relaxed text-xs">
                  Tệp khách biệt thự sẵn sàng đầu tư 150 triệu - 450 triệu VNĐ nếu được cung cấp dữ liệu nước thực tiễn từ vali Test Kit và được cố vấn đúng bản chất công nghệ.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#03142d]/65 border border-[#d4af37]/25 space-y-3 shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                <h4 className="font-display font-black text-emerald-400 text-base tracking-wide uppercase">3. Gia tăng danh mục sản phẩm giá trị</h4>
                <p className="text-[#DDEBFF]/80 leading-relaxed text-xs">
                  Cộng hưởng ngay vào các dòng thiết bị sẵn có của đối tác (bếp nhập, MEP, smarthome, thiết kế...), mở khóa dòng lợi nhuận ròng to lớn mà không tốn chi phí rủi ro mới.
                </p>
              </div>
            </div>

            {/* Right 3 segments: Point filtration vs RainSoft comparison visual */}
            <div className="lg:col-span-3 p-6 sm:p-10 rounded-3xl bg-[#03142d]/75 border border-[#d4af37]/45 text-left shadow-[0_20px_50px_rgba(3,20,45,0.8)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D4FF]/2 rounded-full blur-xl" />
              <h4 className="text-xl font-display font-black text-white tracking-wide border-b border-[#d4af37]/15 pb-4 mb-6 uppercase">
                So Sánh Lọc Tổng RainSoft vs Điểm Lọc Thủ Công
              </h4>

              <div className="space-y-6">
                
                {/* Point filtering */}
                <div className="p-5 rounded-2xl bg-[#020617]/70 border border-[#d4af37]/15">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-bold tracking-wide">
                    <span>LỌC VÒI TRUYỀN THỐNG / LỌC BẾP (POINT OF USE)</span>
                    <span className="text-red-450 font-mono font-bold bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20">Chỉ lọc ăn uống</span>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-xs text-[#DDEBFF]/85 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-black shrink-0">✘</span>
                      <span>Chỉ bảo vệ được 1 điểm dùng nhỏ tại bếp ăn, chất lượng nước sinh hoạt tắm giặt hoàn toàn bị bỏ ngỏ.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-black shrink-0">✘</span>
                      <span>Không triệt tiêu được cặn canxi vôi, khiến vách kính tắm hoen ố bám bẩn gỉ sét chỉ sau vài tháng.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-black shrink-0">✘</span>
                      <span>Tuổi thọ lõi cực ngắn, thường xuyên hỏng hóc làm gián đoạn sinh hoạt gia đình biệt thự.</span>
                    </li>
                  </ul>
                </div>

                {/* RainSoft Premium */}
                <div className="p-5 rounded-2xl bg-[#00D4FF]/5 border border-[#ffd700]/30 text-white shadow-xl glow-blue">
                  <div className="flex justify-between items-center text-xs text-amber-200 font-bold tracking-wide">
                    <span className="text-[#ffd700] uppercase font-sans">HỆ THỐNG LỌC TỔNG TRUNG TÂM RAINSOFT (WHOLE HOUSE)</span>
                    <span className="text-emerald-400 font-mono font-bold flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      Giải pháp Thượng Đỉnh
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-xs text-[#DDEBFF]/95 leading-relaxed">
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#ffd700] font-black shrink-0">✓</span>
                      <span>Lọc làm mềm chảy mượt toàn ngôi nhà, chăm sóc mịn màng làn da bé yêu, cho tóc mượt mịn khi tắm giặt.</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#ffd700] font-black shrink-0">✓</span>
                      <span>Bảo vệ 100% tài sản sứ tắm, đá tự nhiên nhập khẩu châu Âu, bồn jacuzzi và các đường máy sưởi sang.</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#ffd700] font-black shrink-0">✓</span>
                      <span>Van EC5 cảm ứng thông minh hoàn nguyên tiết kiệm muối nước, bảo hành TRỌN ĐỜI trực tiếp từ Mỹ.</span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: QUY TRÌNH TRỞ THÀNH ĐỐI TÁC */}
      <section className="py-24 bg-[#020617] border-t border-[#d4af37]/15 relative z-10 animate-fade-in" id="roadmap-steps">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
          
          <div className="text-center space-y-4 mb-20 max-w-5xl mx-auto">
            <span className="text-xs font-bold text-[#00D4FF] uppercase tracking-[0.25em] block">GIA NHẬP RAINSOFT</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-display font-black text-white tracking-tight uppercase leading-tight !mt-2 md:whitespace-nowrap">
              QUY TRÌNH GIA NHẬP 5 BƯỚC <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#fff3b0] to-[#b8860b] drop-shadow-[0_4px_10px_rgba(255,215,0,0.25)]">THẦN TỐC</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#DDEBFF]/85 leading-relaxed max-w-none mx-auto font-normal md:whitespace-nowrap">
              Quy trình thiết hưởng năng lực khoa học từ lúc khai báo đến lúc showroom chính thức hoạt động gặt hái dòng tiền.
            </p>
          </div>

          {/* 5 Steps Grid timeline with custom luxury colored glowing border stylings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto text-left relative">
            
            {/* Step 1 */}
            <div className="p-5 rounded-[2rem] bg-[#03142d]/80 backdrop-blur-md border border-[#ffd700]/30 hover:border-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.05)] hover:shadow-[0_0_35px_rgba(255,215,0,0.25)] transition-all duration-300 flex flex-col justify-between relative group">
              {/* Chevron connector to step 2 */}
              <div className="hidden lg:flex items-center justify-center pointer-events-none z-20 absolute top-[45%] -right-7 translate-x-1/2 -translate-y-1/2 text-[#00D4FF]">
                <motion.div 
                  initial={{ opacity: 0.5, x: -3 }}
                  animate={{ opacity: 1, x: 3 }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                  className="flex gap-0.5"
                >
                  <ChevronRight className="w-5 h-5 stroke-[3]" />
                  <ChevronRight className="w-5 h-5 stroke-[3] -ml-4" />
                </motion.div>
              </div>

              <div>
                <div className="flex justify-start">
                  <span className="text-[11px] font-mono font-bold text-[#ffd700] bg-[#ffd700]/10 border border-[#ffd700]/30 px-3 py-1 rounded-lg">
                    B1
                  </span>
                </div>
                
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden my-4 border border-[#ffd700]/10 bg-[#020d1c] shadow-inner relative">
                  <img 
                    src="/src/assets/images/step1_register_1781702784446.jpg" 
                    alt="Đăng ký thông tin" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-2 text-center">
                  <h4 className="font-display font-black text-white text-[15px] sm:text-base tracking-wide uppercase transition-colors group-hover:text-[#ffd700]">
                    ĐĂNG KÝ THÔNG TIN
                  </h4>
                  <p className="text-xs text-[#DDEBFF]/80 leading-relaxed font-sans mt-2">
                    Đăng ký trực quan thông qua form dễ khai năng lực trực tuyến ngay tại chân trang này.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-4 border-t border-slate-800/60 mt-4">
                <div className="p-2.5 bg-[#ffd700]/10 rounded-2xl text-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-transform duration-300 group-hover:scale-110">
                  <FileEdit className="w-5.5 h-5.5 stroke-[1.5]" />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-[2rem] bg-[#03142d]/80 backdrop-blur-md border border-[#00D4FF]/30 hover:border-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.05)] hover:shadow-[0_0_35px_rgba(0,212,255,0.25)] transition-all duration-300 flex flex-col justify-between relative group">
              {/* Chevron connector to step 3 */}
              <div className="hidden lg:flex items-center justify-center pointer-events-none z-20 absolute top-[45%] -right-7 translate-x-1/2 -translate-y-1/2 text-purple-400">
                <motion.div 
                  initial={{ opacity: 0.5, x: -3 }}
                  animate={{ opacity: 1, x: 3 }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                  className="flex gap-0.5"
                >
                  <ChevronRight className="w-5 h-5 stroke-[3]" />
                  <ChevronRight className="w-5 h-5 stroke-[3] -ml-4" />
                </motion.div>
              </div>

              <div>
                <div className="flex justify-start">
                  <span className="text-[11px] font-mono font-bold text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/30 px-3 py-1 rounded-lg">
                    B2
                  </span>
                </div>
                
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden my-4 border border-[#00D4FF]/10 bg-[#020d1c] shadow-inner relative">
                  <img 
                    src="/src/assets/images/step2_consult_1781702801542.jpg" 
                    alt="Trao đổi thẩm định" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-2 text-center">
                  <h4 className="font-display font-black text-white text-[15px] sm:text-base tracking-wide uppercase transition-colors group-hover:text-[#00D4FF]">
                    TRAO ĐỔI THẨM ĐỊNH
                  </h4>
                  <p className="text-xs text-[#DDEBFF]/80 leading-relaxed font-sans mt-2">
                    Chuyên viên SHAHA VN liên hệ đánh giá khu vực độc quyền và năng lực kỹ thuật cơ bản.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-4 border-t border-slate-800/60 mt-4">
                <div className="p-2.5 bg-[#00D4FF]/10 rounded-2xl text-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.15)] transition-transform duration-300 group-hover:scale-110">
                  <MessageSquare className="w-5.5 h-5.5 stroke-[1.5]" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-[2rem] bg-[#03142d]/80 backdrop-blur-md border border-purple-500/30 hover:border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.05)] hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] transition-all duration-300 flex flex-col justify-between relative group">
              {/* Chevron connector to step 4 */}
              <div className="hidden lg:flex items-center justify-center pointer-events-none z-20 absolute top-[45%] -right-7 translate-x-1/2 -translate-y-1/2 text-amber-500">
                <motion.div 
                  initial={{ opacity: 0.5, x: -3 }}
                  animate={{ opacity: 1, x: 3 }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                  className="flex gap-0.5"
                >
                  <ChevronRight className="w-5 h-5 stroke-[3]" />
                  <ChevronRight className="w-5 h-5 stroke-[3] -ml-4" />
                </motion.div>
              </div>

              <div>
                <div className="flex justify-start">
                  <span className="text-[11px] font-mono font-bold text-purple-400 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-lg">
                    B3
                  </span>
                </div>
                
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden my-4 border border-purple-200/10 bg-[#020d1c] shadow-inner relative">
                  <img 
                    src="/src/assets/images/step3_workshop_1781702818621.jpg" 
                    alt="Gặp gỡ định hướng" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-2 text-center">
                  <h4 className="font-display font-black text-white text-[15px] sm:text-base tracking-wide uppercase transition-colors group-hover:text-purple-400">
                    GẶP GỠ ĐỊNH HƯỚNG
                  </h4>
                  <p className="text-xs text-[#DDEBFF]/80 leading-relaxed font-sans mt-2">
                    Tọa đàm trực tiếp tại Trụ sở/Showroom mẫu của SHAHA xem đầy chuyền thực nghiệm.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-4 border-t border-slate-800/60 mt-4">
                <div className="p-2.5 bg-purple-500/10 rounded-2xl text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-transform duration-300 group-hover:scale-110">
                  <Users className="w-5.5 h-5.5 stroke-[1.5]" />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-[2rem] bg-[#03142d]/80 backdrop-blur-md border border-amber-500/30 hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.05)] hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] transition-all duration-300 flex flex-col justify-between relative group">
              {/* Chevron connector to step 5 */}
              <div className="hidden lg:flex items-center justify-center pointer-events-none z-20 absolute top-[45%] -right-7 translate-x-1/2 -translate-y-1/2 text-emerald-400">
                <motion.div 
                  initial={{ opacity: 0.5, x: -3 }}
                  animate={{ opacity: 1, x: 3 }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                  className="flex gap-0.5"
                >
                  <ChevronRight className="w-5 h-5 stroke-[3]" />
                  <ChevronRight className="w-5 h-5 stroke-[3] -ml-4" />
                </motion.div>
              </div>

              <div>
                <div className="flex justify-start">
                  <span className="text-[11px] font-mono font-bold text-amber-500 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg">
                    B4
                  </span>
                </div>
                
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden my-4 border border-amber-500/10 bg-[#020d1c] shadow-inner relative">
                  <img 
                    src="/src/assets/images/step4_agreement_1781702836195.jpg" 
                    alt="Thống nhất chính sách" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-2 text-center">
                  <h4 className="font-display font-black text-white text-[15px] sm:text-base tracking-wide uppercase transition-colors group-hover:text-amber-500">
                    THỐNG NHẤT CHÍNH SÁCH
                  </h4>
                  <p className="text-xs text-[#DDEBFF]/80 leading-relaxed font-sans mt-2">
                    Ký biên bản hợp tác chính sách chiết khấu, khu vực ưu đãi và lịch khởi động.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-4 border-t border-slate-800/60 mt-4">
                <div className="p-2.5 bg-amber-500/10 rounded-2xl text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-transform duration-300 group-hover:scale-110">
                  <Handshake className="w-5.5 h-5.5 stroke-[1.5]" />
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-[2rem] bg-[#03142d]/90 backdrop-blur-md border border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.06)] hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-300 flex flex-col justify-between relative group">
              <div>
                <div className="flex justify-start">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/35 px-3 py-1 rounded-lg animate-pulse">
                    B5
                  </span>
                </div>
                
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden my-4 border border-emerald-500/20 bg-[#020d1c] shadow-inner relative">
                  <img 
                    src="/src/assets/images/step5_showroom_1781702851418.jpg" 
                    alt="Khởi động bùng nổ" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-2 text-center">
                  <h4 className="font-display font-black text-white text-[15px] sm:text-base tracking-wide uppercase transition-colors group-hover:text-emerald-400">
                    KHỞI ĐỘNG BÙNG NỔ
                  </h4>
                  <p className="text-xs text-[#DDEBFF]/90 leading-relaxed font-sans mt-2">
                    Bàn giao Brochure catalog, vali Test Kit, thi công tủ trưng bày và cấp chứng nhận chính thức.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-4 border-t border-slate-800/60 mt-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-2xl text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-transform duration-300 group-hover:scale-110">
                  <Rocket className="w-5.5 h-5.5 stroke-[1.5]" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8: REGISTER FORM WIZARD */}
      <section className="py-24 bg-[#020617] border-t border-[#d4af37]/15 relative z-10" id="onboarding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12 max-w-5xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest block">Mở khóa cơ hội</span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase leading-none md:whitespace-nowrap">
              Bắt Đầu Hợp Tác RainSoft Ngay
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-[#DDEBFF]/80 leading-relaxed mt-3 font-normal md:whitespace-nowrap">
              Điền nhanh các thông tin năng lực dưới để chuyên viên SHAHA Việt Nam chuẩn bị các mẫu hồ sơ đại lý tốt nhất trước khi gọi điện liên hệ cho bạn.
            </p>
          </div>

          {/* Render Step-by-step Form */}
          <LeadForm onSuccess={handleLeadSuccess} />

        </div>
      </section>

      {/* FLOATING CHAT ASSISTANT WIDGET */}
      <AIAssistant />

      {/* FOOTER & ADMIN PORTAL ENTRY TRIGGER */}
      <footer className="bg-[#020617] border-t border-[#d4af37]/20 py-12 relative z-10 text-xs sm:text-sm text-[#DDEBFF]/70 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top segment: brand and support disclaimer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#d4af37]/20 pb-8">
            <div className="flex items-center gap-3 font-sans">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ffd700] to-[#b8860b] flex items-center justify-center font-display font-black text-white text-base shadow-[0_0_10px_rgba(255,215,0,0.2)]">
                S
              </div>
              <div className="text-left leading-tight">
                <span className="font-display font-black text-white tracking-wide block text-sm uppercase">SHAHA VIỆT NAM</span>
                <span className="text-[9px] text-[#00D4FF] block font-mono font-bold">Nhà phân phối ủy quyền RainSoft USA</span>
              </div>
            </div>

            <div className="text-[#DDEBFF]/80 text-xs text-left sm:text-right max-w-md font-sans">
              Hệ thống lọc toàn nhà thương hiệu RainSoft Hoa Kỳ uy tín số 1 thế giới từ 1953 được nhập khẩu nguyên chiếc và bảo hành cam kết chuẩn quốc tế bởi SHAHA Việt Nam.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
            <p className="text-slate-500 font-mono">
              © {new Date().getFullYear()} SHAHA Vietnam Inc. Bảo lưu mọi quyền đối tác. | Phát hành năm 2026.
            </p>

            <div className="flex items-center gap-4">
              <a href="#why" className="hover:text-[#ffd700] transition-colors font-semibold">Điều khoản hợp tác</a>
              <span className="text-slate-800">|</span>
              <a href="#market" className="hover:text-[#ffd700] transition-colors font-semibold">Chính sách bảo mật</a>
              <span className="text-slate-800">|</span>
              
              {/* ADMIN CRM PANEL PORTAL TOGGLE TRIGGER BUTTON */}
              <button
                onClick={() => setShowAdmin(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D4FF]/5 hover:bg-[#00D4FF]/10 text-[#00D4FF] hover:text-white hover:border-[#00D4FF]/40 border border-[#00D4FF]/20 duration-200 cursor-pointer font-mono text-[11px]"
                id="footer-admin-toggle-btn"
              >
                <Lock className="w-3 h-3" />
                Quản trị Leads
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* SENSITIVE ADMIN DRAWER CRM PANEL OVERLAY */}
      <AnimatePresence>
        {showAdmin && (
          <AdminPanel 
            onClose={() => setShowAdmin(false)} 
            refreshTrigger={leadsSyncedCounter} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}

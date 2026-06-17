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
  ChevronDown
} from 'lucide-react';

import { PARTNER_GROUPS, SUPPORT_PROGRAMS, DISCOVERY_STAGES, Lead } from './types';
import LeadForm from './components/LeadForm';
import AIAssistant from './components/AIAssistant';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState('showroom');
  const [activeStage, setActiveStage] = useState(1);
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

      {/* SECTION 1: HERO - BANNER ĐẦU TRANG THEO PHONG CÁCH POSTER HOA KỲ VY CHUẨN */}
      <section className="relative pt-12 pb-24 sm:pb-36 overflow-hidden z-10 us-flag-bg" id="hero">
        
        {/* Diagonal gold lighting streaks across section background */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#020617] via-[#061B33] to-[#020617] opacity-90 -z-10" />
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[120%] bg-gradient-to-br from-transparent via-[#d4af37]/5 to-transparent rotate-12 pointer-events-none" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[120%] bg-gradient-to-tl from-transparent via-[#00D4FF]/5 to-transparent rotate-12 pointer-events-none" />
        
        {/* Soft center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column (7 of 12) */}
            <div className="lg:col-span-7 text-left space-y-8">
              
              {/* Premium Golden Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#03142d]/80 border border-[#d4af37]/45 text-amber-300 text-[11px] font-mono font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                <Sparkles className="w-4 h-4 text-[#ffd700] animate-pulse" />
                <span>RainSoft USA Since 1953 • Chuẩn Mỹ Hoàn Toàn</span>
              </div>

              {/* Majestic Metallic Heading with heavy serif/display feel */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-tight uppercase">
                <span className="text-gold-metallic block lg:inline-block">Trở thành đối tác</span><br className="hidden lg:block"/>
                <span className="text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-350 bg-clip-text">phát triển RainSoft</span> <br />
                <span className="text-[#00D4FF] text-2xl sm:text-3.5xl tracking-widest font-mono font-bold uppercase block mt-2">tại việt nam</span>
              </h1>

              {/* Hero Detailed Description */}
              <p className="text-sm sm:text-base text-[#DDEBFF]/90 leading-relaxed max-w-2xl font-normal">
                Cùng <strong className="text-white font-extrabold">SHAHA Việt Nam</strong> xây dựng thống trị thị trường lọc tổng cao cấp toàn cầu. RainSoft USA từ 1953 – thương hiệu lọc tổng xa xỉ hàng đầu thế giới, định vị cho nhóm khách hàng biệt thự, cực phẩm villa, căn hộ duplex sang trọng, và các gia đình sở hữu cuộc sống thượng đỉnh có tiêu chuẩn sinh hoạt cao nhất.
              </p>

              {/* 4 Custom Elegant Mini Badges with Thin gold Borders */}
              <div className="grid grid-cols-2 gap-3.5 max-w-xl">
                <div className="px-3.5 py-2.5 rounded-xl bg-[#03142d]/60 border border-[#d4af37]/25 flex items-center gap-2 bg-slate-950/20">
                  <span className="text-[#ffd700] text-sm font-bold">✓</span>
                  <span className="text-[11px] font-bold text-[#DDEBFF]/90 tracking-wide">Hiệu năng xử lý siêu bứt phá</span>
                </div>
                <div className="px-3.5 py-2.5 rounded-xl bg-[#03142d]/60 border border-[#d4af37]/25 flex items-center gap-2 bg-slate-950/20">
                  <span className="text-[#ffd700] text-sm font-bold">✓</span>
                  <span className="text-[11px] font-bold text-[#DDEBFF]/90 tracking-wide">Bảo hành TRỌN ĐỜI từ Hoa Kỳ</span>
                </div>
                <div className="px-3.5 py-2.5 rounded-xl bg-[#03142d]/60 border border-[#d4af37]/25 flex items-center gap-2 bg-slate-950/20">
                  <span className="text-[#ffd700] text-sm font-bold">✓</span>
                  <span className="text-[11px] font-bold text-[#DDEBFF]/90 tracking-wide">Hỗ trợ Showroom và 3D tủ mẫu</span>
                </div>
                <div className="px-3.5 py-2.5 rounded-xl bg-[#03142d]/60 border border-[#d4af37]/25 flex items-center gap-2 bg-slate-950/20">
                  <span className="text-[#ffd700] text-sm font-bold">✓</span>
                  <span className="text-[11px] font-bold text-[#DDEBFF]/90 tracking-wide">Đào tạo, Vali Test Kit thực tế</span>
                </div>
              </div>

              {/* Dual Action CTAs with metallic shine */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 max-w-md">
                <button
                  onClick={() => {
                    const el = document.getElementById('onboarding');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4.5 rounded-2xl font-display font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#fff3b0] via-[#ffd700] to-[#b8860b] hover:from-[#ffffff] hover:to-[#ffd700] text-[#020617] hover:shadow-[0_0_35px_rgba(255,215,0,0.5)] group cursor-pointer flex items-center justify-center gap-2 border border-[#ffd700]/30 transition-all btn-shine-effect"
                  id="hero-register-btn"
                >
                  Đăng ký trở thành đối tác
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#020617]" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('supports');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4.5 rounded-2xl font-display font-bold text-xs uppercase tracking-widest bg-[#03142d]/90 hover:bg-[#0b2d4d]/90 border border-[#d4af37]/35 text-[#fffcf0] hover:text-[#ffd700] hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] flex items-center justify-center gap-1.5 transition-all"
                  id="hero-docs-btn"
                >
                  Nhận bộ tài liệu hợp tác
                  <FileText className="w-4 h-4 text-[#ffd700]" />
                </button>
              </div>

            </div>

            {/* Right Pedestal Column (5 of 12) */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              
              {/* Glowing decorative halo behind product */}
              <div className="absolute w-72 h-72 bg-gradient-to-tr from-[#00D4FF]/20 via-[#0B2D4D]/10 to-[#ffd700]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Interactive Luxury 3D-effect Pedestal */}
              <div className="relative w-full max-w-sm justify-center items-center flex min-h-[420px]">
                
                {/* Metallic Gold Circular Pedestal Platform */}
                <div className="absolute bottom-6 w-72 h-32 bg-gradient-to-b from-[#0b2d4d] via-[#061b33] to-[#020617] rounded-full border-2 border-[#d4af37]/50 shadow-[0_20px_50px_rgba(0,212,255,0.4),0_0_30px_rgba(255,215,0,0.25)] flex items-center justify-center">
                  {/* Rotating neon circle lines */}
                  <div className="w-[90%] h-[85%] rounded-full border border-dashed border-[#00D4FF]/40 animate-spin-slow" />
                  <div className="absolute w-[80%] h-[75%] rounded-full border border-[#d4af37]/20" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#00D4FF]/10 rounded-full blur-lg" />
                  
                  {/* Neon Cyan Spotlights */}
                  <div className="absolute -top-1 left-1/4 w-3 h-3 bg-[#00D4FF] rounded-full blur-[1px] animate-ping" />
                  <div className="absolute -top-1 right-1/4 w-3 h-3 bg-[#00D4FF] rounded-full blur-[1px] animate-ping" style={{ animationDelay: '1.2s' }} />
                </div>

                {/* Luxury Flagship Water Treatment Softener System vector assembly */}
                <div className="relative z-10 flex items-end gap-6 pb-20 justify-center h-full">
                  
                  {/* TANK 1: Premium Softener Cylinder (Silver-platinum chrome styling) */}
                  <div className="relative w-[70px] h-[240px] rounded-full bg-gradient-to-b from-slate-100 via-slate-400 to-slate-900 border-2 border-slate-300 shadow-[0_10px_30px_rgba(0,212,255,0.3)] flex flex-col justify-between py-8 items-center transform hover:translate-y-[-5px] transition-transform duration-500">
                    {/* Real gloss reflection lines */}
                    <div className="absolute top-0 bottom-0 left-2.5 w-2 bg-white/20 blur-[0.5px]" />
                    <div className="absolute top-0 bottom-0 right-3.5 w-1 bg-black/30" />
                    
                    {/* Metallic gold plate ribbon */}
                    <div className="w-10 h-7 bg-gradient-to-r from-[#ffd700] via-[#b8860b] to-[#ffd700] rounded border border-[#fff3b0] flex items-center justify-center text-[10px] font-black text-[#020617] tracking-wider shadow">
                      USA
                    </div>

                    {/* Laser engraved certification ring */}
                    <div className="w-full h-1 bg-[#00D4FF]/80 shadow-[0_0_8px_rgba(0,212,255,0.8)]" />

                    {/* Bottom base support */}
                    <div className="w-[85%] h-3 bg-slate-950 rounded-b-full border-t border-slate-700" />
                  </div>

                  {/* EC5 Intelligent gold valve control box attached atop Tank 1 */}
                  <div className="absolute left-[20px] top-[14px] w-14 h-14 bg-slate-950 border-2 border-[#ffd700] rounded-xl flex flex-col items-center justify-between p-1.5 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                    {/* Simulated LCD Screen */}
                    <div className="w-full h-[18px] bg-cyan-950 rounded border border-cyan-500/50 flex items-center justify-center overflow-hidden">
                      <span className="text-[7px] font-mono text-[#00D4FF] tracking-wider animate-pulse font-bold">EC5 READY</span>
                    </div>
                    {/* Status grid lights */}
                    <div className="w-full flex justify-between items-center px-0.5 mt-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                      <span className="text-[6px] font-mono text-slate-400">AMER.</span>
                      <span className="w-1.5 h-1.5 bg-[#ffd700] rounded-full" />
                    </div>
                  </div>

                  {/* TANK 2: Elegant Salt Cabinet (Premium royal blue glassmorphic container) */}
                  <div className="relative w-24 h-[190px] rounded-3xl bg-gradient-to-b from-[#0b2d4d] via-[#061b33] to-[#020617] border-2 border-[#00D4FF]/40 shadow-[0_15px_35px_rgba(0,212,255,0.25)] flex flex-col items-center justify-between py-6 transform hover:translate-y-[-5px] transition-transform duration-500">
                    {/* Highlights */}
                    <div className="absolute top-0 bottom-0 left-3 w-1.5 bg-white/10 blur-[0.5px]" />
                    <div className="w-[80%] h-1 bg-[#d4af37]/30 rounded-full" />
                    
                    {/* Gold brand emblem */}
                    <div className="px-2.5 py-1 rounded-md border border-[#d4af37]/35 bg-slate-950/90 shadow-[0_0_10px_rgba(255,215,0,0.15)] flex flex-col items-center">
                      <span className="text-[7px] font-mono font-black text-[#ffd700] tracking-widest uppercase">RAINSOFT</span>
                      <span className="text-[5px] text-slate-400 uppercase scale-90">WATER TREATMENT</span>
                    </div>

                    {/* Clear-water viewing slot panel */}
                    <div className="w-1.5 h-16 bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-600 rounded-full blur-[0.5px] shadow-inner" />
                  </div>

                </div>

                {/* Sparkling gold particles and light splashes floating above platform */}
                <div className="absolute bottom-16 left-6 w-8 h-8 rounded-full bg-[#00D4FF]/25 blur-sm animate-bounce" style={{ animationDuration: '4.5s' }} />
                <div className="absolute bottom-12 right-6 w-10 h-10 rounded-full bg-[#ffd700]/15 blur-sm animate-bounce" style={{ animationDuration: '6s', animationDelay: '1.5s' }} />

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: VÌ SAO NÊN HỢP TÁC RAINSOFT? - 4 CORE VALUE WITH HIGH-END STYLE */}
      <section className="py-24 bg-[#020617] border-t border-[#d4af37]/15 z-10 relative" id="why">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section heading header */}
          <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest block">Nền tảng RainSoft Dealer</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase leading-none">
              Vì sao nên hợp tác?<br />
              <span className="text-gold-metallic text-2xl sm:text-4xl mt-3 inline-block font-sans lowercase font-normal italic tracking-wide">4 Nền Tảng Phát Triển Thượng Hạng</span>
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#ffd700] to-transparent mx-auto mt-4" />
            <p className="text-sm text-[#DDEBFF]/80 leading-relaxed mt-4 font-normal">
              Mô hình RainSoft Dealer phát huy tối đa 4 trụ cột tăng trưởng vững bền: Sản phẩm tột đỉnh, Chương trình chuyên sâu, Lợi nhuận vượt bậc và Con người đồng hành.
            </p>
          </div>

          {/* Cards Grid using genuine luxury glassmorphism and thin gold border alignments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Value 1: Product */}
            <div className="p-8 rounded-3xl border-gold-glow text-left hover:border-[#ffd700] hover:translate-y-[-8px] transition-all duration-300 relative group glow-blue flex flex-col justify-between h-full">
              <div>
                <div className="p-3 w-14 h-14 rounded-2xl bg-[#ffd700]/10 border border-[#ffd700]/25 text-[#ffd700] flex items-center justify-center shrink-0 mb-6 group-hover:bg-[#ffd700]/20 transition-all shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-black text-white tracking-wide uppercase leading-snug">
                  1. Product <span className="text-[#ffd700] font-sans font-light capitalize text-base block mt-1">Sản phẩm tột đỉnh</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#DDEBFF]/80 leading-relaxed mt-4 font-normal font-sans">
                  Thương hiệu Mỹ có bề dày từ 1953, định vị phân hiệu siêu xa xỉ độc quyền. Đạt chứng chỉ uy tín thế giới Gold Seal (WQA, NSF) cam kết bảo vệ trọn vẹn gia đình thượng lưu.
                </p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-[#ffd700] via-[#b8860b] to-[#ffd700] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute bottom-0 left-0 rounded-b-3xl" />
            </div>

            {/* Value 2: Program */}
            <div className="p-8 rounded-3xl border-gold-glow text-left hover:border-[#ffd700] hover:translate-y-[-8px] transition-all duration-300 relative group glow-blue flex flex-col justify-between h-full">
              <div>
                <div className="p-3 w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 text-[#00D4FF] flex items-center justify-center shrink-0 mb-6 group-hover:bg-indigo-500/20 transition-all shadow-[0_0_15px_rgba(0,212,255,0.1)]">
                  <Layers className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-black text-white tracking-wide uppercase leading-snug">
                  2. Program <span className="text-[#00D4FF] font-sans font-light capitalize text-base block mt-1">Hỗ trợ sâu rộng</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#DDEBFF]/80 leading-relaxed mt-4 font-normal font-sans">
                  Hệ thống đào tạo kỹ năng tư vấn khép kín, bộ tài nguyên truyền thông độc quyền, phối ghép demo vali trực quan sinh động và kịch bản marketing vùng tự động cao.
                </p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-indigo-550 to-indigo-650 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute bottom-0 left-0 rounded-b-3xl" />
            </div>

            {/* Value 3: Profit */}
            <div className="p-8 rounded-3xl border-gold-glow text-left hover:border-[#ffd700] hover:translate-y-[-8px] transition-all duration-300 relative group glow-blue flex flex-col justify-between h-full">
              <div>
                <div className="p-3 w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/25 text-purple-400 flex items-center justify-center shrink-0 mb-6 group-hover:bg-purple-500/20 transition-all">
                  <BadgeDollarSign className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-black text-white tracking-wide uppercase leading-snug">
                  3. Profit <span className="text-[#ffd700] font-sans font-light capitalize text-base block mt-1">Lợi nhuận đột phá</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#DDEBFF]/80 leading-relaxed mt-4 font-normal font-sans">
                  Sở hữu tỷ lệ chiết khấu ưu tiến cùng dòng sản phẩm giá trị đơn hàng vượt lớn, tối ưu hóa điểm số doanh thu trên từng khách gặt hái dòng tiền an tâm dồi dào.
                </p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-[#ffd700] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute bottom-0 left-0 rounded-b-3xl" />
            </div>

            {/* Value 4: People */}
            <div className="p-8 rounded-3xl border-gold-glow text-left hover:border-[#ffd700] hover:translate-y-[-8px] transition-all duration-300 relative group glow-blue flex flex-col justify-between h-full">
              <div>
                <div className="p-3 w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center shrink-0 mb-6 group-hover:bg-emerald-500/20 transition-all">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-black text-white tracking-wide uppercase leading-snug">
                  4. People <span className="text-emerald-400 font-sans font-light capitalize text-base block mt-1">Đồng hành thực chiến</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#DDEBFF]/80 leading-relaxed mt-4 font-normal font-sans">
                  Chuyên viên SHAHA Việt Nam sẵn sàng hỗ trợ trực tiếp từ đo lường mẫu nước thực nghiệm bằng vali Test Kit Hoa Kỳ, tư vấn chốt deal và tối ưu kỹ nghệ lắp đặt.
                </p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-emerald-500 to-[#ffd700] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute bottom-0 left-0 rounded-b-3xl" />
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: ĐỐI TÁC PHÙ HỢP - INTERACTIVE SEGMENT FINDER WITH GOLD GLOW STYLE */}
      <section className="py-24 bg-[#020617] border-t border-[#d4af37]/15 relative z-10" id="segments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest block">Đối tác tiềm năng</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase leading-none">
              Phân Khúc Đối Tác Phù Hợp
            </h2>
            <p className="text-sm text-[#DDEBFF]/80 leading-relaxed font-normal">
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
          
          <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest block">Hỗ trợ đối tác toàn diện</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase leading-none">
              SHAHA Việt Nam Đồng Hành Phát Triển
            </h2>
            <p className="text-sm text-[#DDEBFF]/80 leading-relaxed mt-4 font-normal">
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
          
          <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest block">Lộ trình 5 giai đoạn</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase leading-none">
              Mô Hình Đồng Hành Phát Triển
            </h2>
            <p className="text-sm text-[#DDEBFF]/80 leading-relaxed mt-4 font-normal">
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
          
          <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto font-sans">
            <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest block">Sức hút thị trường lọc tổng</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase leading-none">
              Thị Trường Đón Đầu Phân Khúc Cao Cấp
            </h2>
            <p className="text-sm text-[#DDEBFF]/80 leading-relaxed mt-4 font-normal">
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
          
          <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest block">Gia nhập Rainsoft</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase leading-none">
              Quy Trình Gia Nhập 5 Bước Thần Tốc
            </h2>
            <p className="text-sm text-[#DDEBFF]/80 leading-relaxed mt-4 font-normal">
              Quy trình thiết hướng năng lực khoa học từ lúc khai báo đến lúc showroom chính thức hoạt động gặt hái dòng tiền.
            </p>
          </div>

          {/* 5 Steps Grid timeline with custom luxury gold border styling */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto text-left relative">
            
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-[#03142d]/65 border border-[#d4af37]/25 hover:border-[#ffd700] space-y-4 relative overflow-hidden group shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-all">
              <span className="text-xs font-mono font-bold text-[#ffd700] bg-[#ffd700]/10 border border-[#ffd700]/25 w-9 h-9 rounded-xl flex items-center justify-center">
                B1
              </span>
              <h4 className="font-display font-black text-white text-base uppercase">Đăng ký thông tin</h4>
              <p className="text-xs text-[#DDEBFF]/80 leading-relaxed font-sans">
                Đăng ký trực quan thông qua form kê khai năng lực trực tuyến ngay tại chân trang này.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-[#03142d]/65 border border-[#d4af37]/25 hover:border-[#ffd700] space-y-4 relative overflow-hidden group shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-all">
              <span className="text-xs font-mono font-bold text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/25 w-9 h-9 rounded-xl flex items-center justify-center">
                B2
              </span>
              <h4 className="font-display font-black text-white text-base uppercase">Trao đổi thẩm định</h4>
              <p className="text-xs text-[#DDEBFF]/80 leading-relaxed font-sans">
                Chuyên viên SHAHA VN liên hệ đánh giá khu vực độc quyền và năng lực kỹ thuật cơ bản.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-[#03142d]/65 border border-[#d4af37]/25 hover:border-[#ffd700] space-y-4 relative overflow-hidden group shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-all">
              <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 border border-purple-500/25 w-9 h-9 rounded-xl flex items-center justify-center">
                B3
              </span>
              <h4 className="font-display font-black text-white text-base uppercase">Gặp gỡ định hướng</h4>
              <p className="text-xs text-[#DDEBFF]/80 leading-relaxed font-sans">
                Tọa đàm trực tiếp tại Trụ sở/Showroom mẫu của SHAHA xem dây chuyền thực nghiệm.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl bg-[#03142d]/65 border border-[#d4af37]/25 hover:border-[#ffd700] space-y-4 relative overflow-hidden group shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-all">
              <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 w-9 h-9 rounded-xl flex items-center justify-center">
                B4
              </span>
              <h4 className="font-display font-black text-white text-base uppercase">Thống nhất chính sách</h4>
              <p className="text-xs text-[#DDEBFF]/80 leading-relaxed font-sans">
                Ký biên bản hợp tác chính sách chiết khấu, khu vực ưu đãi và lịch khởi động.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-6 rounded-3xl bg-[#03142d]/85 border border-[#ffd700]/40 hover:border-[#ffd700] space-y-4 relative overflow-hidden group shadow-[0_0_20px_rgba(255,215,0,0.1)] transition-all glow-blue">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 w-8 h-8 rounded-lg flex items-center justify-center animate-pulse">
                B5
              </span>
              <h4 className="font-display font-black text-white text-base uppercase">Khởi động bùng nổ</h4>
              <p className="text-xs text-[#DDEBFF]/90 leading-relaxed font-sans">
                Bàn giao Brochure catalog, vali Test Kit, thi công tủ trưng bày và cấp chứng nhận chính thức.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8: REGISTER FORM WIZARD */}
      <section className="py-24 bg-[#020617] border-t border-[#d4af37]/15 relative z-10" id="onboarding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest block">Mở khóa cơ hội</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase leading-none">
              Bắt Đầu Hợp Tác RainSoft Ngay
            </h2>
            <p className="text-sm text-[#DDEBFF]/80 leading-relaxed mt-4 font-normal">
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

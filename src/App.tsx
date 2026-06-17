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
    <div className="min-h-screen bg-[#070b13] text-white font-sans relative overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Floating Pristine Water Bubble Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl text-right" />
        
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className="absolute bottom-0 bg-blue-400/10 rounded-full animate-bubble"
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

      {/* Global CSS animation injected inside React for the custom bubble flow */}
      <style>{`
        @keyframes floating-bubble {
          0% { transform: translateY(100vh) scale(0.8); opacity: 0; }
          20% { opacity: 0.6; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-20vh) scale(1.2); opacity: 0; }
        }
        .animate-bubble {
          animation-name: floating-bubble;
          animation-timing-function: linear;
        }
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.03); }
        }
        .animate-pulse-subtle {
          animation: subtle-pulse 6s infinite ease-in-out;
        }
      `}</style>

      {/* FIXED GLASS HEADER */}
      <header className="sticky top-0 z-40 bg-[#070b13]/85 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center glow-blue text-white font-bold text-lg select-none">
              R
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-display font-extrabold text-base tracking-wider text-white">SHAHA</span>
                <span className="text-[10px] font-bold font-mono text-blue-400 border border-blue-500/20 px-1 rounded">VIỆT NAM</span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider font-semibold block uppercase">Cổng Đối Tác RainSoft USA từ 1953</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#why" className="hover:text-blue-400 transition-colors">Vì sao hợp tác?</a>
            <a href="#segments" className="hover:text-blue-400 transition-colors">Đối tác phù hợp</a>
            <a href="#supports" className="hover:text-blue-400 transition-colors">SHAHA hỗ trợ</a>
            <a href="#roadmap" className="hover:text-blue-400 transition-colors">Lộ trình phát triển</a>
            <a href="#market" className="hover:text-blue-400 transition-colors">Sức hút thị trường</a>
            <a href="#onboarding" className="hover:text-blue-400 transition-colors">Ấn đăng ký</a>
          </nav>

          {/* Top CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('onboarding');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-indigo-650 to-indigo-600 hover:from-blue-500 hover:to-indigo-550 text-white shadow-xl glow-blue cursor-pointer transition-all"
              id="header-cta-btn"
            >
              Đăng Ký Đai Lý
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
            <div className="p-4 rounded-2xl glass-effect border border-emerald-500/30 flex items-start gap-3.5 bg-slate-900/90 text-white shadow-2xl glow-blue">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <CheckCircle2 className="w-5 h-5 animate-bounce" />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase tracking-wider">Hợp Tác Đối Tác Ghi Nhận</span>
                <p className="text-sm font-semibold text-white">Chào đón: {latestRegistrantName}!</p>
                <p className="text-xs text-slate-400">Một chuyên viên SHAHA Việt Nam đã được kết nối để liên hệ trực tiếp cho bạn qua cuộc gọi.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO - BANNER ĐẦU TRANG */}
      <section className="relative pt-12 pb-20 sm:pb-32 overflow-hidden z-10" id="hero">
        
        {/* Subtle decorative glowing background patterns */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

        <div className="max-w-5xl mx-auto px-4 text-center space-y-8 relative">
          
          {/* Subheader Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/15 text-blue-400 text-xs font-mono font-medium tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
            Hệ thống lọc nước cao cấp nhập khẩu Hoa Kỳ từ 1953
          </div>

          {/* Majestic Heading */}
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight leading-tight sm:leading-none">
            Trở Thành Đối Tác Phát Triển <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-white bg-clip-text text-transparent">
              RainSoft USA Tại Việt Nam
            </span>
          </h1>

          {/* Hero Subtitle Content */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Cùng <strong className="text-white font-semibold">SHAHA Việt Nam</strong> xây dựng thống trị thị trường lọc tổng cao cấp toàn diện. RainSoft USA (thành lập từ 1953) – thương hiệu lọc tổng xa xỉ hàng đầu, định vị cho nhóm khách hàng biệt thự, villa cao cấp, lầu penthouse sang trọng, và các gia đình có tiêu chuẩn sống khắt khe nhất về nguồn nước mượt mà.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-xs sm:max-w-md mx-auto">
            <button
              onClick={() => {
                const el = document.getElementById('onboarding');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full px-8 py-4 rounded-2xl font-bold bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500 text-white shadow-2xl glow-blue-strong group cursor-pointer flex items-center justify-center gap-2 transform hover:scale-103 transition-all"
              id="hero-register-btn"
            >
              Đăng ký trở thành đối tác
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={() => {
                // Focus step 4 (needs selection) inside register form or scroll to support programs
                const el = document.getElementById('supports');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full px-8 py-4 rounded-2xl font-bold bg-[#0f172a]/80 hover:bg-[#1e293b]/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all text-sm cursor-pointer"
              id="hero-docs-btn"
            >
              Xem bộ tài liệu hỗ trợ
              <FileText className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Highlights Mini Grid Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 border-t border-slate-900 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-[#0f172a]/30 border border-slate-900 text-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-medium">Bảo Hành Thượng Lưu</span>
              <span className="text-lg font-bold text-white mt-1 block">Bảo Hành TRỌN ĐỜI Cam Kết</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0f172a]/30 border border-slate-900 text-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-medium">Hỗ Trợ Triển Khai</span>
              <span className="text-lg font-bold text-white mt-1 block">Tặng Vali Demo Test Kit Mỹ</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0f172a]/30 border border-slate-900 text-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-medium">Đồng Hành Thực Chiến</span>
              <span className="text-lg font-bold text-white mt-1 block">Hỗ Trợ Chốt 5 Đơn Đầu</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: VÌ SAO NÊN HỢP TÁC RAINSOFT? - 4 CORE VALUE */}
      <section className="py-20 bg-[#060910] border-t border-slate-900 z-10 relative" id="why">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section heading header */}
          <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block">Nền tảng RainSoft Dealer</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              4 Giá Trị Cốt Lõi Vững Bền
            </h2>
            <p className="text-sm text-slate-400">
              SHAHA Việt Nam bản địa hóa sâu sắc mô hình dịch vụ lọc nước hàng đầu nước Mỹ để đối tác dễ dàng chinh phục tệp khách hàng luxury.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Value 1: Product */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-left hover:border-blue-500/50 duration-300 relative group glow-blue transition-all">
              <div className="p-3 w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white tracking-wide">1. Product – Sản Phẩm Cao Cấp</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-3">
                Thương hiệu Mỹ thành cổ từ 1953, lịch sử lâu đời 70 năm, định vị tuyệt đối phân khúc siêu sang. Đạt toàn diện chứng nhận quốc tế Gold Seal danh giá (WQA, NSF) bảo vệ 100% ngôi nhà.
              </p>
              <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute bottom-0 left-0 rounded-b-2xl" />
            </div>

            {/* Value 2: Program */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-left hover:border-indigo-500/50 duration-300 relative group glow-blue transition-all">
              <div className="p-3 w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white tracking-wide">2. Program – Chuyển Giao</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-3">
                Hệ thống tập huấn bán hàng độc quyền, demo thử nước trực quang, quy trình khảo sát đường ống tỉ mỉ, báo giá, thuyết trình biệt quyền và kịch bản CSKH tự động.
              </p>
              <div className="w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute bottom-0 left-0 rounded-b-2xl" />
            </div>

            {/* Value 3: Profit */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-left hover:border-purple-500/50 duration-300 relative group glow-blue transition-all">
              <div className="p-3 w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mb-5">
                <BadgeDollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white tracking-wide">3. Profit – Biên Lợi Nhuận</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-3">
                Không giống lọc nước sinh hoạt thông thường giá rẻ, dòng lọc tổng biệt thự mang về mức chiết khấu cực kỳ lớn trên mỗi thương vụ lớn, bảo vệ doanh số dịch vụ thay hạt trọn đời.
              </p>
              <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute bottom-0 left-0 rounded-b-2xl" />
            </div>

            {/* Value 4: People */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-left hover:border-emerald-500/50 duration-300 relative group glow-blue transition-all">
              <div className="p-3 w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white tracking-wide">4. People – Đồng Hành</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-3">
                Đối tác không đi lẻ bóng. Đội ngũ chuyên gia SHAHA VN hỗ trợ đồng hành trực tiếp từ khảo sát công trình thực tế, thực hành vali test nước và xử lý sự cố.
              </p>
              <div className="w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute bottom-0 left-0 rounded-b-2xl" />
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: ĐỐI TÁC PHÙ HỢP - INTERACTIVE SEGMENT FINDER */}
      <section className="py-20 bg-[#070b13] border-t border-slate-900 relative z-10" id="segments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block">Đối tác tiềm năng</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Phân Khúc Đối Tác Phù Hợp
            </h2>
            <p className="text-sm text-slate-400">
              Hãy lựa chọn mô hình định hình kinh doanh chính của bạn để khám phá tiềm lực cơ hội và dự phóng tiềm năng doanh số.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
            {PARTNER_GROUPS.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveTab(g.id)}
                className={`px-4.5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-350 flex items-center gap-2 border cursor-pointer ${
                  activeTab === g.id 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-xl glow-blue' 
                    : 'bg-[#0f172a]/50 border-slate-800 text-slate-400 hover:text-white hover:bg-[#1e293b]/50'
                }`}
                id={`segment-tab-${g.id}`}
              >
                {g.id === 'showroom' && <Store className="w-4 h-4" />}
                {g.id === 'mep' && <TrendingUp className="w-4 h-4" />}
                {g.id === 'architect' && <Briefcase className="w-4 h-4" />}
                {g.id === 'contractor' && <Layers className="w-4 h-4" />}
                {g.id === 'entrepreneur' && <Users className="w-4 h-4" />}
                {g.title.split(' ')[0]} {/* Grab first word or similar */}
                <span className="hidden sm:inline">{g.title.substring(g.title.indexOf(' '))}</span>
              </button>
            ))}
          </div>

          {/* Tab Frame Contents */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 rounded-3xl p-6 sm:p-10 bg-slate-900/30 border border-slate-800 relative overflow-hidden"
              id="segment-content-display"
            >
              {/* Absolutes and Glows inside segment card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Left Column (3 of 5) - Text details */}
              <div className="lg:col-span-3 space-y-6 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">{currentGroup.tagline}</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">{currentGroup.title}</h3>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {currentGroup.description}
                </p>

                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-400 block uppercase font-mono tracking-wider">Tệp Khách Hàng Khách Hướng Đến:</span>
                  <div className="flex flex-wrap gap-2">
                    {currentGroup.audience.map((aud, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-semibold text-indigo-400 block uppercase font-mono tracking-wider">Cơ Hội Tiếp Cận Ngành:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentGroup.opportunity}</p>
                </div>
              </div>

              {/* Right Column (2 of 5) - ROI Simulator highlight */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between text-left h-full">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-500 uppercase">
                    <TrendingUp className="w-4 h-4 animate-bounce" />
                    Dự Phóng Doanh Thu Thượng Hạng
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-wide">Lợi Thế Tài Chính Dự Kiến</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Mô hình lọc nước trung tâm RainSoft có trị giá cao giúp đối tác tối ưu hóa điểm số dòng tiền trung bình trên một khách hàng một cách thần tốc.
                  </p>
                </div>

                <div className="my-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-slate-200">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Mô Phỏng Doanh Số Đối Tác Thành Công:</span>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 italic leading-relaxed">
                    "{currentGroup.roiExample}"
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('onboarding');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg glow-blue"
                >
                  Yêu cầu liên hệ và nhận báo giá chính sách
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* SECTION 4: SHAHA VIỆT NAM HỖ TRỢ ĐỐI TÁC NHỮNG GÌ? */}
      <section className="py-20 bg-[#060910] border-t border-slate-900 relative z-10" id="supports">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block">Hỗ trợ đối tác toàn diện</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              SHAHA Việt Nam Đồng Hành Đào Tạo
            </h2>
            <p className="text-sm text-slate-400">
              Chúng tôi dẹp bỏ rào cản bước vào ngành hàng luxury bằng hệ thống chuyển giao kỹ nghệ trọn gói, chuyên nghiệp và thực chiến 100%.
            </p>
          </div>

          {/* Supports Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUPPORT_PROGRAMS.map((prog, index) => {
              return (
                <div 
                  key={prog.id}
                  className="p-6 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/50 duration-300 text-left flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3.5">
                      <span className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        0{index + 1}
                      </span>
                      <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">{prog.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-1"/>
                    <p className="text-xs text-slate-400 leading-relaxed">{prog.description}</p>
                  </div>

                  <ul className="mt-5 space-y-2 pt-4 border-t border-slate-900 text-[11px] sm:text-xs">
                    {prog.items.map((it, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-350">
                        <span className="text-blue-500 font-bold shrink-0 mt-0.5">•</span>
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
      <section className="py-20 bg-[#070b13] border-t border-slate-900 relative z-10" id="roadmap">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block">Lộ trình 5 giai đoạn</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Mô Hình Phát Triển Cùng Đại Lý
            </h2>
            <p className="text-sm text-slate-400">
              Lộ trình đồng hành từng bước loại bỏ rủi to, xây dựng năng lực bán hàng tự thân, mở rộng mạng lưới phân phối vùng tối ưu nhất.
            </p>
          </div>

          {/* Stepper buttons timeline line */}
          <div className="relative max-w-4xl mx-auto mb-12">
            
            {/* The horizontal track (hidden on small viewports) */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-900 -translate-y-1/2 hidden md:block" />

            {/* Stepper buttons list */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
              {DISCOVERY_STAGES.map((stg) => {
                const isActive = activeStage === stg.phase;
                return (
                  <button
                    key={stg.phase}
                    onClick={() => setActiveStage(stg.phase)}
                    className="z-10 flex flex-row md:flex-col items-center gap-3 md:gap-2.5 bg-slate-950 px-4 py-2.5 md:py-0 md:px-0 rounded-xl md:bg-transparent border md:border-0 border-slate-900 md:w-auto w-full text-left md:text-center cursor-pointer select-none"
                    id={`roadmap-stage-btn-${stg.phase}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border ${
                      isActive 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg glow-blue scale-110' 
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}>
                      {stg.phase}
                    </div>
                    <div>
                      <span className={`text-xs block font-bold transition-colors ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>Giai đoạn {stg.phase}</span>
                      <span className={`text-xs font-semibold block sm:hidden md:block text-slate-300`}>{stg.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Stage Detail Display Frame */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto rounded-2xl p-6 sm:p-8 bg-slate-900/30 border border-slate-800 flex flex-col md:flex-row gap-6 sm:gap-10 text-left relative overflow-hidden"
              id="roadmap-stage-display-card"
            >
              {/* Glow badge Phase */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 md:w-7/12">
                <span className="text-[10px] font-mono font-bold text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full bg-blue-500/5 uppercase tracking-wider">
                  Giai đoạn 0{currentStage.phase} • {currentStage.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide">{currentStage.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{currentStage.description}</p>
                
                <div className="pt-4 flex items-center gap-4 text-xs font-semibold">
                  <span className="text-slate-400">Trạng thái đồng hành:</span>
                  <span className="text-blue-400 flex items-center gap-1.5 font-mono">
                    <Clock className="w-4 h-4 animate-spin-slow text-blue-500" />
                    Chuyên gia hỗ trợ 100%
                  </span>
                </div>
              </div>

              {/* Deliverable checklists list */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/85 md:w-5/12 flex flex-col justify-center">
                <span className="text-[10px] font-mono text-slate-500 tracking-widest font-bold uppercase block mb-3.5 border-b border-slate-900 pb-1.5">Kết Quả Đạt Được:</span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {currentStage.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-indigo-400 font-bold shrink-0">✔</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* SECTION 6: LÝ DO THỊ TRƯỜNG ĐANG CẦN RAINSOFT - WATER COMPARISON TABLE */}
      <section className="py-20 bg-[#060910] border-t border-slate-900 relative z-10 animate-fade-in" id="market">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block">Sức hút thị trường lọc tổng</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Thị Trường Đón Đầu Lọc Lọc Cao Cấp
            </h2>
            <p className="text-sm text-slate-400">
              Lọc thô tại vòi hay lọc nước uống nhỏ giọt chỉ xử lý ngọn. Giới biệt thự cao cấp đòi hỏi nguồn nước mềm trung tâm bảo vệ trọn vẹn sức khỏe sinh hoạt lâu năm.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center max-w-5xl mx-auto">
            
            {/* Left 2 segments: Text insights */}
            <div className="lg:col-span-2 space-y-5 text-left text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-[#0f172a]/20 border border-slate-900 space-y-2">
                <h4 className="font-extrabold text-blue-300 font-display text-sm tracking-wide">1. Trọn Vẹn Thiết Bị Được Bảo Vệ</h4>
                <p className="text-slate-400 leading-relaxed text-xs">
                  Thiết bị vệ sinh Luxury mạ vàng, bồn sục jacuzi đắt đỏ, máy sưởi nước, bình năng lượng mặt trời nhập khẩu châu Âu cực kỳ dễ bị hoen hoen phá hủy bởi cặn độ cứng (CaCO3). Thiết bị sau 1-2 năm sử dụng bị bám mảng bám vĩnh viễn nếu không làm mềm bằng lọc tổng RainSoft.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0f172a]/20 border border-slate-900 space-y-2">
                <h4 className="font-extrabold text-indigo-300 font-display text-sm tracking-wide">2. Gia Đình Thượng Lưu Sẵn Sàng Đầu Tư</h4>
                <p className="text-slate-400 leading-relaxed text-xs">
                  Tệp khách biệt thự sẵn sàng đầu tư 150 triệu - 450 triệu VNĐ nếu được cung cấp dữ liệu nước thực tiễn từ vali Test Kit và được cố vấn đúng bản chất công nghệ.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0f172a]/20 border border-slate-900 space-y-2">
                <h4 className="font-extrabold text-emerald-300 font-display text-sm tracking-wide">3. Gia tăng danh mục sản phẩm giá trị</h4>
                <p className="text-slate-400 leading-relaxed text-xs">
                  Cộng hưởng ngay vào các dòng thiết bị sẵn có của đối tác (bếp nhập, MEP, smarthome, thiết kế...), mở khóa dòng lợi nhuận ròng to lớn mà không tốn chi phí rủi ro mới.
                </p>
              </div>
            </div>

            {/* Right 3 segments: Point filtration vs RainSoft comparison visual */}
            <div className="lg:col-span-3 p-5 sm:p-7 rounded-2xl bg-slate-900/40 border border-slate-800 text-left">
              <h4 className="text-base font-bold font-display text-white tracking-wide border-b border-slate-800 pb-3 mb-4">
                Sự Khác Biệt Giữa Lọc Tổng RainSoft vs Điểm Lọc Thủ Công
              </h4>

              <div className="space-y-4">
                
                {/* Point filtering */}
                <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-900">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                    <span>LỌC VÒI TRUYỀN THỐNG / LỌC BẾP (POINT OF USE)</span>
                    <span className="text-red-400 font-mono">Chỉ lọc ăn uống</span>
                  </div>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-slate-400 leading-relaxed">
                    <li className="flex items-start gap-1">
                      <span className="text-red-500 font-bold shrink-0">✘</span>
                      <span>Chỉ bảo vệ được 1 điểm dùng nhỏ tại bếp ăn, chất lượng nước sinh hoạt tắm giặt hoàn toàn bị bỏ ngỏ.</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-red-500 font-bold shrink-0">✘</span>
                      <span>Không triệt tiêu được cặn canxi vôi, khiến vách kính tắm hoen ố bám bẩn gỉ sét chỉ sau vài tháng.</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-red-500 font-bold shrink-0">✘</span>
                      <span>Tuổi thọ lõi cực ngắn, thường xuyên hỏng hóc làm gián đoạn sinh hoạt gia đình biệt thự.</span>
                    </li>
                  </ul>
                </div>

                {/* RainSoft Premium */}
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-white shadow-xl glow-blue">
                  <div className="flex justify-between items-center text-xs text-blue-400 font-bold">
                    <span>HỆ THỐNG LỌC TỔNG TRUNG TÂM RAINSOFT (WHOLE HOUSE)</span>
                    <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Giải pháp cao cấp nhất
                    </span>
                  </div>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-slate-350 leading-relaxed">
                    <li className="flex items-start gap-1 text-white">
                      <span className="text-emerald-400 font-bold shrink-0">✔</span>
                      <span>Lọc làm mềm chảy mượt toàn ngôi nhà, chăm sóc mịn màn làn da bé yêu, cho tóc mượt mịn khi tắm giặt.</span>
                    </li>
                    <li className="flex items-start gap-1 text-white">
                      <span className="text-emerald-400 font-bold shrink-0">✔</span>
                      <span>Bảo vệ 100% tài sản sứ tắm, đá tự nhiên nhập khẩu châu Âu, bồn jacuzi và các đường máy sưởi sang.</span>
                    </li>
                    <li className="flex items-start gap-1 text-white">
                      <span className="text-emerald-400 font-bold shrink-0">✔</span>
                      <span>Van EC5 cảm ứng thông minh hoàn nguyên tiết kiệm nước, bảo hành TRỌN ĐỜI trực tiếp từ Mỹ.</span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: QUY TRÌNH TRỞ THÀNH ĐỐI TÁC */}
      <section className="py-20 bg-[#070b13] border-t border-slate-900 relative z-10" id="roadmap-steps">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block">Gia nhập Rainsoft</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Quy Trình Gia Nhập 5 Bước Thần Tốc
            </h2>
            <p className="text-sm text-slate-400">
              Quy trình thiết hướng năng lực khoa học từ lúc khai báo đến lúc showroom chính thức hoạt động gặt hái dòng tiền.
            </p>
          </div>

          {/* 5 Steps Grid timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto text-left relative">
            
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-900/20 border border-slate-900 space-y-3 relative overflow-hidden group">
              <span className="text-xs font-mono font-bold text-blue-500 bg-blue-500/10 border border-blue-500/20 w-8 h-8 rounded-lg flex items-center justify-center">
                B1
              </span>
              <h4 className="font-extrabold text-white text-sm">Đăng ký thông tin</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Đăng ký trực quan thông qua form kê khai năng lực trực tuyến ngay tại chân trang này.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-900/20 border border-slate-900 space-y-3 relative overflow-hidden group">
              <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-500/10 border border-indigo-500/20 w-8 h-8 rounded-lg flex items-center justify-center">
                B2
              </span>
              <h4 className="font-extrabold text-white text-sm">Trao đổi thẩm định</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Chuyên viên SHAHA VN liên hệ đánh giá khu vực độc quyền và năng lực kỹ thuật cơ bản.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-900/20 border border-slate-900 space-y-3 relative overflow-hidden group">
              <span className="text-xs font-mono font-bold text-purple-500 bg-purple-500/10 border border-purple-500/20 w-8 h-8 rounded-lg flex items-center justify-center">
                B3
              </span>
              <h4 className="font-extrabold text-white text-sm">Gặp gỡ định hướng</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tọa đàm trực tiếp tại Trụ sở/Showroom mẫu của SHAHA xem dây chuyền thực nghiệm.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-slate-900/20 border border-slate-900 space-y-3 relative overflow-hidden group">
              <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 w-8 h-8 rounded-lg flex items-center justify-center">
                B4
              </span>
              <h4 className="font-extrabold text-white text-sm">Thống nhất chính sách</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ký biên bản hợp tác chính sách chiết khấu, khu vực ưu đãi và lịch khởi động.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-3 relative overflow-hidden group glow-blue">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 w-8 h-8 rounded-lg flex items-center justify-center">
                B5
              </span>
              <h4 className="font-extrabold text-white text-sm">Khởi động bùng nổ</h4>
              <p className="text-xs text-slate-350 leading-relaxed">
                Bàn giao Brochure catalog, vali Test Kit, thi công tủ trưng bày và cấp chứng nhận chính thức.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8: REGISTER FORM WIZARD */}
      <section className="py-20 bg-gradient-to-b from-[#070b13] via-[#0b101d] to-[#070b13] border-t border-slate-900 relative z-10" id="onboarding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block">Mở khóa cơ hội</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Bắt Đầu Hợp Tác RainSoft Ngay
            </h2>
            <p className="text-sm text-slate-400">
              Điền nhanh các thông tin năng lực dưới để chuyên viên SHAHA Việt Nam chuẩn bị các mẫu hồ sơ dự án tốt nhất trước khi gọi điện liên hệ cho bạn.
            </p>
          </div>

          {/* Render Step-by-step Form */}
          <LeadForm onSuccess={handleLeadSuccess} />

        </div>
      </section>

      {/* FLOATING CHAT ASSISTANT WIDGET */}
      <AIAssistant />

      {/* FOOTER & ADMIN PORTAL ENTRY TRIGGER */}
      <footer className="bg-slate-950 border-t border-slate-900/60 py-12 relative z-10 text-xs sm:text-sm text-slate-450 text-center text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Top segment: brand and support disclaimer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-indigo-950/20 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center font-bold text-white text-base">
                S
              </div>
              <div className="text-left leading-tight">
                <span className="font-semibold text-white tracking-wide block text-sm">SHAHA VIỆT NAM</span>
                <span className="text-[10px] text-slate-550 block font-mono">Nhà phân phối ủy quyền RainSoft USA</span>
              </div>
            </div>

            <div className="text-slate-400 text-xs text-left sm:text-right max-w-md">
              Hệ thống lọc toàn nhà thương hiệu RainSoft Hoa Kỳ uy tín số 1 thế giới từ 1953 được nhập khẩu nguyên chiếc và bảo hành cam kết chuẩn quốc tế bởi SHAHA Việt Nam.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-slate-500 font-mono">
              © {new Date().getFullYear()} SHAHA Vietnam Inc. Bảo lưu mọi quyền đối tác. | Phát hành năm 2026.
            </p>

            <div className="flex items-center gap-4">
              <a href="#why" className="hover:text-slate-400 transition-colors">Điều khoản hợp tác</a>
              <span className="text-slate-800">|</span>
              <a href="#market" className="hover:text-slate-400 transition-colors">Chính sách bảo mật</a>
              <span className="text-slate-800">|</span>
              
              {/* ADMIN CRM PANEL PORTAL TOGGLE TRIGGER BUTTON */}
              <button
                onClick={() => setShowAdmin(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/40 text-blue-400 hover:text-blue-300 hover:border-blue-500/30 border border-indigo-950 duration-200 cursor-pointer font-mono text-[11px]"
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

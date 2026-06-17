import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Phone, 
  Building2, 
  MapPin, 
  Users, 
  Store, 
  Wrench, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  FileText, 
  MessageSquare, 
  GraduationCap, 
  ShieldCheck 
} from 'lucide-react';
import { Lead } from '../types';

interface LeadFormProps {
  onSuccess: (lead: Lead) => void;
}

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successLead, setSuccessLead] = useState<Lead | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    companyName: '',
    bizLector: '',
    region: '',
    partnerGroup: 'showroom',
    hasShowroom: false,
    hasTechTeam: false,
    currentCustomers: '',
    needs: [] as string[]
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: 'hasShowroom' | 'hasTechTeam', value: boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNeedToggle = (need: string) => {
    setFormData(prev => {
      const alreadySelected = prev.needs.includes(need);
      const updated = alreadySelected 
        ? prev.needs.filter(n => n !== need) 
        : [...prev.needs, need];
      return { ...prev, needs: updated };
    });
  };

  const validateStep = () => {
    setError(null);
    if (step === 1) {
      if (!formData.fullName.trim()) {
        setError('Vui lòng nhập họ và tên của bạn.');
        return false;
      }
      if (!formData.phone.trim()) {
        setError('Vui lòng nhập số điện thoại liên hệ.');
        return false;
      }
      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
      if (!phoneRegex.test(formData.phone.trim().replace(/\s+/g, ''))) {
        setError('Số điện thoại không hợp lệ (độ dài 10 số, đầu số Việt Nam).');
        return false;
      }
    } else if (step === 2) {
      if (!formData.region.trim()) {
        setError('Vui lòng cho biết tỉnh thành/khu vực bạn muốn đồng hành phát triển.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setError(null);
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Có lỗi xảy ra khi gửi dữ liệu.');
      }

      const savedLead: Lead = await response.json();
      setSuccessLead(savedLead);
      onSuccess(savedLead);
    } catch (err: any) {
      setError(err.message || 'Mất kết nối mạng. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const partnerTypes_Vietnamese = [
    { value: 'showroom', label: 'Showroom nội thất / thiết bị cao cấp' },
    { value: 'mep', label: 'Nhà thầu MEP / Xử lý nước cơ điện' },
    { value: 'architect', label: 'Kiến trúc sư / Thiết kế nội thất' },
    { value: 'contractor', label: 'Tổng thầu / Nhà thầu hoàn thiện' },
    { value: 'entrepreneur', label: 'Doanh nhân muốn mở ngành độc lập' }
  ];

  const needs_Vietnamese = [
    { value: 'document', label: 'Nhận trọn bộ tài liệu chi tiết sản phẩm & Brochure', icon: FileText },
    { value: 'consult', label: 'Yêu cầu chuyên gia SHAHA gọi điện tư vấn 1-1', icon: MessageSquare },
    { value: 'demotraining', label: 'Đăng ký đào tạo thực chiến Test Kit thử nước', icon: GraduationCap },
    { value: 'policy', label: 'Nhận bảng chính sách chiết khấu & hỗ trợ Showroom', icon: ShieldCheck }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl p-[1px] bg-gradient-to-r from-[#d4af37]/40 via-[#ffd700] to-[#b8860b]/40 overflow-hidden shadow-2xl">
      <div className="w-full bg-[#03142d]/95 backdrop-blur-2xl rounded-[22px] p-6 sm:p-10 text-white relative">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#ffd700]/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#00D4FF]/5 rounded-full blur-2xl" />

        <AnimatePresence mode="wait">
          {!successLead ? (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10" id="partner-reg-form">
              {/* Header Title */}
              <div className="text-center space-y-3 mb-8">
                <span className="text-xs font-mono font-bold py-1 px-3 bg-[#ffd700]/10 text-[#ffd700] rounded-full border border-[#ffd700]/20 tracking-wider uppercase">
                  Bước {step} / 4: {step === 1 ? 'Thông Tin Liên Hệ' : step === 2 ? 'Lĩnh Vực Hoạt Động' : step === 3 ? 'Năng Lực Quy Mô' : 'Nhu Cầu Hợp Tác'}
                </span>
                <h3 className="text-2xl font-display font-black tracking-tight text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text uppercase">
                  Đăng Ký Hợp Tác Với RainSoft
                </h3>
                <p className="text-xs text-[#DDEBFF]/80">
                  Hãy điền các thông tin cơ bản để chúng tôi thiết lập cơ chế đặc quyền phù hợp.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden mb-6">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#ffd700] via-[#fff3b0] to-[#b8860b]"
                  initial={{ width: '25%' }}
                  animate={{ width: `${step * 25}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}

              {/* Form Content Steps */}
              <div className="min-h-[250px]">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#DDEBFF] flex items-center gap-2">
                        <User className="w-4 h-4 text-[#ffd700]" />
                        Họ và tên của bạn <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleTextChange}
                        placeholder="Ví dụ: Nguyễn Văn Hải"
                        className="w-full bg-[#020617] border border-[#d4af37]/35 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]/20 transition-all text-sm font-sans"
                        required
                        id="form-full-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#DDEBFF] flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#ffd700]" />
                        Số điện thoại liên hệ <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleTextChange}
                        placeholder="Ví dụ: 0912345678"
                        className="w-full bg-[#020617] border border-[#d4af37]/35 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]/20 transition-all text-sm font-sans"
                        required
                        id="form-phone"
                      />
                      <span className="text-[10px] text-slate-400 block font-sans">Số điện thoại dùng để kết nối Zalo gửi file và Brochure hỗ trợ.</span>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#DDEBFF] flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#ffd700]" />
                        Tên Công ty / Thương hiệu (nếu có)
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleTextChange}
                        placeholder="Ví dụ: Cty Thiết Kế KĐéc / Showroom Hải Nam"
                        className="w-full bg-[#020617] border border-[#d4af37]/35 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]/20 transition-all text-sm font-sans"
                        id="form-company-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#DDEBFF] flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#ffd700]" />
                        Nhóm đối tác phù hợp nhất <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="partnerGroup"
                        value={formData.partnerGroup}
                        onChange={handleTextChange}
                        className="w-full bg-[#020617] border border-[#d4af37]/35 rounded-xl px-4 py-3 text-white outline-none focus:border-[#ffd700] transition-all text-sm appearance-none font-sans"
                        id="form-partner-group"
                      >
                        {partnerTypes_Vietnamese.map(t => (
                          <option key={t.value} value={t.value} className="bg-[#020617] text-white py-2">
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#DDEBFF] flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#ffd700]" />
                        Khu vực bạn muốn phát triển thị trường <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="region"
                        value={formData.region}
                        onChange={handleTextChange}
                        placeholder="Ví dụ: Hà Nội, Hải Phòng, Quảng Ninh..."
                        className="w-full bg-[#020617] border border-[#d4af37]/35 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]/20 transition-all text-sm font-sans"
                        required
                        id="form-region"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Showroom toggle card */}
                      <button
                        type="button"
                        onClick={() => handleCheckboxChange('hasShowroom', !formData.hasShowroom)}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-3 text-center transition-all cursor-pointer ${
                          formData.hasShowroom 
                            ? 'bg-[#ffd700]/10 border-[#ffd700] text-white shadow-[0_0_20px_rgba(255,215,0,0.15)]' 
                            : 'bg-[#020617]/50 border-[#d4af37]/20 text-slate-400 hover:border-[#ffd700]/40'
                        }`}
                        id="form-has-showroom-btn"
                      >
                        <Store className={`w-8 h-8 ${formData.hasShowroom ? 'text-[#ffd700]' : 'text-slate-500'}`} />
                        <div>
                          <p className="text-sm font-semibold text-white">Bạn đã có Showroom chưa?</p>
                          <p className="text-xs text-slate-400 mt-1">Đã có mặt bằng trưng bày sản phẩm thực tế</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${formData.hasShowroom ? 'bg-[#ffd700]/20 text-[#ffd700]' : 'bg-[#020617] text-slate-400 border border-slate-800'}`}>
                          {formData.hasShowroom ? 'Đã có Showroom' : 'Chưa có / Đang xem xét'}
                        </span>
                      </button>

                      {/* Technical team toggle card */}
                      <button
                        type="button"
                        onClick={() => handleCheckboxChange('hasTechTeam', !formData.hasTechTeam)}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-3 text-center transition-all cursor-pointer ${
                          formData.hasTechTeam 
                            ? 'bg-[#ffd700]/10 border-[#ffd700] text-white shadow-[0_0_20px_rgba(255,215,0,0.15)]' 
                            : 'bg-[#020617]/50 border-[#d4af37]/20 text-slate-400 hover:border-[#ffd700]/40'
                        }`}
                        id="form-has-tech-team-btn"
                      >
                        <Wrench className={`w-8 h-8 ${formData.hasTechTeam ? 'text-[#ffd700]' : 'text-slate-500'}`} />
                        <div>
                          <p className="text-sm font-semibold text-white">Bạn đã có đội Kỹ thuật chưa?</p>
                          <p className="text-xs text-slate-400 mt-1">Sẵn sàng lắp đặt, bảo hành đường ống nước</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${formData.hasTechTeam ? 'bg-[#ffd700]/20 text-[#ffd700]' : 'bg-[#020617] text-slate-400 border border-slate-800'}`}>
                          {formData.hasTechTeam ? 'Đã có đội kỹ thuật' : 'Chưa có (SHAHA hỗ trợ)'}
                        </span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#DDEBFF]">
                        Mô tả sơ bộ tệp khách hàng hiện tại của bạn
                      </label>
                      <textarea
                        name="currentCustomers"
                        value={formData.currentCustomers}
                        onChange={handleTextChange}
                        placeholder="Ví dụ: Đang phục vụ khoảng 150 khách xây biệt thự/năm, tệp khách MEP chung cư cao cấp..."
                        rows={3}
                        className="w-full bg-[#020617] border border-[#d4af37]/35 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]/20 transition-all text-sm resize-none font-sans"
                        id="form-current-customers"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <label className="text-sm font-semibold text-[#DDEBFF] block mb-2">
                      Chọn các hạng mục tài liệu và sự hỗ trợ bạn muốn nhận ngay:
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {needs_Vietnamese.map(n => {
                        const IconComponent = n.icon;
                        const isSelected = formData.needs.includes(n.value);
                        return (
                          <button
                            key={n.value}
                            type="button"
                            onClick={() => handleNeedToggle(n.value)}
                            className={`p-3.5 rounded-xl border flex items-center gap-3.5 text-left transition-all cursor-pointer ${
                              isSelected 
                                ? 'bg-[#ffd700]/10 border-[#ffd700] text-white shadow-[0_0_15px_rgba(255,215,0,0.1)]' 
                                : 'bg-[#020617]/50 border-slate-800 text-slate-300 hover:border-[#ffd700]/30'
                            }`}
                            id={`form-need-btn-${n.value}`}
                          >
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#ffd700]/20 text-[#ffd700]' : 'bg-[#020617] text-slate-500'}`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-semibold flex-1">{n.label}</span>
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              isSelected ? 'bg-[#ffd700] border-[#ffd700] text-slate-900' : 'border-slate-700 bg-[#020617]'
                            }`}>
                              {isSelected && <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800/80">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-[#d4af37]/35 text-slate-300 hover:bg-[#ffd700]/5 hover:text-white transition-all cursor-pointer"
                    id="form-prev-btn"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Quay lại
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#ffd700] via-[#fff3b0] to-[#b8860b] text-slate-950 shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:scale-102 transition-all ml-auto cursor-pointer"
                    id="form-next-btn"
                  >
                    Tiếp tục
                    <ChevronRight className="w-4 h-4 text-slate-950" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-black bg-gradient-to-r from-[#ffd700] via-[#fff3b0] to-[#b8860b] text-slate-950 shadow-[0_0_25px_rgba(255,215,0,0.3)] hover:scale-102 hover:brightness-110 transition-all ml-auto cursor-pointer disabled:opacity-50"
                    id="form-submit-btn"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        Gửi thông tin hợp tác
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-6 relative z-10"
              id="form-success-container"
            >
              <div className="w-20 h-20 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-full flex items-center justify-center mx-auto text-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                <CheckCircle2 className="w-12 h-12 stroke-[1.5]" />
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl font-display font-black text-transparent bg-gradient-to-r from-white via-[#fff3b0] to-[#ffd700] bg-clip-text tracking-tight uppercase">
                  Đăng Ký Thành Công!
                </h3>
                <p className="text-[#ffd700] font-semibold text-sm">
                  Cảm ơn đối tác {successLead.fullName} đã tin chọn đồng hành cùng SHAHA.
                </p>
                <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#020617]/80 border border-[#d4af37]/35 text-slate-300 text-sm leading-relaxed mt-4">
                  Một chuyên viên phát triển đối tác cấp cao của <span className="text-[#ffd700] font-bold">SHAHA Việt Nam</span> sẽ liên hệ trực tiếp cho bạn qua số điện thoại <span className="text-white underline font-mono">{successLead.phone}</span> để trao đổi chi tiết chính sách và thống nhất lịch hẹn.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setSuccessLead(null);
                    setFormData({
                      fullName: '',
                      phone: '',
                      companyName: '',
                      bizLector: '',
                      region: '',
                      partnerGroup: 'showroom',
                      hasShowroom: false,
                      hasTechTeam: false,
                      currentCustomers: '',
                      needs: []
                    });
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-slate-705 text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer"
                  id="form-reset-btn"
                >
                  Đăng ký tài khoản khác
                </button>
                <a
                  href="#ai-chatbox-trigger"
                  onClick={() => {
                    // Trigger custom event or scroll
                    const el = document.getElementById('ai-chatbox-trigger');
                    if (el) el.click();
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#ffd700] via-[#fff3b0] to-[#b8860b] text-slate-950 flex items-center gap-2 justify-center transition-all shadow-[0_0_20px_rgba(255,215,0,0.25)] hover:scale-102"
                >
                  <MessageSquare className="w-4 h-4 animate-bounce" />
                  Trò chuyện với AI Advisor
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

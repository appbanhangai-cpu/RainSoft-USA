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
    <div className="w-full max-w-2xl mx-auto rounded-3xl p-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 overflow-hidden shadow-2xl">
      <div className="w-full glass-effect rounded-[22px] p-6 sm:p-10 text-white relative">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />

        <AnimatePresence mode="wait">
          {!successLead ? (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10" id="partner-reg-form">
              {/* Header Title */}
              <div className="text-center space-y-2 mb-8">
                <span className="text-xs font-mono font-medium py-1 px-3 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 tracking-wider uppercase">
                  Bước {step} / 4: {step === 1 ? 'Thông Tin Liên Hệ' : step === 2 ? 'Lĩnh Vực Hoạt Động' : step === 3 ? 'Năng Lực Quy Mô' : 'Nhu Cầu Hợp Tác'}
                </span>
                <h3 className="text-2xl font-display font-semibold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Đăng Ký Hợp Tác Với RainSoft
                </h3>
                <p className="text-sm text-slate-400">
                  Hãy điền các thông tin cơ bản để chúng tôi thiết lập cơ chế đặc quyền phù hợp.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-6">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
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
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-400" />
                        Họ và tên của bạn <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleTextChange}
                        placeholder="Ví dụ: Nguyễn Văn Hải"
                        className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                        required
                        id="form-full-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-400" />
                        Số điện thoại liên hệ <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleTextChange}
                        placeholder="Ví dụ: 0912345678"
                        className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                        required
                        id="form-phone"
                      />
                      <span className="text-xs text-slate-500 block">Số điện thoại dùng để kết nối Zalo gửi file và Brochure.</span>
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
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-400" />
                        Tên Công ty / Thương hiệu (nếu có)
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleTextChange}
                        placeholder="Ví dụ: Cty Thiết Kế KĐéc / Showroom Hải Nam"
                        className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                        id="form-company-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        Nhóm đối tác phù hợp nhất <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="partnerGroup"
                        value={formData.partnerGroup}
                        onChange={handleTextChange}
                        className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-all text-sm appearance-none"
                        id="form-partner-group"
                      >
                        {partnerTypes_Vietnamese.map(t => (
                          <option key={t.value} value={t.value} className="bg-slate-950 text-white py-2">
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        Khu vực bạn muốn phát triển thị trường <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="region"
                        value={formData.region}
                        onChange={handleTextChange}
                        placeholder="Ví dụ: Hà Nội, Hải Phòng, Quảng Ninh..."
                        className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
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
                        className={`p-4 rounded-xl border flex flex-col items-center gap-3 text-center transition-all ${
                          formData.hasShowroom 
                            ? 'bg-blue-500/10 border-blue-500 text-white glow-blue' 
                            : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                        id="form-has-showroom-btn"
                      >
                        <Store className={`w-8 h-8 ${formData.hasShowroom ? 'text-blue-400' : 'text-slate-500'}`} />
                        <div>
                          <p className="text-sm font-semibold text-white">Bạn đã có Showroom chưa?</p>
                          <p className="text-xs text-slate-400 mt-1">Đã có mặt bằng trưng bày sản phẩm thực tế</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${formData.hasShowroom ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-400'}`}>
                          {formData.hasShowroom ? 'Đã có Showroom' : 'Chưa có / Đang xem xét'}
                        </span>
                      </button>

                      {/* Technical team toggle card */}
                      <button
                        type="button"
                        onClick={() => handleCheckboxChange('hasTechTeam', !formData.hasTechTeam)}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-3 text-center transition-all ${
                          formData.hasTechTeam 
                            ? 'bg-indigo-500/10 border-indigo-500 text-white glow-blue' 
                            : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                        id="form-has-tech-team-btn"
                      >
                        <Wrench className={`w-8 h-8 ${formData.hasTechTeam ? 'text-indigo-400' : 'text-slate-500'}`} />
                        <div>
                          <p className="text-sm font-semibold text-white">Bạn đã có đội Kỹ thuật chưa?</p>
                          <p className="text-xs text-slate-400 mt-1">Sẵn sàng lắp đặt, bảo hành đường ống nước</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${formData.hasTechTeam ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'}`}>
                          {formData.hasTechTeam ? 'Đã có đội kỹ thuật' : 'Chưa có (SHAHA hỗ trợ)'}
                        </span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">
                        Mô tả sơ bộ tệp khách hàng hiện tại của bạn
                      </label>
                      <textarea
                        name="currentCustomers"
                        value={formData.currentCustomers}
                        onChange={handleTextChange}
                        placeholder="Ví dụ: Đang phục vụ khoảng 150 khách xây biệt thự/năm, tệp khách MEP chung cư cao cấp..."
                        rows={3}
                        className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm resize-none"
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
                    <label className="text-sm font-medium text-slate-300 block mb-2">
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
                            className={`p-3.5 rounded-xl border flex items-center gap-3.5 text-left transition-all ${
                              isSelected 
                                ? 'bg-blue-500/10 border-blue-500/60 text-white' 
                                : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                            id={`form-need-btn-${n.value}`}
                          >
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500'}`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium flex-1">{n.label}</span>
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-700 bg-slate-900'
                            }`}>
                              {isSelected && <CheckCircle2 className="w-4.5 h-4.5 stroke-[2.5]" />}
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
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all"
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
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white glow-blue transition-all ml-auto cursor-pointer"
                    id="form-next-btn"
                  >
                    Tiếp tục
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500 text-white glow-blue-strong transition-all ml-auto cursor-pointer disabled:opacity-50"
                    id="form-submit-btn"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
              <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto text-blue-400 glow-blue">
                <CheckCircle2 className="w-12 h-12 stroke-[1.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-display font-bold text-white tracking-tight">
                  Đăng Ký Thành Công!
                </h3>
                <p className="text-emerald-400 font-medium text-sm">
                  Cảm ơn tác giả {successLead.fullName} đã tin chọn đồng hành cùng SHAHA.
                </p>
                <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 text-sm leading-relaxed mt-4">
                  Một chuyên viên phát triển đối tác cấp cao của <span className="text-blue-400 font-semibold">SHAHA Việt Nam</span> sẽ liên hệ trực tiếp cho bạn qua số điện thoại <span className="text-white underline">{successLead.phone}</span> để trao đổi chi tiết chính sách và thống nhất lịch hẹn.
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
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
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
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 justify-center transition-all glow-blue hover:scale-102"
                >
                  <MessageSquare className="w-4 h-4 animate-bounce" />
                  Trò chuyện với AI Advisor về chính sách
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

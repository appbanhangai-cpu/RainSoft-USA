import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  ShieldCheck, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Users,
  Phone, 
  Building2, 
  MapPin, 
  CheckSquare, 
  FileEdit, 
  Download, 
  LogOut, 
  RefreshCw, 
  CheckCircle, 
  Clock, 
  PhoneCall, 
  XSquare, 
  BookmarkCheck, 
  Info,
  ChevronDown,
  ChevronUp,
  Sliders,
  MessageSquare,
  Wrench,
  Store
} from 'lucide-react';
import { Lead } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  refreshTrigger: number;
}

export default function AdminPanel({ onClose, refreshTrigger }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);

  // States for updating inline
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>('');

  const fetchLeads = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/leads?password=shaha2026');
      if (!response.ok) {
        throw new Error('Không thể tải thông tin đối tác đăng ký.');
      }
      const data = await response.json();
      setLeads(data);
    } catch (err: any) {
      setError(err.message || 'Mất kết nối với máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated, refreshTrigger]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'shaha2026') {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Mật khẩu quản trị không chính xác. Vui lòng liên hệ IT SHAHA VN.');
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    try {
      const response = await fetch('/api/leads/update?password=shaha2026', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: leadId,
          status: newStatus
        })
      });

      if (!response.ok) {
        throw new Error('Lỗi cập nhật trạng thái.');
      }

      const updated = await response.json();
      setLeads(prev => prev.map(l => l.id === leadId ? updated : l));
    } catch (err: any) {
      alert(err.message || 'Không thể lưu trạng thái mới.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async (leadId: string) => {
    setUpdatingId(leadId);
    try {
      const response = await fetch('/api/leads/update?password=shaha2026', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: leadId,
          internalNotes: editingNotes
        })
      });

      if (!response.ok) {
        throw new Error('Lỗi cập nhật ghi chú.');
      }

      const updated = await response.json();
      setLeads(prev => prev.map(l => l.id === leadId ? updated : l));
      alert('Đã lưu ghi chú quản trị của bạn!');
    } catch (err: any) {
      alert(err.message || 'Không thể ghi chú.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    
    // Header Row
    const headers = ['ID', 'Ho Ten', 'SDT', 'Cong ty', 'Linh vuc', 'Khu vuc', 'Nhom Doi Tac', 'Có Showroom', 'Có Đội Kỹ Thuật', 'Nhu cầu', 'Trạng thái', 'Ngày đăng ký', 'Ghi chú quản trị'];
    
    const rows = leads.map(l => [
      l.id,
      l.fullName,
      l.phone,
      l.companyName,
      l.bizLector,
      l.region,
      l.partnerGroup,
      l.hasShowroom ? 'Có' : 'Không',
      l.hasTechTeam ? 'Có' : 'Không',
      l.needs.join('; '),
      l.status,
      l.submittedAt,
      l.internalNotes || ''
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SHAHA_RainSoft_Leads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExpandRow = (lead: Lead) => {
    if (expandedLeadId === lead.id) {
      setExpandedLeadId(null);
      setEditingNotes('');
    } else {
      setExpandedLeadId(lead.id);
      setEditingNotes(lead.internalNotes || '');
    }
  };

  // Status mapping
  const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; icon: any }> = {
    new: { label: 'Mới nhận', bg: 'bg-blue-500/15', text: 'text-blue-400', icon: Clock },
    contacted: { label: 'Đã liên hệ', bg: 'bg-yellow-500/15', text: 'text-yellow-400', icon: PhoneCall },
    approved: { label: 'Đã duyệt đại lý', bg: 'bg-emerald-500/15', text: 'text-emerald-400', icon: ShieldCheck },
    signed: { label: 'Đã ký hợp đồng', bg: 'bg-purple-500/15', text: 'text-purple-400', icon: BookmarkCheck },
    rejected: { label: 'Không phù hợp', bg: 'bg-red-500/15', text: 'text-red-400', icon: XSquare }
  };

  const GROUP_LABELS: Record<string, string> = {
    showroom: 'Showroom xây dựng',
    mep: 'Kỹ thuật MEP',
    architect: 'Kiến trúc sư / Design',
    contractor: 'Tổng thầu hoàn thiện',
    entrepreneur: 'Doanh nhân mở bộ phận mới'
  };

  // Filtration logic
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.fullName.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.companyName.toLowerCase().includes(search.toLowerCase()) ||
      l.region.toLowerCase().includes(search.toLowerCase());
    
    const matchesGroup = filterGroup === 'all' || l.partnerGroup === filterGroup;
    const matchesStatus = filterStatus === 'all' || l.status === filterStatus;

    return matchesSearch && matchesGroup && matchesStatus;
  });

  // Analytics Synthesis
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const signedLeadsCount = leads.filter(l => l.status === 'signed').length;
  const approvedLeadsCount = leads.filter(l => l.status === 'approved').length;
  
  const hasShowroomPercent = totalLeadsCount ? Math.round((leads.filter(l => l.hasShowroom).length / totalLeadsCount) * 100) : 0;
  const hasTechTeamPercent = totalLeadsCount ? Math.round((leads.filter(l => l.hasTechTeam).length / totalLeadsCount) * 100) : 0;

  // Breakdown of groups for CSS-based interactive chart
  const groupCounts = leads.reduce((acc, curr) => {
    acc[curr.partnerGroup] = (acc[curr.partnerGroup] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md overflow-y-auto p-4 sm:p-6 text-white font-sans flex flex-col">
      
      {/* Top Banner Control Bar */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 border-b border-slate-800/80 mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center glow-blue text-white">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold tracking-tight">
              SHAHA Leads Management
            </h2>
            <p className="text-xs text-slate-400 font-mono">Bảng quản trị thông tin đối tác đặc quyền (Hợp tác RainSoft USA)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 duration-200 border border-slate-800 hover:border-blue-500 hover:text-white text-slate-300 cursor-pointer"
              id="admin-export-btn"
            >
              <Download className="w-3.5 h-3.5" />
              Xuất dữ liệu Excel (CSV)
            </button>
          )}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 cursor-pointer"
            id="admin-close-panel-btn"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            Thoát quản trị
          </button>
        </div>
      </div>

      {/* LOGIN CHALLENGE SCREEN */}
      {!isAuthenticated ? (
        <div className="flex-1 flex items-center justify-center py-20 relative z-10">
          <div className="w-full max-w-md p-8 rounded-3xl glass-effect text-center space-y-6 shadow-2xl relative">
            <div className="absolute top-0 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
            
            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto text-blue-400 glow-blue">
              <Lock className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-display font-semibold">Nhà Quản Trị Hệ Thống</h3>
              <p className="text-slate-400 text-xs px-2 leading-relaxed">
                Khu vực phân mật bảo vệ thông tin đăng ký đối tác độc quyền của SHAHA và RainSoft. Vui lòng thử nhập mật khẩu khởi tạo (<code className="text-blue-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono text-[10px]">shaha2026</code>) để thử nghiệm.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-left">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-slate-400">Mật khẩu bảo mật quản trị</label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Mật khẩu của bạn là gì?"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-sm placeholder-slate-600 text-center tracking-widest font-mono"
                  required
                  id="admin-passcode-field"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center gap-2 text-sm transition-all glow-blue cursor-pointer"
                id="admin-auth-submit"
              >
                Mở khóa bảng số liệu
                <ShieldCheck className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* CORE CRM DATABASE CONTENTS & METRICS */
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col gap-6 pb-12">
          
          {/* SECURE ANALYTICS GRID CARD ROW */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 relative overflow-hidden">
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-slate-400 text-[10px] font-mono tracking-wider block uppercase">Tổng Đăng Ký Đã Ghi</span>
              <span className="text-3xl font-display font-extrabold text-white mt-1 block">{totalLeadsCount}</span>
              <p className="text-[10px] text-slate-500 mt-2">Toàn bộ tệp khách cơ sở lưu hành</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 relative overflow-hidden">
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-yellow-500/10 text-yellow-500">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-slate-400 text-[10px] font-mono tracking-wider block uppercase">Đại Lý Chờ Xử Lý</span>
              <span className="text-3xl font-display font-extrabold text-yellow-400 mt-1 block">{newLeadsCount}</span>
              <p className="text-[10px] text-yellow-500/70 mt-2">Dữ liệu liên hệ mới tinh vừa ghi nhận</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 relative overflow-hidden">
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                <BookmarkCheck className="w-4 h-4" />
              </div>
              <span className="text-slate-400 text-[10px] font-mono tracking-wider block uppercase">Đã duyệt & Ký Kết</span>
              <span className="text-3xl font-display font-extrabold text-emerald-400 mt-1 block">{signedLeadsCount + approvedLeadsCount}</span>
              <p className="text-[10px] text-slate-500 mt-2">Chậm nhất 3-5 ngày hỗ trợ showroom</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 relative overflow-hidden">
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Sliders className="w-4 h-4" />
              </div>
              <span className="text-slate-400 text-[10px] font-mono tracking-wider block uppercase">Năng Lực Ban Đầu</span>
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1"><Store className="w-3 h-3" /> Có Showroom:</span>
                  <span className="text-white font-mono font-semibold">{hasShowroomPercent}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1"><Wrench className="w-3 h-3" /> Có Kỹ Thuật:</span>
                  <span className="text-white font-mono font-semibold">{hasTechTeamPercent}%</span>
                </div>
              </div>
            </div>

          </div>

          {/* VISUAL ANALYTICS BY GROUP BAR & CONTROLS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Visual breakdown metrics (CSS-based interactive chart bypassing Recharts conflicts) */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/60 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wide">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" /> Tỷ Trọng Nhóm Đối Tác
                </h4>
                <p className="text-xs text-slate-500 mt-1">Phân bố cơ cấu các nhóm đăng ký liên kết trong hệ thống.</p>
              </div>

              <div className="space-y-3.5 my-5">
                {Object.keys(GROUP_LABELS).map((grp) => {
                  const count = groupCounts[grp] || 0;
                  const percent = totalLeadsCount ? Math.round((count / totalLeadsCount) * 100) : 0;
                  return (
                    <div key={grp} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300">{GROUP_LABELS[grp]}</span>
                        <span className="text-slate-400 font-mono text-[11px]">{count} liên hệ ({percent}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            grp === 'showroom' ? 'bg-blue-500' :
                            grp === 'mep' ? 'bg-indigo-500' :
                            grp === 'architect' ? 'bg-purple-500' :
                            grp === 'contractor' ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-[10px] text-slate-400 leading-relaxed">
                  Nhóm kiến trúc sư và MEP đang chiếm ưu thế tăng trưởng cao nhất, thể hiện mong muốn bổ sung các giải pháp lọc tổng RainSoft cao cấp Mỹ bảo vệ công năng thiết bị.
                </span>
              </div>
            </div>

            {/* FILTER SEARCH CONTROL CONSOLE */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/50 border border-slate-800/60 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                <h4 className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wide">
                  <Search className="w-3.5 h-3.5 text-blue-400" /> BỘ LỌC ĐIỀU HƯỚNG TÌM KIẾM
                </h4>
                <button 
                  onClick={fetchLeads}
                  className="p-1 px-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] text-blue-400 font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                  id="admin-reload-btn"
                >
                  <RefreshCw className="w-3 h-3 animate-spin-slow" />
                  Đồng bộ Leads
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-400">Tìm kiếm bằng từ khóa (Tên, SĐT, Vùng, Cty...)</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Gõ tên khách, SĐT cần check..."
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-blue-500"
                      id="admin-search-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-slate-400">Nhóm Đối Tác</label>
                    <select
                      value={filterGroup}
                      onChange={(e) => setFilterGroup(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                      id="admin-filter-group"
                    >
                      <option value="all">Tất cả nhóm</option>
                      <option value="showroom">Showroom nội thất</option>
                      <option value="mep">Công nghệ MEP</option>
                      <option value="architect">KTS / Thiết kế</option>
                      <option value="contractor">Tổng thầu</option>
                      <option value="entrepreneur">Doanh nhân tự do</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-slate-400">Trạng Thái Xử Lý</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                      id="admin-filter-status"
                    >
                      <option value="all">Tất cả trạng thái</option>
                      <option value="new">Mới nhận (New)</option>
                      <option value="contacted">Đã liên hệ (Contacted)</option>
                      <option value="approved">Đã duyệt (Approved)</option>
                      <option value="signed">Ký kết (Signed)</option>
                      <option value="rejected">Không phù hợp (Rejected)</option>
                    </select>
                  </div>
                </div>

              </div>

              <div className="p-2 sm:p-3 rounded-xl bg-slate-950 text-slate-400 text-xs flex justify-between items-center font-mono text-[10px] border border-slate-900">
                <span>Số liệu khớp bộ lọc: <strong className="text-white">{filteredLeads.length}</strong> / {totalLeadsCount} dòng tìm thấy</span>
                {search || filterGroup !== 'all' || filterStatus !== 'all' ? (
                  <button 
                    onClick={() => { setSearch(''); setFilterGroup('all'); setFilterStatus('all'); }}
                    className="text-yellow-400 underline cursor-pointer"
                    id="admin-reset-filter-btn"
                  >
                    Xóa lọc nhanh
                  </button>
                ) : null}
              </div>

            </div>

          </div>

          {/* REALTIME LIST VIEW */}
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 overflow-hidden flex-1 flex flex-col min-h-[400px]">
            
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-4 mb-4 shrink-0">
              <h4 className="text-sm font-semibold tracking-wide flex items-center gap-2 text-white">
                <CheckSquare className="w-5 h-5 text-blue-500 animate-pulse" />
                Danh sách Đăng ký Hợp tác Chi Tiết
              </h4>
              <span className="text-[10px] font-mono text-slate-500">Cập nhật tự động trực tuyến</span>
            </div>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                <span className="text-xs text-slate-400 font-mono">Đang đồng bộ dữ liệu leads...</span>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-2 py-10">
                <Info className="w-10 h-10 text-slate-700" />
                <span className="text-slate-500 text-sm font-medium">Không tìm thấy dữ liệu đối tác nào khớp với bộ lọc của bạn.</span>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-3 max-h-[500px] pr-2">
                {filteredLeads.map((l) => {
                  const stateCfg = STATUS_CONFIG[l.status] || STATUS_CONFIG.new;
                  const IconComp = stateCfg.icon;
                  const isExpanded = expandedLeadId === l.id;

                  return (
                    <div 
                      key={l.id}
                      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                        isExpanded 
                          ? 'bg-slate-900 border-blue-500/80' 
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700/80'
                      }`}
                    >
                      {/* Row Card Summary Header */}
                      <div 
                        onClick={() => handleExpandRow(l)}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                        id={`lead-header-row-${l.id}`}
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Left icon or thumbnail representation */}
                          <div className={`p-2.5 rounded-lg shrink-0 border ${
                            l.partnerGroup === 'showroom' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                            l.partnerGroup === 'mep' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' :
                            l.partnerGroup === 'architect' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                            l.partnerGroup === 'contractor' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                            'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          }`}>
                            {l.partnerGroup === 'showroom' ? <Store className="w-5 h-5" /> : 
                             l.partnerGroup === 'mep' ? <Wrench className="w-5 h-5" /> : 
                             <User className="w-5 h-5" />}
                          </div>

                          <div className="space-y-0.5">
                            <h5 className="font-semibold text-sm sm:text-base text-white flex items-center gap-1.5 flex-wrap">
                              {l.fullName} 
                              {l.companyName && <span className="text-xs font-normal text-slate-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">({l.companyName})</span>}
                            </h5>
                            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-slate-400 font-mono">
                              <span className="flex items-center gap-1 text-[11px]"><Phone className="w-3.5 h-3.5 text-slate-500" /> {l.phone}</span>
                              <span className="flex items-center gap-1 text-[11px]"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {l.region}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status + Accordion Arrow */}
                        <div className="flex items-center justify-between sm:justify-end gap-3.5 border-t sm:border-0 border-slate-800/60 pt-3 sm:pt-0">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold font-mono flex items-center gap-1.5 ${stateCfg.bg} ${stateCfg.text}`}>
                            <IconComp className="w-3.5 h-3.5 stroke-[2.5]" />
                            {stateCfg.label}
                          </span>
                          <div className="text-slate-500 group-hover:text-slate-300">
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-blue-400" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </div>
                      </div>

                      {/* Expandable Advanced Area Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-slate-800/80 bg-slate-950/80 p-5 space-y-6"
                            id={`lead-expanded-${l.id}`}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Left detailed data checklist */}
                              <div className="space-y-3.5 text-xs sm:text-sm">
                                <h6 className="text-[11px] font-bold font-mono text-slate-400 border-b border-slate-900 pb-1.5 uppercase tracking-wider">Thông Tin Bản Khai Nhập</h6>
                                
                                <div className="grid grid-cols-3 gap-2 py-0.5 border-b border-slate-900/60">
                                  <span className="text-slate-400">Lĩnh vực chi tiết:</span>
                                  <span className="text-slate-200 col-span-2 font-medium">{l.bizLector || 'Chưa cung cấp'}</span>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-2 py-0.5 border-b border-slate-900/60">
                                  <span className="text-slate-400">Có Showroom:</span>
                                  <span className={`font-semibold ${l.hasShowroom ? 'text-blue-400' : 'text-slate-500'}`}>
                                    {l.hasShowroom ? '✔ Đã có Showroom' : '✘ Chưa có'}
                                  </span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 py-0.5 border-b border-slate-900/60">
                                  <span className="text-slate-400">Đội ngũ kỹ thuật:</span>
                                  <span className={`font-semibold ${l.hasTechTeam ? 'text-indigo-400' : 'text-slate-500'}`}>
                                    {l.hasTechTeam ? '✔ Sẵn sàng lắp đặt' : '✘ Chưa có (SHAHA hỗ trợ)'}
                                  </span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 py-0.5 border-b border-slate-900/60">
                                  <span className="text-slate-400">Khách hàng hiện tại:</span>
                                  <span className="text-slate-200 col-span-2">{l.currentCustomers || 'Không có ghi chép cụ thể'}</span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 py-0.5 border-b border-slate-900/60">
                                  <span className="text-slate-400">Nhu cầu gửi tài liệu:</span>
                                  <div className="col-span-2 flex flex-wrap gap-1">
                                    {l.needs.length > 0 ? l.needs.map(nd => {
                                      let label = nd;
                                      if (nd === 'document') label = 'Nhận tài liệu sản phẩm (Brochure)';
                                      if (nd === 'consult') label = 'Gặp chuyên gia tư vấn 1-1';
                                      if (nd === 'demotraining') label = 'Đào tạo sử dụng Test Kit thử nước';
                                      if (nd === 'policy') label = 'Nhận bảng chính sách chiết khấu';
                                      return (
                                        <span key={nd} className="px-2 py-0.5 bg-slate-900 text-slate-300 border border-slate-800 text-[10px] rounded">
                                          {label}
                                        </span>
                                      );
                                    }) : <span className="text-slate-500">Không tích chọn nhu cầu cụ thể</span>}
                                  </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 py-0.5">
                                  <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]"><Calendar className="w-3.5 h-3.5" /> Ghi nhận:</span>
                                  <span className="text-slate-300 col-span-2 font-mono text-xs">{new Date(l.submittedAt).toLocaleString('vi-VN')}</span>
                                </div>
                              </div>

                              {/* Right Admin action controls */}
                              <div className="space-y-4">
                                <h6 className="text-[11px] font-bold font-mono text-slate-400 border-b border-slate-900 pb-1.5 uppercase tracking-wider">Hành Động Khai Thác</h6>
                                
                                {/* Status update selector */}
                                <div className="space-y-1.5">
                                  <label className="text-xs text-slate-400 font-semibold block">Cập nhật trạng thái xử lý:</label>
                                  <div className="flex gap-2">
                                    {Object.keys(STATUS_CONFIG).map((st) => (
                                      <button
                                        key={st}
                                        disabled={updatingId !== null}
                                        onClick={() => handleStatusChange(l.id, st)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all border ${
                                          l.status === st 
                                            ? 'bg-blue-600 border-blue-500 text-white' 
                                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                                        }`}
                                        id={`lead-${l.id}-status-btn-${st}`}
                                      >
                                        {STATUS_CONFIG[st].label}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Internal Administrative followup notes */}
                                <div className="space-y-1.5">
                                  <label className="text-xs text-slate-400 font-semibold block flex items-center gap-1.5">
                                    <FileEdit className="w-3.5 h-3.5 text-blue-400" />
                                    Ghi chú tiến độ liên hệ (Nội bộ SHAHA):
                                  </label>
                                  <textarea
                                    value={editingNotes}
                                    onChange={(e) => setEditingNotes(e.target.value)}
                                    placeholder="Ví dụ: Đã gọi điện giới thiệu đại sứ hỗ trợ, đối tác đồng ý hợp tác sau khi kết thúc công tác nước ngoài. Lịch hẹn trực tiếp Hà Nội..."
                                    rows={3}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-700 outline-none focus:border-blue-500 resize-none leading-relaxed"
                                    id={`lead-notes-area-${l.id}`}
                                  />
                                  <button
                                    disabled={updatingId !== null}
                                    onClick={() => handleSaveNotes(l.id)}
                                    className="px-4 py-2 font-bold rounded-lg text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-blue-500 text-blue-400 transition-all flex items-center gap-1 cursor-pointer"
                                    id={`lead-notes-save-${l.id}`}
                                  >
                                    Lưu nhật ký ghi chú
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  companyName: string;
  bizLector: string; // Business sector
  region: string;
  partnerGroup: 'showroom' | 'mep' | 'architect' | 'contractor' | 'entrepreneur';
  hasShowroom: boolean;
  hasTechTeam: boolean;
  currentCustomers: string;
  needs: string[]; // ['document', 'consult', 'demotraining', 'policy']
  status: 'new' | 'contacted' | 'approved' | 'signed' | 'rejected';
  internalNotes?: string;
  submittedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface PartnerGroupDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  audience: string[];
  opportunity: string;
  roiExample: string;
}

export interface SupportDetail {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface StageDetail {
  phase: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export const PARTNER_GROUPS: PartnerGroupDetail[] = [
  {
    id: 'showroom',
    title: 'Showroom Thiết Bị Nhà Ở Cao Cấp',
    tagline: 'Thiết bị vệ sinh, bếp, nội thất cao cấp, smart home, vật liệu hoàn thiện',
    description: 'Tận dụng lượng lượng khách hàng đang trong giai đoạn sắm sửa, thiết kế nhà ở cao cấp để bán chéo giải pháp lọc tổng RainSoft danh tiếng.',
    audience: ['Showroom bếp nhập khẩu', 'Cửa hàng thiết bị vệ sinh cao cấp', 'Showroom nội thất & smart home'],
    opportunity: 'Gia tăng doanh số trung bình trên mỗi lượt khách mua sắm, tối ưu mặt bằng trưng bày có sẵn, định vị showroom là điểm đến sành điệu bậc nhất.',
    roiExample: 'Chỉ cần tích hợp trưng bày 1 hệ thống RainSoft demo tại showroom, chốt thành công 2-3 bộ/tháng mang lại doanh thu ròng bổ sung từ 150M - 300M VNĐ.'
  },
  {
    id: 'mep',
    title: 'Công Ty MEP / Xử Lý Nước / Cơ Điện',
    tagline: 'Đội kỹ thuật sẵn có, khách hàng công trình chất lượng',
    description: 'Sở hữu năng lực kỹ thuật lắp đặt xuất sắc, cần một thương hiệu siêu cao cấp từ Mỹ để thâm nhập phân khúc bất động sản triệu đô biệt thự/villa.',
    audience: ['Nhà thầu điện nước biệt thự', 'Công ty kỹ thuật môi trường, lọc nước lớn', 'Đơn vị phân phối điều hòa trung tâm & MEP'],
    opportunity: 'Nâng tầm giá trị dự án từ trung cấp lên siêu cao cấp. RainSoft là chất xúc tác hoàn hảo khẳng định vị thế kỹ thuật chuẩn Mỹ.',
    roiExample: 'Hợp tác trọn gói cung cấp MEP + Lọc tổng RainSoft cho 5 công trình biệt thự cao cấp giúp lợi nhuận thuần tăng 40% so với chỉ làm cơ điện thông thường.'
  },
  {
    id: 'architect',
    title: 'Kiến Trúc Sư & Thiết Kế Nội Thất',
    tagline: 'Vị trí cố vấn niềm tin cho tệp khách hàng biệt thự, villa cao cấp',
    description: 'Khách hàng phân khúc cao cấp phó thác trọn vẹn không gian sống cho KTS. Tích hợp giải pháp nước sạch trung tâm chuẩn Mỹ từ bản vẽ thiết kế ban đầu.',
    audience: ['Văn phòng kiến trúc sư luxury', 'Chuyên gia tư vấn giải pháp nội thất villa', 'Nhà thiết kế Penthouse cao cấp'],
    opportunity: 'Bảo vệ giá trị các thiết bị vệ sinh nhập khẩu xa xỉ (mạ vàng, đá tự nhiên) không bị bám cặn, đồng thời tạo nét vẽ tinh tế cho phong cách sống thời thượng.',
    roiExample: 'Cung cấp giải pháp nước sạch đồng bộ bảo vệ 100% công năng thiết bị phòng tắm châu Âu của gia chủ biệt thự, nhận chính sách ưu đãi đối tác đặc quyền cực tốt.'
  },
  {
    id: 'contractor',
    title: 'Tổng Thầu & Nhà Thầu Hoàn Thiện',
    tagline: 'Nhà thi công trọn gói kiến trúc biệt thự, villa',
    description: 'Đóng vai trò quyết định cấu trúc hạ tầng cấp nước cho cả công trình từ lúc đổ móng đến khi bàn giao chìa khóa trao tay.',
    audience: ['Công ty xây dựng biệt thự trọn gói', 'Nhà thầu hoàn thiện khu đô thị cao cấp', 'Ban quản lý dự án dinh thự'],
    opportunity: 'Tạo ưu thế cạnh tranh đấu thầu vượt trội nhờ đưa giải pháp lọc tổng RainSoft cao cấp tích hợp sẵn vào hồ sơ thiết kế kỹ thuật.',
    roiExample: 'Bàn giao chìa khóa trao tay biệt thự cao cấp tích hợp trọn bộ lọc tổng RainSoft, tăng mức độ hài lòng của chủ đầu tư 200%, mở rộng cơ hội giới thiệu công trình mới.'
  },
  {
    id: 'entrepreneur',
    title: 'Doanh Nhân & Nhà Đầu Tư Địa Phương',
    tagline: 'Muốn khai phá ngành hàng gia dụng luxury tiềm năng vô hạn',
    description: 'Doanh nhân có mạng lưới quan hệ rộng khắp tại địa phương, có dòng vốn vững vàng và muốn độc quyền phát triển thương hiệu Mỹ tại khu vực.',
    audience: ['Nhà phân phối ngành hàng xây dựng', 'Doanh nhân có tệp mối quan hệ giàu có', 'Chủ doanh nghiệp muốn mở rộng dòng sản phẩm mới'],
    opportunity: 'Trở thành đơn vị độc quyền hoặc phân hạt phân phối RainSoft tại tỉnh thành, đón đầu làn sóng lọc nước trung tâm bảo vệ sức khỏe đang bùng nổ.',
    roiExample: 'Thiết lập showroom độc quyền tại thành phố trọng điểm dưới sự chuyển giao 100% tài liệu, kịch bản marketing từ SHAHA, đạt điểm hòa vốn chỉ sau 3-6 tháng.'
  }
];

export const SUPPORT_PROGRAMS: SupportDetail[] = [
  {
    id: 'product',
    title: 'Đào Tạo Sản Phẩm & Công Nghệ',
    description: 'Nắm vững cốt lõi công nghệ và ưu thế vượt trội của RainSoft so với phần còn lại của thị trường.',
    items: [
      'Bản chất nguồn nước ô nhiễm tại các khu đô thị lớn ở Việt Nam',
      'Độc quyền công nghệ hạt nhựa trao đổi ion cao cấp của RainSoft USA',
      'Cách phân tích cấu hình hệ thống phù hợp với nhu cầu từng biệt thự',
      'Tiêu chuẩn tư vấn chuyên sâu nâng tầm đẳng cấp thương hiệu'
    ]
  },
  {
    id: 'testkit',
    title: 'Đào Tạo Thực Chiến Demo Test Kit',
    description: 'Sử dụng vali thử nghiệm trực quan biến những chỉ số nước vô hình thành niềm tin bán hàng vững chắc.',
    items: [
      'Quy trình vận hành bộ thử nước tiêu chuẩn Mỹ chuyên nghiệp',
      'Giải thích tường tận các chỉ số độ cứng, clo dư, kim loại nặng',
      'Nghệ thuật trình bày thí nghiệm ngay tại nhà khách hàng',
      'Phương pháp chuyển hóa số liệu thực tế thành tác nhân ra quyết định mua hàng'
    ]
  },
  {
    id: 'sales',
    title: 'Đào Tạo Bán Hàng Cao Cấp (High-Ticket)',
    description: 'Chiến thuật tiếp cận và thuyết phục nhóm khách hàng siêu giàu (villas, penthouses) khắt khe nhất.',
    items: [
      'Quy trình khảo sát hành vi mua hàng của chủ nhân biệt thự triệu đô',
      'Nghệ thuật lồng ghép giải pháp nước sạch vào thiết kế nội thất',
      'Kỹ năng phản biện, xử lý từ chối và giải đáp về giá thành sản phẩm',
      'Kịch bản chốt thương vụ giá trị cao lên tới hàng trăm triệu đồng'
    ]
  },
  {
    id: 'showroom',
    title: 'Hỗ Trợ Thiết Kế & Quy Trình Showroom',
    description: 'Biến điểm bán của bạn thành một không gian trải nghiệm sang trọng và thu hút dòng sinh khí bán lẻ.',
    items: [
      'Bản vẽ thiết kế 3D showroom trưng bày chuẩn nhận diện RainSoft USA',
      'Bố trí góc trải nghiệm thực tế và bàn thí nghiệm nước trực giác',
      'Kịch bản tiếp đón và giới thiệu hệ thống trực tiếp cho khách tham quan',
      'Quy trình thu thập thông tin khách hàng tiềm năng tại điểm bán'
    ]
  },
  {
    id: 'technical',
    title: 'Chuyển Giao Kỹ Thuật Toàn Diện',
    description: 'Đảm bảo mọi công trình lắp đặt đạt tiêu chuẩn khắt khe nhất về thẩm mỹ kỹ thuật Hoa Kỳ.',
    items: [
      'Khảo sát áp lực, mặt bằng và đường ống nước kỹ thuật chi tiết',
      'Lắp đặt chuẩn kỹ thuật, tối ưu hóa không gian phòng máy biệt thự',
      'Quy trình bàn giao vận hành và hướng dẫn gia chủ chi tiết',
      'Tiêu chuẩn chụp hình, quay phim công trình hoàn thiện phục vụ quảng bá'
    ]
  },
  {
    id: 'marketing',
    title: 'Hỗ Trợ Tài Nguyên Truyền Thông',
    description: 'Cung cấp trọn bộ vũ khí tiếp thị chuyên sâu để đối tác liên tục tiếp cận tệp khách hàng tiềm năng.',
    items: [
      'Bộ Catalogue, Brochure, tờ rơi in ấn chất lượng cao',
      'Thư viện video review công trình thực tế, hình ảnh sắc nét',
      'Kịch bản tiếp cận điện thoại (Telesales) và chăm sóc khách hàng',
      'Hỗ trợ thiết kế Landing Page riêng và lập ngân sách quảng cáo khu vực'
    ]
  }
];

export const DISCOVERY_STAGES: StageDetail[] = [
  {
    phase: 1,
    title: 'Khởi Động Nền Tảng',
    subtitle: 'Tìm hiểu tổng quan & Định hướng',
    description: 'Thiết lập nền tảng kiến thức ban đầu vững vàng nhất cho đối tác.',
    deliverables: [
      'Đào tạo kiến thức nền tảng thương hiệu RainSoft từ 1953',
      'Cung cấp tài liệu sản phẩm, catalogue phiên bản giới hạn',
      'Phân tích bản đồ cơ hội kinh doanh tại khu vực đăng ký',
      'Xác định tệp khách hàng tiềm năng mũi nhọn'
    ]
  },
  {
    phase: 2,
    title: 'Tạo Lead & Trải Nghiệm Demo',
    subtitle: 'Khai phá nhu cầu khách hàng thực tế',
    description: 'Lan tỏa giải pháp bằng trải nghiệm nước sạch thực tế.',
    deliverables: [
      'Chuyển giao công cụ và vali thử nước Test Kit Mỹ',
      'Tập huấn trực tiếp kịch bản thử nước thu hút sự tò mò',
      'Tổ chức chương trình kiểm tra nước miễn phí tại showroom/chung cư',
      'Sinh hoạt chuyên đề mini-event tạo danh sách Lead chất lượng'
    ]
  },
  {
    phase: 3,
    title: 'Bán Hàng Thực Chiến',
    subtitle: 'SHAHA đồng hành chốt đơn',
    description: 'Bạn không cô đơn trên hành trình chốt những thương vụ đầu tiên.',
    deliverables: [
      'Chuyên gia SHAHA hỗ trợ phân tích bản vẽ công trình khó',
      'Đồng hành cùng đối tác đi khảo sát thực tế nhà khách hàng',
      'Tư vấn trực tiếp, chốt đơn cam kết cùng đối tác 3-5 hợp đồng đầu',
      'Tối ưu hóa bảng báo giá và phương án lắp đặt tối ưu'
    ]
  },
  {
    phase: 4,
    title: 'Chuyển Giao Vận Hành',
    subtitle: 'Độc lập triển khai hệ thống chuyên nghiệp',
    description: 'Đưa đối tác làm chủ hoàn toàn quy trình kinh doanh và kỹ thuật.',
    deliverables: [
      'Đào tạo độc lập lắp đặt đóng tủ, bảo trì định kỳ hệ thống',
      'Chuyển giao phần mềm nhắc lịch thay thế vật tư tự động',
      'Đóng gói quy trình chăm sóc khách hàng sau bán hàng định kỳ',
      'Tiêu chuẩn hóa đội ngũ kỹ thuật có chứng chỉ SHAHA'
    ]
  },
  {
    phase: 5,
    title: 'Mở Rộng Thị Trường',
    subtitle: 'Thống trị phân khúc nước sạch khu vực',
    description: 'Xây dựng đế chế kinh doanh lọc tổng vững chắc có doanh thu trọn đời.',
    deliverables: [
      'Hỗ trợ kinh phí phủ thương hiệu showroom chính thức',
      'Tuyển dụng và xây dựng đội ngũ kinh doanh thiện chiến tại địa bàn',
      'Thiết lập mạng lưới cộng tác viên KTS, nhà thầu MEP bền chặt',
      'Nâng cấp lên tổng đại lý ủy quyền hưởng chiết khấu vượt bậc'
    ]
  }
];

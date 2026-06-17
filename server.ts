import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header as instructed
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy_key",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Paths
const LEADS_FILE = path.join(process.cwd(), "leads.json");

// Helper to load leads with some mock data if empty
function loadLeads() {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      const initialLeads = [
        {
          id: "lead_1",
          fullName: "Nguyễn Minh Khang",
          phone: "0912345678",
          companyName: "K-Interior Design Studio",
          bizLector: "Kiến trúc / Thiết kế nội thất biệt thự",
          region: "Hà Nội (Khu đô thị Vinhomes Riverside)",
          partnerGroup: "architect",
          hasShowroom: false,
          hasTechTeam: false,
          currentCustomers: "Tập trung phân khúc thiết kế Villa, Penthouse",
          needs: ["policy", "consult"],
          status: "approved",
          internalNotes: "Vừa trao đổi qua điện thoại. Anh Khang sở hữu nhóm khách hàng rất cao cấp, đang thiết kế 3 căn villa lớn tại Riverside. Hẹn gặp trực tiếp tại văn phòng SHAHA vào thứ 6 để bàn giao catalog.",
          submittedAt: "2026-06-15T09:30:00Z"
        },
        {
          id: "lead_2",
          fullName: "Phạm Thành Nam",
          phone: "0908765432",
          companyName: "MEP Mekong Tech Co., Ltd",
          bizLector: "Thầu cơ điện MEP & Thiết bị xử lý nước nước",
          region: "TP. Hồ Chí Minh (Quận 2, Quận 7)",
          partnerGroup: "mep",
          hasShowroom: true,
          hasTechTeam: true,
          currentCustomers: "Thi công kỹ thuật nước & điều hòa trung tâm biệt thự Phú Mỹ Hưng",
          needs: ["demotraining", "policy"],
          status: "new",
          internalNotes: "Muốn tham gia lớp đào tạo kỹ thuật lắp đặt RainSoft chuẩn Hoa Kỳ và nhận báo giá chính sách chiết khấu nhà thầu MEP.",
          submittedAt: "2026-06-16T14:45:00Z"
        },
        {
          id: "lead_3",
          fullName: "Trần Thị Thu Trang",
          phone: "0976554433",
          companyName: "Decor Luxury Home - Showroom",
          bizLector: "Showroom thiết bị vệ sinh cao cấp & nội thất bếp",
          region: "Hải Phòng",
          partnerGroup: "showroom",
          hasShowroom: true,
          hasTechTeam: false,
          currentCustomers: "Khách lẻ xây biệt thự phố, phân khúc cao cấp",
          needs: ["document", "demotraining"],
          status: "contacted",
          internalNotes: "Khách có showroom cực đẹp ở trung tâm Hải Phòng. Đang cân nhắc lắp đặt tủ demo RainSoft EC5 để test nước trực tiếp cho khách. Đã gửi tài liệu thiết kế bản vẽ 3D showroom.",
          submittedAt: "2026-06-17T02:15:00Z"
        }
      ];
      fs.writeFileSync(LEADS_FILE, JSON.stringify(initialLeads, null, 2), "utf-8");
      return initialLeads;
    }
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading leads file, returning empty array", err);
    return [];
  }
}

// Helper to save leads
function saveLeads(leads: any[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing leads file:", err);
  }
}

// 1. LEAD SUBMISSION (PUBLIC API)
app.post("/api/leads", (req, res) => {
  try {
    const {
      fullName,
      phone,
      companyName,
      bizLector,
      region,
      partnerGroup,
      hasShowroom,
      hasTechTeam,
      currentCustomers,
      needs
    } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({ error: "Họ và tên, số điện thoại là bắt buộc" });
    }

    const leads = loadLeads();
    const newLead = {
      id: "lead_" + Date.now(),
      fullName,
      phone,
      companyName: companyName || "",
      bizLector: bizLector || "",
      region: region || "",
      partnerGroup: partnerGroup || "showroom",
      hasShowroom: !!hasShowroom,
      hasTechTeam: !!hasTechTeam,
      currentCustomers: currentCustomers || "",
      needs: Array.isArray(needs) ? needs : [],
      status: "new",
      internalNotes: "",
      submittedAt: new Date().toISOString()
    };

    leads.push(newLead);
    saveLeads(leads);

    res.status(201).json(newLead);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Không thể lưu thông tin đăng ký" });
  }
});

// 2. LEAD RETRIEVAL & UPDATE (SECURE ADMIN API)
// We shield this with local passcode "shaha2026"
app.get("/api/leads", (req, res) => {
  const password = req.headers["x-admin-password"] || req.query.password;
  if (password !== "shaha2026") {
    return res.status(401).json({ error: "Không có quyền truy cập. Vui lòng nhập đúng mật khẩu quản trị." });
  }
  res.json(loadLeads());
});

app.post("/api/leads/update", (req, res) => {
  const password = req.headers["x-admin-password"] || req.query.password;
  if (password !== "shaha2026") {
    return res.status(401).json({ error: "Không có quyền sửa đổi thông tin." });
  }

  const { id, status, internalNotes } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Thiếu ID đối tác cần cập nhật." });
  }

  const leads = loadLeads();
  const index = leads.findIndex((l: any) => l.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Không tìm thấy thông tin đối tác." });
  }

  if (status) leads[index].status = status;
  if (internalNotes !== undefined) leads[index].internalNotes = internalNotes;

  saveLeads(leads);
  res.json(leads[index]);
});

// 3. AI PARTNER PROGRAM ADVISOR (GEMINI API PROXY)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Thiếu lịch sử trò chuyện" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Chưa cấu hình API Key của Gemini. Admin vui lòng kiểm tra Settings > Secrets trong AI Studio."
      });
    }

    // Format chat history for @google/genai SDK
    // The SDK expects contents in structured formats. Simple message-based formatting:
    const formattedContents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    const systemInstruction = `
Bạn là "Trợ lý Đối Tác AI" vô cùng chuyên nghiệp, hiểu biết sâu sắc và hào hứng của SHAHA Việt Nam - nhà phân phối độc quyền chính thức hệ thống lọc tổng cao cấp RainSoft USA tại Việt Nam.

NHIỆM VỤ CỦA BẠN:
1. Tư vấn, hỗ trợ các đối tác tiềm năng (Kiến trúc sư, Showroom nội thất cao cấp, Tổng thầu MEP, Doanh nhân địa phương) hiểu rõ vì sao nên cùng SHAHA Việt Nam hợp tác kinh doanh dòng sản phẩm máy lọc tổng RainSoft cao cấp.
2. Giúp đối tác định hình cơ hội kinh doanh, giải đáp mức thu nhập tiềm năng, biên lợi nhuận, quy trình hỗ trợ đào tạo chuyên môn của SHAHA.
3. Luôn giữ thái độ chuyên nghiệp, lịch thiệp, đón tiếp đẳng cấp như một chuyên gia tư vấn cấp cao của thương hiệu luxury Mỹ từ 1953.

THÔNG TIN VỀ RAINSOFT & SHAHA VIỆT NAM ĐỂ BẠN TƯ VẤN:
- RainSoft USA: Thành lập từ 1953 tại Chicago, Mỹ. Là thương hiệu máy lọc nước tổng toàn nhà cao cấp bậc nhất thế giới.
- Định vị: Phân khúc cao cấp thượng lưu (Biệt thự, Dinh thự, Villa triệu đô, Penthouse, Căn hộ hạng sang).
- Công dụng: Xử lý nước sinh hoạt trung tâm cho cả căn nhà (bảo vệ da, tóc mịn màng không khô ráp, làm mềm nước triệt tiêu cặn canxi bám cứng, bảo vệ các thiết bị vệ sinh nhập khẩu châu Âu mạ vàng mạ crom đắt đỏ của gia chủ không bị hoen ố hư hại). Lọc thô, khử clo dư, hóa chất, kim loại nặng, mang lại dòng nước tinh khiết chảy mượt mà tới mọi vòi nước trong nhà.
- Điểm vượt trội khác biệt:
  * Cam kết bảo hành TRỌN ĐỜI (Lifetime Warranty) cho các chi tiết cốt lõi (bình lọc, van chia, vật liệu lọc nhựa trao đổi ion cao cấp) - điều mà chưa hãng lọc nước nào dám cam kết.
  * Van điều khiển tinh vi điều hướng bằng vi xử lý máy tính, đo lường lượng nước tiêu dùng thực tế để hoàn nguyên thông minh (mã EC5, QRS), cực kỳ tiết kiệm muối tái sinh và nước thải.
  * Vật liệu lọc chuẩn y học cao cấp được tổ chức WQA (Water Quality Association Mỹ) cấp chứng nhận cao nhất (Gold Seal).

CHÍNH SÁCH VÀ QUY TRÌNH HỖ TRỢ ĐỐI TÁC CỦA SHAHA VIỆT NAM (Rất Đặc Quyền):
1. Không đi lẻ bóng: SHAHA bao tiêu đào tạo kỹ nghệ test nước thực tế (Test Kit Mỹ), cho mượn vali demo sản phẩm cực sang xịn để đối tác đi chốt khách tại nhà.
2. Đào tạo 5 góc độ: Đào tạo công nghệ sản phẩm sâu sát; Đào tạo cách làm Demo Test Kit thuyết phục; Đào tạo Kỹ thuật lắp đặt mượt mà chuẩn thẩm mỹ Mỹ; Đào tạo thiết lập Showroom 3D trải nghiệm cao cấp; Đào tạo Marketing cung cấp trọn gói bài viết, video dự án, catalog, banner tờ rơi chuyên biệt bản địa hóa.
3. Đồng hành chốt đơn: SHAHA hỗ trợ cử chuyên gia cùng đối tác đi khảo sát, lên bản vẽ kỹ thuật, trực tiếp tư vấn chốt giùm đối tác 3-5 đơn hàng đầu tiên để tạo đà tự tin.
4. Lợi nhuận vượt trội: Biên lợi nhuận bán mới cao vì trị giá đơn hàng RainSoft rất lớn (phổ biến từ 150 triệu - 500 triệu đồng/hệ thống). Đồng thời còn mở ra nguồn thu thụ động vô tận từ dịch vụ bảo dưỡng, thay lõi lọc phụ trợ cao cấp hàng năm.

CÁCH TRẢ LỜI:
- Trả lời bằng tiếng Việt lịch sự, gãy gọn, sử dụng các ký hiệu Bullet point rõ ràng, trình bày sang trọng, chuyên nghiệp.
- Khi tư vấn xong, nếu thấy đối tác hứng thú, hãy khéo léo mời họ điền vào form đăng ký hợp tác ngay trên trang để nhận tài liệu chính sách chiết khấu chi tiết và được SHAHA liên hệ tư vấn 1-1.
- Không bịa đặt thông tin không có. Hãy luôn trung thành với các dữ liệu trên để giữ đẳng cấp thương hiệu.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Trợ lý đang gặp chút gián đoạn kỹ thuật nhỏ. Anh/Chị có thể vui lòng liên hệ trực tiếp hotline hoặc điền form thông tin hợp tác dưới đây để bộ phận chuyên trách SHAHA tư vấn ngay lập tức nhé!";
    res.json({ reply: replyText });
  } catch (err: any) {
    console.error("Gemini API Error details:", err);
    res.status(500).json({
      error: "Hệ thống AI đang khởi động hoặc bận. Vui lòng thử lại sau.",
      details: err.message
    });
  }
});

// START EXPRESS SERVER WITH VITE INTEGRATION
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SHAHA RainSoft Server] Sẵn sàng phục vụ tại http://localhost:${PORT}`);
  });
}

startServer();

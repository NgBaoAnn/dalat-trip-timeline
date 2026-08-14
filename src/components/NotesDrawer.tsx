import React from 'react';

interface NotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotesDrawer: React.FC<NotesDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#1F2421]/40 backdrop-blur-xs">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Content */}
      <div className="relative w-full max-w-lg bg-[#FDFBF7] h-full overflow-y-auto border-l border-[#1F2421] p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
        <div>
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4] mb-6">
            <div>
              <span className="text-[10px] font-mono text-[#71717A] tracking-widest uppercase block mb-0.5">
                CẨM NANG CHUYẾN ĐI
              </span>
              <h2 className="font-serif-title text-2xl font-bold text-[#1F2421]">
                GHI CHÚ & LƯU Ý
              </h2>
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-white border border-[#1F2421] text-[#1F2421] text-xs font-mono hover:bg-[#1F2421] hover:text-white transition-colors duration-150 cursor-pointer"
            >
              Đóng
            </button>
          </div>

          {/* Section 1: Weather & Outfits */}
          <div className="mb-6 bg-white p-4 border border-[#E7E5E4]">
            <h3 className="font-mono text-xs font-bold text-[#2D4A3E] uppercase tracking-wider mb-2">
              THỜI TIẾT & TRANG PHỤC
            </h3>
            <ul className="font-sans-body text-xs text-[#52525B] space-y-2 leading-relaxed">
              <li>• Buổi sáng sớm (03h00 – 06h00 săn mây) & buổi tối nhiệt độ hạ thấp ~15°C – 18°C. Canh áo ấm dày, khăn quàng, găng tay.</li>
              <li>• Ban ngày có nắng dịu ~22°C – 25°C, trang phục phong cách vintage nhẹ nhàng, đầm / áo khoác phong cách Đà Lạt.</li>
              <li>• Chuẩn bị ô/dù gấp gọn phòng các cơn mưa rào bất chợt vào buổi chiều.</li>
            </ul>
          </div>

          {/* Section 2: Accommodation & Check-in */}
          <div className="mb-6 bg-white p-4 border border-[#E7E5E4]">
            <h3 className="font-mono text-xs font-bold text-[#1F2421] uppercase tracking-wider mb-2">
              THÔNG TIN LƯU TRÚ
            </h3>
            <div className="font-sans-body text-xs text-[#52525B] space-y-1.5">
              <p><strong className="font-mono text-[#1F2421]">Khách sạn:</strong> Khách sạn Hương Anh</p>
              <p><strong className="font-mono text-[#1F2421]">Địa chỉ:</strong> 52 Mê Linh, Đà Lạt</p>
              <p><strong className="font-mono text-[#1F2421]">Giờ nhận phòng:</strong> 14h00 (Gửi đồ từ 07h00 sáng ngày 17/8)</p>
              <p><strong className="font-mono text-[#1F2421]">Giờ trả phòng:</strong> 12h00 ngày 19/8</p>
              <p><strong className="font-mono text-[#1F2421]">Lưu ý:</strong> Giữ trật tự sau 22h00 đêm để đảm bảo không gian yên tĩnh.</p>
            </div>
          </div>

          {/* Section 3: Motorbike Rental */}
          <div className="mb-6 bg-white p-4 border border-[#E7E5E4]">
            <h3 className="font-mono text-xs font-bold text-[#9C4129] uppercase tracking-wider mb-2">
              DI CHUYỂN & THUÊ XE
            </h3>
            <ul className="font-sans-body text-xs text-[#52525B] space-y-1.5 leading-relaxed">
              <li>• Nhận xe lúc 07h30 sáng 17/8 — Trả xe 10h00 sáng 19/8.</li>
              <li>• Kiểm tra kỹ hệ thống phanh (thắng), đèn xe và lốp xe trước khi lên đèo / đi săn mây.</li>
              <li>• Luôn đổ đầy xăng trước khi di chuyển xa đến Hồ Tuyền Lâm hoặc Cầu Đất.</li>
            </ul>
          </div>

          {/* Section 4: Special Tips for Couples */}
          <div className="mb-6 bg-[#FAF7F2] p-4 border border-[#E7E5E4]">
            <h3 className="font-mono text-xs font-bold text-[#2D4A3E] uppercase tracking-wider mb-2">
              GỢI Ý ĐẶC BIỆT CHO HAI NGƯỜI
            </h3>
            <p className="font-serif-sub italic text-sm text-[#3F3F46] leading-relaxed">
              "Thưởng thức bánh su kem Bà Nga khi ngắm hoàng hôn tại Túi Mơ To, và ghé quán lẩu bò nghi ngút khói giữa đêm lạnh Đà Lạt."
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E7E5E4] text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#1F2421] text-white text-xs font-mono tracking-widest uppercase hover:bg-[#2D4A3E] transition-colors duration-150 cursor-pointer"
          >
            Quay lại lịch trình
          </button>
        </div>

      </div>
    </div>
  );
};

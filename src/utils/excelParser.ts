import * as XLSX from 'xlsx';
import type { TimelineItem, CategoryKey, ActivityOption } from '../types/timeline';

// Rule-based category detector
export function detectCategory(text: string): { key: CategoryKey; label: string } {
  const str = text.toLowerCase();
  
  if (/ăn|lẩu|nướng|mì|phở|bánh|cháo|sữa|bắp|khoai|pizza|ramen|ẩm thực|quán dìn|mậu dịch|trạm nắng|gà hầm|huỳnh văn|meraki|yên/.test(str)) {
    return { key: 'AM_THUC', label: 'ẨM THỰC' };
  }
  if (/cà phê|cafe|chill|hoàng hôn|waken|cheo veo|reo|vùng ngoại ô|hidden land|túi mơ to|góc của tùng|chênh vênh/.test(str)) {
    return { key: 'CAFE', label: 'CAFE & THƯ GIÃN' };
  }
  if (/home|nghỉ ngơi|make up|thức dậy|về nghỉ|về home|dọn đồ/.test(str)) {
    return { key: 'LUU_TRU', label: 'LƯU TRÚ & NGHỈ NGƠI' };
  }
  if (/xe|lên xe|thuê xe|trả xe|di chuyển|về|đến đà lạt|thuê đồ|trang phục/.test(str)) {
    return { key: 'DI_CHUYEN', label: 'DI CHUYỂN' };
  }
  if (/săn mây|đồi|checkin|check in|tham quan|hồ xuân hương|viện sinh học|tháp vinaphone|bức tường|đường|làng mơ|măng lin|đập tràn|cầu đất|hòn bồ|cung đường|bắc âu/.test(str)) {
    return { key: 'THAM_QUAN', label: 'THAM QUAN' };
  }

  return { key: 'THAM_QUAN', label: 'THAM QUAN' };
}

// Fallback Mock Data matching the Da Lat trip schedule with multiple options
export const FALLBACK_TIMELINE_DATA: TimelineItem[] = [
  // DAY 1 (17/8)
  {
    id: 'item-1',
    dayKey: 'day-1',
    dayLabel: 'NGÀY 1',
    dateStr: '17/8',
    time: '12h35',
    mainActivity: 'Lên xe di chuyển',
    subActivity: 'Lên xe đi Đà Lạt (Chuyến trưa / đêm)',
    options: [
      { id: 'opt-1-1', name: 'Lên xe đi Đà Lạt', address: 'Bến xe Miền Đông / Phương Trang' }
    ],
    selectedOptionId: 'opt-1-1',
    address: 'Bến xe Miền Đông / Phương Trang',
    price: 580,
    note: 'Chuẩn bị áo khoác nhẹ, nước uống',
    category: 'DI_CHUYEN',
    categoryLabel: 'DI CHUYỂN',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-2',
    dayKey: 'day-1',
    dayLabel: 'NGÀY 1',
    dateStr: '17/8',
    time: '06h35',
    mainActivity: 'Đến Đà Lạt',
    subActivity: 'Đặt chân tới thành phố sương mù',
    options: [
      { id: 'opt-2-1', name: 'Đến Đà Lạt', address: 'Bến xe Đà Lạt (Đường 3/4)' }
    ],
    selectedOptionId: 'opt-2-1',
    address: 'Bến xe Đà Lạt (Đường 3/4)',
    price: null,
    note: 'Thời tiết buổi sáng se lạnh ~16°C',
    category: 'DI_CHUYEN',
    categoryLabel: 'DI CHUYỂN',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-3',
    dayKey: 'day-1',
    dayLabel: 'NGÀY 1',
    dateStr: '17/8',
    time: '07h00',
    mainActivity: 'Gửi đồ Homestay',
    subActivity: 'Đến homestay gửi hành lý',
    options: [
      { id: 'opt-3-1', name: 'Gửi đồ tại Khách sạn Hương Anh', address: 'Khách sạn Hương Anh (52 Mê Linh)' }
    ],
    selectedOptionId: 'opt-3-1',
    address: 'Trung tâm TP. Đà Lạt',
    price: 240,
    note: 'Gửi đồ & thay trang phục nhẹ nhàng',
    category: 'LUU_TRU',
    categoryLabel: 'LƯU TRÚ & NGHỈ NGƠI',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-4',
    dayKey: 'day-1',
    dayLabel: 'NGÀY 1',
    dateStr: '17/8',
    time: '07h30',
    mainActivity: 'Thuê xe máy',
    subActivity: 'Đi thuê xe máy 3 ngày',
    options: [
      { id: 'opt-4-1', name: 'Thuê xe máy', address: 'Điểm thuê xe (52 Mê Linh)' }
    ],
    selectedOptionId: 'opt-4-1',
    address: 'Điểm thuê xe (52 Mê Linh)',
    price: 120,
    note: 'Kiểm tra thắng, phuộc và đổ đầy xăng',
    category: 'DI_CHUYEN',
    categoryLabel: 'DI CHUYỂN',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-5',
    dayKey: 'day-1',
    dayLabel: 'NGÀY 1',
    dateStr: '17/8',
    time: '08h00',
    mainActivity: 'Ăn sáng nạp năng lượng',
    subActivity: 'Bánh mì xíu mại 79 / Bánh ướt lòng gà Thảo',
    options: [
      { id: 'opt-5-1', name: 'Bánh mì xíu mại 79', address: '79 Bùi Thị Xuân, Phường 2, Đà Lạt', note: 'Xíu mại cay nóng thơm ngon' },
      { id: 'opt-5-2', name: 'Bánh ướt lòng gà Thảo / Long', address: '28 Tăng Bạt Hổ, Phường 1, Đà Lạt', note: 'Bánh ướt mềm dẻo gỏi gà đậm vị' }
    ],
    selectedOptionId: 'opt-5-1',
    address: '79 Bùi Thị Xuân / 28 Tăng Bạt Hổ',
    price: 50,
    note: 'Món ăn nóng hổi thích hợp cho buổi sáng lạnh',
    category: 'AM_THUC',
    categoryLabel: 'ẨM THỰC',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-6',
    dayKey: 'day-1',
    dayLabel: 'NGÀY 1',
    dateStr: '17/8',
    time: '09h00',
    mainActivity: 'Thuê đồ trang phục',
    subActivity: 'Thuê đồ concept chụp ảnh',
    options: [
      { id: 'opt-6-1', name: 'Thuê đồ concept vintage', address: 'Tiệm thuê đồ Đà Lạt' }
    ],
    selectedOptionId: 'opt-6-1',
    address: 'Tiệm thuê đồ concept Đà Lạt',
    price: null,
    note: 'Lựa chọn outfit chụp hình sống ảo',
    category: 'DI_CHUYEN',
    categoryLabel: 'DI CHUYỂN',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-7',
    dayKey: 'day-1',
    dayLabel: 'NGÀY 1',
    dateStr: '17/8',
    time: '10h30',
    mainActivity: 'Đợi check-in home & Cafe',
    subActivity: 'Đi dạo hồ Xuân Hương / Cafe Tùng / Viện sinh học',
    options: [
      { id: 'opt-7-1', name: 'Đi dạo Hồ Xuân Hương', address: 'Hồ Xuân Hương, Đà Lạt' },
      { id: 'opt-7-2', name: 'Cà phê Góc Của Tùng', address: '6 Khu Hòa Bình, Đà Lạt', note: 'Quán cà phê hoài niệm cổ kính' },
      { id: 'opt-7-3', name: 'Viện Sinh Học Đà Lạt', address: '116 Xô Viết Nghệ Tĩnh, Phường 7, Đà Lạt' },
      { id: 'opt-7-4', name: 'Quán cafe bất kỳ quanh trung tâm', address: 'Trung tâm TP. Đà Lạt' }
    ],
    selectedOptionId: 'opt-7-1',
    address: 'Hồ Xuân Hương, Đà Lạt',
    price: 50,
    note: 'Thư giãn đợi giờ check-in phòng',
    category: 'CAFE',
    categoryLabel: 'CAFE & THƯ GIÃN',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-8',
    dayKey: 'day-1',
    dayLabel: 'NGÀY 1',
    dateStr: '17/8',
    time: '12h40',
    mainActivity: 'Ăn trưa',
    subActivity: 'Tiệm mì Yên / Sườn cay khổng lồ / Cháo hàu Huỳnh Văn / Tiệm mì Meraki',
    options: [
      { id: 'opt-8-1', name: 'Tiệm mì Yên', address: '227 Hai Bà Trưng, Phường 6, Đà Lạt', note: 'Mì tươi thủ công ấm vị' },
      { id: 'opt-8-2', name: 'Sườn cay khổng lồ', address: 'Trung tâm Đà Lạt' },
      { id: 'opt-8-3', name: 'Cháo hàu Huỳnh Văn', address: 'Huỳnh Văn, Đà Lạt' },
      { id: 'opt-8-4', name: 'Tiệm mì Meraki', address: 'Meraki Đà Lạt' }
    ],
    selectedOptionId: 'opt-8-1',
    address: 'Trung tâm Đà Lạt',
    price: 100,
    note: 'Nhiều tùy chọn món ăn ngon miệng',
    category: 'AM_THUC',
    categoryLabel: 'ẨM THỰC',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-9',
    dayKey: 'day-1',
    dayLabel: 'NGÀY 1',
    dateStr: '17/8',
    time: '14h00',
    mainActivity: 'Về home nghỉ ngơi',
    subActivity: 'Về homestay nhận phòng, trang điểm',
    options: [
      { id: 'opt-9-1', name: 'Nhận phòng & nghỉ ngơi', address: 'Khách sạn Hương Anh (52 Mê Linh)' }
    ],
    selectedOptionId: 'opt-9-1',
    address: 'Khách sạn Hương Anh (52 Mê Linh)',
    price: null,
    note: 'Nạp lại năng lượng cho buổi chiều tối',
    category: 'LUU_TRU',
    categoryLabel: 'LƯU TRÚ & NGHỈ NGƠI',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-10',
    dayKey: 'day-1',
    dayLabel: 'NGÀY 1',
    dateStr: '17/8',
    time: '16h30',
    mainActivity: 'Cà phê hoàng hôn & Check-in',
    subActivity: 'Túi Mơ To / Hidden Land / Vùng Ngoại Ô Cafe / Nhà Của Thông',
    options: [
      { id: 'opt-10-1', name: 'Túi Mơ To', address: 'Hẻm 31 Sào Nam, Phường 11, Đà Lạt', note: 'Mua bánh su kem Bà Nga thưởng thức kèm' },
      { id: 'opt-10-2', name: 'Hidden Land', address: 'Đà Lạt', note: 'Cameles Dalat' },
      { id: 'opt-10-3', name: 'Vùng Ngoại Ô Cafe', address: 'Ngoại ô Đà Lạt' },
      { id: 'opt-10-4', name: 'Tiệm Cà Phê Nhà Của Thông', address: 'Đà Lạt' }
    ],
    selectedOptionId: 'opt-10-1',
    address: 'Hẻm 31 Sào Nam / Phường 11',
    price: 50,
    note: 'Mua bánh su kem bà nga',
    category: 'CAFE',
    categoryLabel: 'CAFE & THƯ GIÃN',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-11',
    dayKey: 'day-1',
    dayLabel: 'NGÀY 1',
    dateStr: '17/8',
    time: '19h00',
    mainActivity: 'Ăn tối lẩu & nướng',
    subActivity: 'Lẩu bò Ba Toa Quán Dìn / Trạm Dừng Chill / Mậu Dịch / Trạm Nắng BBQ',
    options: [
      { id: 'opt-11-1', name: 'Lẩu bò Ba Toa Quán Dìn / Phan Rang', address: '1/29 Hoàng Diệu, Phường 5, Đà Lạt', note: 'Lẩu bò nghi ngút khói đậm đà' },
      { id: 'opt-11-2', name: 'Tiệm Nướng Trạm Dừng Chill', address: 'Đà Lạt' },
      { id: 'opt-11-3', name: 'Cửa Hàng Nướng Mậu Dịch', address: '28B Trần Hưng Đạo, Đà Lạt' },
      { id: 'opt-11-4', name: 'Trạm Nắng BBQ', address: 'Đà Lạt' }
    ],
    selectedOptionId: 'opt-11-1',
    address: '1/29 Hoàng Diệu, Phường 5',
    price: 200,
    note: 'Lẩu bò nghi ngút khói giữa không khí se lạnh',
    category: 'AM_THUC',
    categoryLabel: 'ẨM THỰC',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-12',
    dayKey: 'day-1',
    dayLabel: 'NGÀY 1',
    dateStr: '17/8',
    time: '20h00',
    mainActivity: 'Đi dạo & Ăn vặt chợ đêm',
    subActivity: 'Check-in Tháp Vinaphone / Bánh tráng nướng cô Hạnh / Chạm Photobooth / Khô bò cô Linh',
    options: [
      { id: 'opt-12-1', name: 'Checkin Tháp Vinaphone', address: 'Trung tâm TP. Đà Lạt' },
      { id: 'opt-12-2', name: 'Bánh tráng nướng cô Hạnh', address: 'Khu vực Chợ Đêm Đà Lạt' },
      { id: 'opt-12-3', name: 'Chạm Photobooth', address: 'Trung tâm Đà Lạt' },
      { id: 'opt-12-4', name: 'Khô bò nướng cô Linh', address: 'Chợ Đà Lạt' }
    ],
    selectedOptionId: 'opt-12-1',
    address: 'Khu vực Chợ Đêm Đà Lạt',
    price: 50,
    note: 'Trải nghiệm nhịp sống ban đêm lãng mạn',
    category: 'AM_THUC',
    categoryLabel: 'ẨM THỰC',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-13',
    dayKey: 'day-1',
    dayLabel: 'NGÀY 1',
    dateStr: '17/8',
    time: '22h00',
    mainActivity: 'Về home nghỉ ngơi',
    subActivity: 'Về homestay nghỉ sớm',
    options: [
      { id: 'opt-13-1', name: 'Về home nghỉ', address: 'Khách sạn Hương Anh (52 Mê Linh)' }
    ],
    selectedOptionId: 'opt-13-1',
    address: 'Khách sạn Hương Anh (52 Mê Linh)',
    price: null,
    note: 'Đặt báo thức 03h00 sáng săn mây',
    category: 'LUU_TRU',
    categoryLabel: 'LƯU TRÚ & NGHỈ NGƠI',
    isBackup: false,
    completed: false
  },

  // DAY 2 (18/8)
  {
    id: 'item-14',
    dayKey: 'day-2',
    dayLabel: 'NGÀY 2',
    dateStr: '18/8',
    time: '03h00',
    mainActivity: 'Thức dậy & Make up',
    subActivity: 'Thức dậy, giữ ấm chuẩn bị săn mây',
    options: [
      { id: 'opt-14-1', name: 'Thức dậy make up', address: 'Khách sạn Hương Anh (52 Mê Linh)' }
    ],
    selectedOptionId: 'opt-14-1',
    address: 'Khách sạn Hương Anh (52 Mê Linh)',
    price: null,
    note: 'Mặc ấm: Áo len, khăn quàng, găng tay',
    category: 'LUU_TRU',
    categoryLabel: 'LƯU TRÚ & NGHỈ NGƠI',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-15',
    dayKey: 'day-2',
    dayLabel: 'NGÀY 2',
    dateStr: '18/8',
    time: '04h30',
    mainActivity: 'Săn mây & Bình minh',
    subActivity: 'Đồi Đa Phú / Săn mây Cầu Gỗ / Đồi cỏ Mây / Đồi cỏ Hồng',
    options: [
      { id: 'opt-15-1', name: 'Đồi Đa Phú (Gió lớn)', address: 'Phường 7, TP. Đà Lạt', note: 'Đỉnh đồi ngắm biển mây gió lộng' },
      { id: 'opt-15-2', name: 'Săn Mây Cầu Gỗ - Bình Minh (Gió lặng)', address: 'Cầu Đất, Đà Lạt', note: 'Thảm gỗ mây bồng bềnh êm đềm' },
      { id: 'opt-15-3', name: 'Đồi cỏ Mây', address: 'Phường 7, Đà Lạt' },
      { id: 'opt-15-4', name: 'Đồi cỏ Hồng', address: 'Khu vực hồ Tuyền Lâm / Suối Vàng' }
    ],
    selectedOptionId: 'opt-15-1',
    address: 'Phường 7, TP. Đà Lạt',
    price: 50,
    note: 'Biển mây bồng bềnh kỳ ảo lúc rạng đông',
    category: 'THAM_QUAN',
    categoryLabel: 'THAM QUAN',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-16',
    dayKey: 'day-2',
    dayLabel: 'NGÀY 2',
    dateStr: '18/8',
    time: '08h00',
    mainActivity: 'Ăn sáng nạp năng lượng',
    subActivity: 'Miến phở Nguyễn Gia / Bánh cuốn Ông Sĩ',
    options: [
      { id: 'opt-16-1', name: 'Miến phở Nguyễn Gia', address: 'Đà Lạt', note: 'Nước dùng đậm đà ấm bụng' },
      { id: 'opt-16-2', name: 'Bánh cuốn Ông Sĩ', address: '1 Trần Bình Trọng, Phường 5, Đà Lạt', note: 'Bánh cuốn nóng nổi tiếng' }
    ],
    selectedOptionId: 'opt-16-1',
    address: 'Trung tâm TP. Đà Lạt',
    price: 50,
    note: 'Thưởng thức bữa sáng nóng ấm sau chuyến săn mây',
    category: 'AM_THUC',
    categoryLabel: 'ẨM THỰC',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-17',
    dayKey: 'day-2',
    dayLabel: 'NGÀY 2',
    dateStr: '18/8',
    time: '09h00',
    mainActivity: 'Tham quan địa điểm thơ mộng',
    subActivity: 'Floating Town / Cổ Làng Mơ / Đồi Măng Lin / Đường Nguyễn Khuyến',
    options: [
      { id: 'opt-17-1', name: 'Floating Town', address: 'Đà Lạt' },
      { id: 'opt-17-2', name: 'Cổ Làng Mơ', address: 'Đà Lạt' },
      { id: 'opt-17-3', name: 'Đồi Măng Lin', address: 'Phường 7, Đà Lạt' },
      { id: 'opt-17-4', name: 'Đường Nguyễn Khuyến', address: 'Đường Nguyễn Khuyến, Phường 5, Đà Lạt' }
    ],
    selectedOptionId: 'opt-17-1',
    address: 'Khu vực ngoại ô Đà Lạt',
    price: 50,
    note: 'Không gian yên bình, ngập tràn sắc hoa',
    category: 'THAM_QUAN',
    categoryLabel: 'THAM QUAN',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-18',
    dayKey: 'day-2',
    dayLabel: 'NGÀY 2',
    dateStr: '18/8',
    time: '11h30',
    mainActivity: 'Ăn trưa',
    subActivity: 'Pizza Burrata / Yod Thong / Wari Wari Ramen',
    options: [
      { id: 'opt-18-1', name: 'Pizza Burrata', address: 'Đà Lạt', note: 'Pizza phô mai Burrata ngậy béo' },
      { id: 'opt-18-2', name: 'Yod Thong (Món Thái)', address: 'Đà Lạt' },
      { id: 'opt-18-3', name: 'Wari Wari Ramen', address: 'Đà Lạt' }
    ],
    selectedOptionId: 'opt-18-1',
    address: 'Trung tâm Đà Lạt',
    price: 100,
    note: 'Trải nghiệm ẩm thực Ý, Thái hoặc Nhật',
    category: 'AM_THUC',
    categoryLabel: 'ẨM THỰC',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-19',
    dayKey: 'day-2',
    dayLabel: 'NGÀY 2',
    dateStr: '18/8',
    time: '12h30',
    mainActivity: 'Về home nghỉ trưa',
    subActivity: 'Nghỉ ngơi nạp lại sức',
    options: [
      { id: 'opt-19-1', name: 'Về home nghỉ trưa', address: 'Khách sạn Hương Anh (52 Mê Linh)' }
    ],
    selectedOptionId: 'opt-19-1',
    address: 'Khách sạn Hương Anh (52 Mê Linh)',
    price: null,
    note: 'Nghỉ ngơi tránh nắng trưa',
    category: 'LUU_TRU',
    categoryLabel: 'LƯU TRÚ & NGHỈ NGƠI',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-20',
    dayKey: 'day-2',
    dayLabel: 'NGÀY 2',
    dateStr: '18/8',
    time: '14h00',
    mainActivity: 'Check-in cung đường đẹp',
    subActivity: 'Đập tràn Hồ Tuyền Lâm / Hầm hỏa xa / Bức tường Hàn Quốc / Cung đường Hoa / Ankroet / Cầu Đất',
    options: [
      { id: 'opt-20-1', name: 'Đập tràn Hồ Tuyền Lâm', address: 'Hồ Tuyền Lâm, Đà Lạt' },
      { id: 'opt-20-2', name: 'Đường hầm hỏa xa Đà Lạt', address: 'QL20, Xuân Thọ, Đà Lạt' },
      { id: 'opt-20-3', name: 'Bức tường Hàn Quốc', address: 'đường Cô Giang, Đà Lạt' },
      { id: 'opt-20-4', name: 'Cung đường Hoa', address: 'đường Vạn Hạnh, Đà Lạt' },
      { id: 'opt-20-5', name: 'Cung đường Ankroet', address: 'Ankroet, Đà Lạt' },
      { id: 'opt-20-6', name: 'Đồi chè Cầu Đất', address: 'Xuân Trường, Đà Lạt' },
      { id: 'opt-20-7', name: 'Đồi Thống Nhất', address: 'Đà Lạt' },
      { id: 'opt-20-8', name: 'Hòn Bồ', address: 'Phường 12, Đà Lạt' },
      { id: 'opt-20-9', name: 'Cung đường Bắc Âu', address: 'Đà Lạt' }
    ],
    selectedOptionId: 'opt-20-1',
    address: 'Hồ Tuyền Lâm & Cầu Đất',
    price: 0,
    note: 'Những cung đường thiên nhiên đẹp nhất Đà Lạt',
    category: 'THAM_QUAN',
    categoryLabel: 'THAM QUAN',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-21',
    dayKey: 'day-2',
    dayLabel: 'NGÀY 2',
    dateStr: '18/8',
    time: '16h30',
    mainActivity: 'Cà phê chiều ngắm núi',
    subActivity: 'Linh Lam / Reo / Cheo Veo / Waken Beans',
    options: [
      { id: 'opt-21-1', name: 'Linh Lam Cafe', address: 'Đà Lạt' },
      { id: 'opt-21-2', name: 'Reo Cafe', address: 'Đà Lạt' },
      { id: 'opt-21-3', name: 'Tiệm Cà Phê Cheo Veo', address: 'Hẻm Dã Chiến, Phường 11, Đà Lạt', note: 'View ngắm thung lũng đồi núi thơ mộng' },
      { id: 'opt-21-4', name: 'Waken Beans', address: 'Đà Lạt' }
    ],
    selectedOptionId: 'opt-21-1',
    address: 'Hẻm Dã Chiến / Phường 11',
    price: 50,
    note: 'Thưởng thức cà phê chiều trong không gian lãng mạn',
    category: 'CAFE',
    categoryLabel: 'CAFE & THƯ GIÃN',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-22',
    dayKey: 'day-2',
    dayLabel: 'NGÀY 2',
    dateStr: '18/8',
    time: '19h00',
    mainActivity: 'Ăn tối món nướng & gà hầm',
    subActivity: 'Khoai lang nướng / Túi Nướng Lavender / Gà hầm Thố Đá',
    options: [
      { id: 'opt-22-1', name: 'Khoai lang nướng', address: 'Chợ Đà Lạt' },
      { id: 'opt-22-2', name: 'Túi Nướng Lavender', address: 'Đà Lạt' },
      { id: 'opt-22-3', name: 'Gà hầm Thố Đá', address: '22 Yersin, Phường 10, Đà Lạt', note: 'Món ăn bổ dưỡng ấm sực chiều lạnh' }
    ],
    selectedOptionId: 'opt-22-1',
    address: '22 Yersin, Phường 10',
    price: 200,
    note: 'Gà hầm thố đá thơm lừng ngấm vị thuốc bắc',
    category: 'AM_THUC',
    categoryLabel: 'ẨM THỰC',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-23',
    dayKey: 'day-2',
    dayLabel: 'NGÀY 2',
    dateStr: '18/8',
    time: '20h00',
    mainActivity: 'Quà đêm & Cafe chill',
    subActivity: 'Ông chú bán bắp / Sữa cô Nguyệt / Chênh Vênh / Tiệm bánh lửng mật',
    options: [
      { id: 'opt-23-1', name: 'Ông chú bán bắp nướng', address: 'Chợ Đêm Đà Lạt' },
      { id: 'opt-23-2', name: 'Sữa cô Nguyệt', address: 'Tăng Bạt Hổ, Đà Lạt' },
      { id: 'opt-23-3', name: 'Chênh Vênh Cafe', address: 'Dã Chiến, Đà Lạt' },
      { id: 'opt-23-4', name: 'Tiệm bánh Lửng Mật', address: 'Đà Lạt' }
    ],
    selectedOptionId: 'opt-23-1',
    address: 'Khu vực Chợ Đêm & Tăng Bạt Hổ',
    price: 50,
    note: 'Ly sữa đậu nành nóng hổi cùng bánh ngọt thơm phức',
    category: 'AM_THUC',
    categoryLabel: 'ẨM THỰC',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-24',
    dayKey: 'day-2',
    dayLabel: 'NGÀY 2',
    dateStr: '18/8',
    time: '22h00',
    mainActivity: 'Về home nghỉ ngơi',
    subActivity: 'Về homestay nghỉ ngơi',
    options: [
      { id: 'opt-24-1', name: 'Về home nghỉ', address: 'Khách sạn Hương Anh (52 Mê Linh)' }
    ],
    selectedOptionId: 'opt-24-1',
    address: 'Khách sạn Hương Anh (52 Mê Linh)',
    price: null,
    note: 'Tận hưởng khoảnh khắc bình yên',
    category: 'LUU_TRU',
    categoryLabel: 'LƯU TRÚ & NGHỈ NGƠI',
    isBackup: false,
    completed: false
  },

  // DAY 3 (19/8)
  {
    id: 'item-25',
    dayKey: 'day-3',
    dayLabel: 'NGÀY 3',
    dateStr: '19/8',
    time: '08h00',
    mainActivity: 'Ăn sáng thong thả',
    subActivity: 'Bữa sáng thong dong ngày cuối',
    options: [
      { id: 'opt-25-1', name: 'Ăn sáng thong thả', address: 'Trung tâm TP. Đà Lạt' }
    ],
    selectedOptionId: 'opt-25-1',
    address: 'Trung tâm TP. Đà Lạt',
    price: null,
    note: 'Tận hưởng buổi sáng thong thả',
    category: 'AM_THUC',
    categoryLabel: 'ẨM THỰC',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-26',
    dayKey: 'day-3',
    dayLabel: 'NGÀY 3',
    dateStr: '19/8',
    time: '09h00',
    mainActivity: 'Dạo phố & Mua quà',
    subActivity: 'Tản bộ ngắm phố xá, mua quà',
    options: [
      { id: 'opt-26-1', name: 'Mua quà đặc sản Đà Lạt', address: 'Chợ Đà Lạt & Các cửa hàng đặc sản' }
    ],
    selectedOptionId: 'opt-26-1',
    address: 'Chợ Đà Lạt & Các cửa hàng đặc sản',
    price: null,
    note: 'Gợi ý: Mua mứt dâu, râu atiso, hồng treo gió',
    category: 'THAM_QUAN',
    categoryLabel: 'THAM QUAN',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-27',
    dayKey: 'day-3',
    dayLabel: 'NGÀY 3',
    dateStr: '19/8',
    time: '10h00',
    mainActivity: 'Dọn đồ & Trả xe máy',
    subActivity: 'Kiểm tra hành lý, trả xe máy',
    options: [
      { id: 'opt-27-1', name: 'Trả xe máy & dọn đồ', address: 'Homestay & Điểm thuê xe' }
    ],
    selectedOptionId: 'opt-27-1',
    address: 'Homestay & Điểm thuê xe',
    price: null,
    note: 'Kiểm tra kỹ tư trang cá nhân trước khi di chuyển',
    category: 'DI_CHUYEN',
    categoryLabel: 'DI CHUYỂN',
    isBackup: false,
    completed: false
  },
  {
    id: 'item-28',
    dayKey: 'day-3',
    dayLabel: 'NGÀY 3',
    dateStr: '19/8',
    time: '12h00',
    mainActivity: 'Tạm biệt Đà Lạt',
    subActivity: 'Lên xe trở về — Kết thúc chuyến đi lãng mạn',
    options: [
      { id: 'opt-28-1', name: 'Lên xe về', address: 'Bến xe Đà Lạt' }
    ],
    selectedOptionId: 'opt-28-1',
    address: 'Bến xe Đà Lạt',
    price: null,
    note: 'Lưu giữ những kỷ niệm tuyệt đẹp bên nhau',
    category: 'DI_CHUYEN',
    categoryLabel: 'DI CHUYỂN',
    isBackup: false,
    completed: false
  },

  // BACKUP & OPTIONAL SPOTS
  {
    id: 'item-29',
    dayKey: 'backup',
    dayLabel: 'DỰ PHÒNG',
    dateStr: 'Tự do',
    time: 'Tự do',
    mainActivity: 'Bánh tráng nướng Dì Đinh',
    subActivity: 'Bánh tráng nướng giòn thơm đặc sắc',
    options: [
      { id: 'opt-29-1', name: 'Bánh tráng nướng Dì Đinh', address: '26 Hoàng Diệu, Phường 5, Đà Lạt' }
    ],
    selectedOptionId: 'opt-29-1',
    address: '26 Hoàng Diệu, Phường 5, Đà Lạt',
    price: null,
    note: 'Địa điểm dự phòng khi thèm ăn vặt buổi chiều',
    category: 'AM_THUC',
    categoryLabel: 'ẨM THỰC',
    isBackup: true,
    completed: false
  },
  {
    id: 'item-30',
    dayKey: 'backup',
    dayLabel: 'DỰ PHÒNG',
    dateStr: 'Tự do',
    time: 'Tự do',
    mainActivity: 'Gà nướng Chú Xuỳnh',
    subActivity: 'Gà nướng cơm lam thơm nức mũi',
    options: [
      { id: 'opt-30-1', name: 'Gà nướng Chú Xuỳnh', address: '21 A hẻm 28 Yersin, Phường 10, Đà Lạt' }
    ],
    selectedOptionId: 'opt-30-1',
    address: '21 A hẻm 28 Yersin, Phường 10, Đà Lạt',
    price: null,
    note: 'Gợi ý món ăn ngon cho buổi trưa / tối',
    category: 'AM_THUC',
    categoryLabel: 'ẨM THỰC',
    isBackup: true,
    completed: false
  },
  {
    id: 'item-31',
    dayKey: 'backup',
    dayLabel: 'DỰ PHÒNG',
    dateStr: 'Tự do',
    time: 'Tự do',
    mainActivity: 'Cà phê Bình Minh Tải',
    subActivity: 'Góc ngắm toàn cảnh thành phố từ trên cao',
    options: [
      { id: 'opt-31-1', name: 'Cà phê Bình Minh Tải', address: 'Đường Hùng Vương, Đà Lạt' }
    ],
    selectedOptionId: 'opt-31-1',
    address: 'Đường Hùng Vương, Đà Lạt',
    price: null,
    note: 'Quán cafe view siêu thoáng đãng',
    category: 'CAFE',
    categoryLabel: 'CAFE & THƯ GIÃN',
    isBackup: true,
    completed: false
  },
  {
    id: 'item-32',
    dayKey: 'backup',
    dayLabel: 'DỰ PHÒNG',
    dateStr: 'Tự do',
    time: 'Tự do',
    mainActivity: 'Kem bơ Thanh Thảo',
    subActivity: 'Kem bơ béo ngậy chuẩn vị Đà Lạt',
    options: [
      { id: 'opt-32-1', name: 'Kem bơ Thanh Thảo', address: '76 Nguyễn Văn Trỗi, Phường 2, Đà Lạt' }
    ],
    selectedOptionId: 'opt-32-1',
    address: '76 Nguyễn Văn Trỗi, Phường 2, Đà Lạt',
    price: null,
    note: 'Món tráng miệng kinh điển không thể bỏ qua',
    category: 'AM_THUC',
    categoryLabel: 'ẨM THỰC',
    isBackup: true,
    completed: false
  }
];

// Smart Excel File Parser that groups option rows into ActivityOptions
export function parseExcelBuffer(buffer: ArrayBuffer): TimelineItem[] {
  try {
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const rows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, { defval: '' });
    
    if (!rows || rows.length === 0) {
      return FALLBACK_TIMELINE_DATA;
    }

    const groupedItems: TimelineItem[] = [];
    let currentDayStr = 'NGÀY 1';
    let currentDateStr = '17/8';

    let currentItem: TimelineItem | null = null;

    rows.forEach((row, index) => {
      const dayVal = String(row['Ngày'] || row['NGÀY'] || row['Day'] || '').trim();
      const timeVal = String(row['Giờ'] || row['GIỜ'] || row['Time'] || '').trim();
      const mainActVal = String(row['Hoạt động chính'] || row['HOẠT ĐỘNG CHÍNH'] || '').trim();
      const subActVal = String(row['Hoạt động'] || row['Hoạt động / Gợi ý'] || row['HOẠT ĐỘNG'] || row['Activity'] || '').trim();
      const addrVal = String(row['Địa chỉ'] || row['ĐỊA CHỈ'] || row['Address'] || '').trim();
      const priceVal = row['Giá'] || row['Chi phí (k VNĐ)'] || row['CHI PHÍ'] || null;
      const noteVal = String(row['Ghi chú'] || row['GHI CHÚ'] || row['Note'] || '').trim();

      // Track Day & Date
      if (dayVal.includes('17/08') || dayVal.includes('17/8') || dayVal.toLowerCase().includes('ngày 1')) {
        currentDayStr = 'NGÀY 1';
        currentDateStr = '17/8';
      } else if (dayVal.includes('18/08') || dayVal.includes('18/8') || dayVal.toLowerCase().includes('ngày 2')) {
        currentDayStr = 'NGÀY 2';
        currentDateStr = '18/8';
      } else if (dayVal.includes('19/08') || dayVal.includes('19/8') || dayVal.toLowerCase().includes('ngày 3')) {
        currentDayStr = 'NGÀY 3';
        currentDateStr = '19/8';
      }

      const isUnscheduled = !timeVal && !dayVal && !mainActVal && subActVal;

      let dayKey = 'day-1';
      if (isUnscheduled) {
        dayKey = 'backup';
      } else if (currentDayStr.includes('1') || currentDateStr === '17/8') {
        dayKey = 'day-1';
      } else if (currentDayStr.includes('2') || currentDateStr === '18/8') {
        dayKey = 'day-2';
      } else if (currentDayStr.includes('3') || currentDateStr === '19/8') {
        dayKey = 'day-3';
      }

      // If this row starts a new time block or main activity
      if (timeVal || mainActVal || isUnscheduled || !currentItem) {
        if (currentItem && (currentItem as TimelineItem).options.length > 0) {
          groupedItems.push(currentItem as TimelineItem);
        }

        const combinedText = `${mainActVal} ${subActVal}`;
        const catInfo = detectCategory(combinedText);
        const parsedPrice = typeof priceVal === 'number' ? priceVal : (parseInt(String(priceVal), 10) || null);

        const itemId = `parsed-item-${index}-${Date.now()}`;
        const initialOptionId = `opt-${index}-0`;

        const initialOption: ActivityOption = {
          id: initialOptionId,
          name: subActVal || mainActVal,
          address: addrVal || null,
          note: noteVal || null
        };

        currentItem = {
          id: itemId,
          dayKey,
          dayLabel: isUnscheduled ? 'DỰ PHÒNG' : currentDayStr,
          dateStr: isUnscheduled ? 'Tự do' : currentDateStr,
          time: timeVal || 'Tự do',
          mainActivity: mainActVal || subActVal,
          subActivity: subActVal,
          options: subActVal ? [initialOption] : [],
          selectedOptionId: initialOptionId,
          address: addrVal || null,
          price: parsedPrice,
          note: noteVal || null,
          category: catInfo.key,
          categoryLabel: catInfo.label,
          isBackup: Boolean(isUnscheduled),
          completed: false
        };
      } else if (currentItem && subActVal) {
        // Subsequent option under the same time block!
        const target = currentItem as TimelineItem;
        const optionId = `opt-${index}-${target.options.length}`;
        target.options.push({
          id: optionId,
          name: subActVal,
          address: addrVal || null,
          note: noteVal || null
        });
      }
    });

    if (currentItem && (currentItem as TimelineItem).options.length > 0) {
      groupedItems.push(currentItem as TimelineItem);
    }

    return groupedItems.length > 0 ? groupedItems : FALLBACK_TIMELINE_DATA;

  } catch (error) {
    console.error('Error parsing Excel buffer:', error);
    return FALLBACK_TIMELINE_DATA;
  }
}


// 100% Comprehensive Image Mapper for ALL Da Lat trip activity candidate options
export function getSpotImage(name: string): string {
  if (!name || !name.trim()) return '/images/ho_xuan_huong.jpg';
  const s = name.toLowerCase().trim();

  // Breakfast & Noodles & Baguettes
  if (/xíu mại|bánh mì/.test(s)) return '/images/banh_mi_xiu_mai.jpg';
  if (/bánh ướt|lòng gà|bánh cuốn|nguyễn gia|nem nướng/.test(s)) return '/images/banh_uot_long_ga.jpg';
  if (/mì yên|meraki|cháo hàu|sườn cay|ramen|yod thong|wari/.test(s)) return '/images/banh_mi_xiu_mai.jpg';

  // Night Market & Street Food & Desserts
  if (/bánh tráng nướng|cô hạnh|khô bò|chợ đà lạt|khoai lang|bắp|ông chú|dì đinh|pizza/.test(s)) return '/images/banh_trang_nuong.jpg';
  if (/sữa cô nguyệt|lửng mật|kem bơ|thanh thảo|bánh su/.test(s)) return '/images/kem_bo_thanh_thao.jpg';
  if (/gà hầm|thố đá|chú xuỳnh/.test(s)) return '/images/ga_ham_tho_da.jpg';

  // Hotpots & BBQ Dinners
  if (/lẩu bò|ba toa|mậu dịch|trạm dừng chill|trạm nắng|túi nướng|bbq|nướng/.test(s)) return '/images/lau_bo_ba_toa.jpg';

  // Cloud Hunting & Hills
  if (/đồi đa phú|cầu gỗ|cỏ mây|cỏ hồng|thống nhất|hòn bồ|săn mây/.test(s)) return '/images/san_may_da_phu.jpg';
  if (/cầu đất|măng lin|cung đường hoa/.test(s)) return '/images/doi_che_cau_dat.jpg';

  // Lakes & Scenic Spillway Waterfalls
  if (/floating town|đập tràn|hồ tuyền lâm|ankroet|bắc âu/.test(s)) return '/images/dap_tran_tuyen_lam.jpg';
  if (/hồ xuân hương|vinaphone|nguyễn khuyến|photobooth/.test(s)) return '/images/ho_xuan_huong.jpg';

  // Vintage Check-ins & Tunnels
  if (/viện sinh học|hầm hoả xa|bức tường|nghỉ ngơi|home|khóa|flex/.test(s)) return '/images/ham_hoa_xa.jpg';

  // Cafes & Tea Houses
  if (/cheo veo|linh lam|reo|hidden land|vùng ngoại ô|chênh vênh|bình minh tải/.test(s)) return '/images/cheo_veo_cafe.jpg';
  if (/túi mơ to|nhà của thông|waken|cổ làng mơ|gai|góc của tùng|cafe|cà phê/.test(s)) return '/images/tui_mo_to_cafe.jpg';

  // Default fallback to iconic Lake image
  return '/images/ho_xuan_huong.jpg';
}

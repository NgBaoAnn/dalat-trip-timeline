import React, { useState, useMemo } from 'react';
import type { CuratedSpot } from '../types/timeline';
import { getSpotImage } from '../utils/imageMapper';

interface CuratedTableViewProps {
  type: 'FOOD' | 'CAFE' | 'FREE';
  spots: CuratedSpot[];
  onBackToTimeline: () => void;
}

export const CuratedTableView: React.FC<CuratedTableViewProps> = ({
  type,
  spots,
  onBackToTimeline,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getTitleInfo = () => {
    switch (type) {
      case 'FOOD':
        return {
          tag: 'BẢNG ẨM THỰC',
          title: 'DANH SÁCH QUÁN ĂN & MÓN NGON',
          sub: 'Tổng hợp tất cả điểm ăn uống, quán lẩu, món nướng & ăn vặt',
          accentColor: 'text-[#9C4129]',
          badgeBg: 'bg-[#FFF8F0] border-[#FDBA74]'
        };
      case 'CAFE':
        return {
          tag: 'BẢNG CAFE',
          title: 'DANH SÁCH QUÁN CÀ PHÊ VIEW ĐẸP',
          sub: 'Tổng hợp các tiệm cà phê ngắm hoàng hôn, thung lũng & chill',
          accentColor: 'text-[#2D4A3E]',
          badgeBg: 'bg-[#F0FDF4] border-[#86EFAC]'
        };
      case 'FREE':
      default:
        return {
          tag: 'BẢNG CHECK-IN FREE',
          title: 'DANH SÁCH ĐỊA ĐIỂM CHECK-IN MIỄN PHÍ',
          sub: 'Các cung đường hoa, đập tràn, hầm hỏa xa & điểm ngắm mây 0đ',
          accentColor: 'text-[#0369A1]',
          badgeBg: 'bg-[#F0F9FF] border-[#7DD3FC]'
        };
    }
  };

  const info = getTitleInfo();

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getMapsUrl = (name: string, address: string | null) => {
    const queryStr = address ? `${address}, Đà Lạt` : `${name}, Đà Lạt`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryStr)}`;
  };

  // Filtered spots by search query
  const filteredSpots = useMemo(() => {
    if (!searchQuery.trim()) return spots;
    const q = searchQuery.toLowerCase();
    return spots.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.address && s.address.toLowerCase().includes(q)) ||
        (s.note && s.note.toLowerCase().includes(q)) ||
        s.mainActivity.toLowerCase().includes(q)
    );
  }, [spots, searchQuery]);

  return (
    <main className="w-full py-8 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Block */}
        <div className="mb-6 bg-white border border-[#E7E5E4] p-5 sm:p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 border ${info.badgeBg}`}>
              {info.tag}
            </span>
            <button
              onClick={onBackToTimeline}
              className="text-xs font-mono px-3.5 py-1.5 bg-[#F5F5F4] text-[#1F2421] border border-[#D4D4D8] hover:bg-[#1F2421] hover:text-white transition-colors duration-150 cursor-pointer"
            >
              Quay lại lịch trình
            </button>
          </div>

          <h2 className={`font-serif-title text-2xl sm:text-3xl font-bold ${info.accentColor} uppercase tracking-tight`}>
            {info.title}
          </h2>
          <p className="font-serif-sub italic text-sm text-[#52525B] mt-1">
            {info.sub} — Tổng số {spots.length} địa điểm
          </p>

          {/* Search Box */}
          <div className="mt-4 pt-3 border-t border-[#F5F5F4] flex items-center space-x-2 font-mono text-xs">
            <span className="text-[#71717A] text-[11px] uppercase tracking-wider shrink-0">
              Tìm tên hoặc địa chỉ:
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập tên quán, tên đường để tìm kiếm..."
              className="w-full bg-[#FDFBF7] border border-[#E7E5E4] px-3 py-1.5 text-[#1F2421] placeholder-[#A1A1AA] focus:outline-none focus:border-[#1F2421]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-2 py-1 bg-white border border-[#E7E5E4] text-[#71717A] hover:text-[#1F2421]"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-4 font-mono text-xs text-[#71717A] px-1">
          <span>Hiển thị {filteredSpots.length} / {spots.length} địa điểm</span>
          <span className="uppercase">Sắp xếp theo lịch trình</span>
        </div>

        {/* Spots Table / Cards */}
        {filteredSpots.length > 0 ? (
          <div className="space-y-4">
            {filteredSpots.map((spot, idx) => {
              const isTransportOrAccommodation = spot.category === 'DI_CHUYEN' || spot.category === 'LUU_TRU';
              const spotImg = !isTransportOrAccommodation
                ? (getSpotImage(spot.name) || getSpotImage(spot.mainActivity))
                : null;
              return (
                <div
                  key={spot.id}
                  className="bg-white border border-[#E7E5E4] hover:border-[#1F2421] p-4 sm:p-5 transition-all duration-150 shadow-2xs"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-[#71717A] bg-[#F5F5F4] px-2 py-0.5 border border-[#E7E5E4]">
                        #{idx + 1}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#1F2421] bg-[#FDFBF7] px-2 py-0.5 border border-[#E7E5E4]">
                        {spot.dayLabel} — {spot.time}
                      </span>
                    </div>

                    <span className="font-mono text-xs font-bold text-[#2D4A3E]">
                      {spot.price === 0 || spot.isFree ? 'Miễn phí 0đ' : `~${spot.price}k / người`}
                    </span>
                  </div>

                  <h3 className="font-serif-title text-lg sm:text-xl font-bold text-[#1F2421] mb-1">
                    {spot.name}
                  </h3>

                  {spot.mainActivity && spot.mainActivity !== spot.name && (
                    <p className="font-sans-body text-xs text-[#71717A] mb-2 italic">
                      Thuộc khung giờ: {spot.mainActivity}
                    </p>
                  )}

                  {/* Spot Image Preview */}
                  {spotImg && (
                    <div className="my-3 border border-[#E7E5E4] bg-[#FAF9F6] overflow-hidden">
                      <img
                        src={spotImg}
                        alt={spot.name}
                        className="w-full h-44 sm:h-56 object-cover hover:scale-101 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="p-2 bg-[#FDFBF7] border-t border-[#F5F5F4] flex items-center justify-between text-[10px] font-mono text-[#71717A]">
                        <span className="uppercase tracking-wider">Hình ảnh không gian địa điểm</span>
                        <span className="italic font-sans-body font-semibold text-[#1F2421]">{spot.name}</span>
                      </div>
                    </div>
                  )}

                  {/* Address */}
                  {spot.address && (
                    <div className="font-mono text-xs text-[#52525B] mb-2 bg-[#FDFBF7] p-2 border border-[#F5F5F4]">
                      <span className="text-[#A1A1AA] text-[10px] uppercase block mb-0.5">
                        Địa chỉ:
                      </span>
                      <span className="font-sans-body text-xs text-[#1F2421]">
                        {spot.address}
                      </span>
                    </div>
                  )}

                  {/* Note */}
                  {spot.note && (
                    <div className="text-xs font-sans-body text-[#52525B] italic bg-[#FFFBF0] p-2 border-l-2 border-[#FDBA74] mb-3">
                      <span className="font-mono text-[10px] text-[#9C4129] not-italic font-bold block uppercase mb-0.5">
                        Ghi chú:
                      </span>
                      {spot.note}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 border-t border-[#F5F5F4] flex flex-wrap items-center gap-2 font-mono text-xs">
                    <a
                      href={getMapsUrl(spot.name, spot.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1 bg-[#1F2421] text-white hover:bg-[#2D4A3E] transition-colors duration-150"
                    >
                      Chỉ đường Google Maps
                    </a>

                    {spot.address && (
                      <button
                        onClick={() => handleCopy(spot.id, spot.address!)}
                        className="px-3.5 py-1 bg-white text-[#52525B] border border-[#E7E5E4] hover:border-[#1F2421] hover:text-[#1F2421] transition-colors duration-150 cursor-pointer"
                      >
                        {copiedId === spot.id ? 'Đã sao chép' : 'Sao chép địa chỉ'}
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-[#E7E5E4] p-8 text-center my-6 font-mono text-xs text-[#71717A]">
            Không tìm thấy địa điểm nào khớp với từ khóa "{searchQuery}"
          </div>
        )}

      </div>
    </main>
  );
};

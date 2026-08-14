import React, { useState } from 'react';
import type { TimelineItem } from '../types/timeline';
import { getSpotImage } from '../utils/imageMapper';

interface TimelineCardProps {
  item: TimelineItem;
  onToggleComplete: (id: string) => void;
  onSelectOption?: (itemId: string, optionId: string) => void;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  item,
  onToggleComplete,
  onSelectOption,
}) => {
  const [copied, setCopied] = useState(false);

  // Active option determination
  const activeOption = item.options && item.options.length > 0
    ? item.options.find((opt) => opt.id === item.selectedOptionId) || item.options[0]
    : null;

  const currentAddress = activeOption?.address || item.address;
  const currentNote = activeOption?.note || item.note;
  const currentTitle = activeOption?.name || item.subActivity || item.mainActivity;

  // Active spot preview image (Excluding DI_CHUYEN and LUU_TRU activities)
  const isTransportOrAccommodation = item.category === 'DI_CHUYEN' || item.category === 'LUU_TRU';
  const activeImage = !isTransportOrAccommodation
    ? (getSpotImage(currentTitle) || (activeOption ? getSpotImage(activeOption.name) : null) || getSpotImage(item.mainActivity))
    : null;

  const handleCopyAddress = (addressText: string) => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getGoogleMapsUrl = () => {
    const addr = currentAddress || currentTitle;
    if (!addr) {
      const query = encodeURIComponent(`${item.mainActivity} Đà Lạt`);
      return `https://www.google.com/maps/search/?api=1&query=${query}`;
    }
    if (addr.startsWith('http://') || addr.startsWith('https://')) {
      return addr;
    }
    const query = encodeURIComponent(`${addr}, Đà Lạt`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Badge styling based on category
  const getBadgeStyle = () => {
    switch (item.category) {
      case 'AM_THUC':
        return 'bg-[#FFF8F0] text-[#9C4129] border-[#FDBA74]';
      case 'CAFE':
        return 'bg-[#F0FDF4] text-[#2D4A3E] border-[#86EFAC]';
      case 'THAM_QUAN':
        return 'bg-[#F0F9FF] text-[#0369A1] border-[#7DD3FC]';
      case 'LUU_TRU':
        return 'bg-[#FAF5FF] text-[#5B21B6] border-[#D8B4FE]';
      case 'DI_CHUYEN':
      default:
        return 'bg-[#F8FAFC] text-[#334155] border-[#CBD5E1]';
    }
  };

  return (
    <div
      className={`relative bg-white border transition-all duration-200 p-4 sm:p-5 mb-4 ${
        item.completed
          ? 'border-[#E7E5E4] opacity-75 bg-[#FAF9F6]'
          : 'border-[#E7E5E4] hover:border-[#1F2421] shadow-xs'
      }`}
    >
      {/* Top Meta Line: Time + Category + Price */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#F5F5F4]">
        
        <div className="flex items-center space-x-2">
          {/* Time Badge */}
          <span className="font-mono text-xs font-bold tracking-widest text-[#1F2421] bg-[#F5F5F4] px-2 py-0.5 border border-[#E7E5E4]">
            {item.time}
          </span>

          {/* Category Tag */}
          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 border uppercase ${getBadgeStyle()}`}>
            {item.categoryLabel}
          </span>
        </div>

        {/* Estimated Price */}
        {item.price !== null && (
          <span className="font-mono text-xs text-[#2D4A3E] font-bold">
            {item.price === 0 ? 'Miễn phí 0đ' : `~${item.price}k / người`}
          </span>
        )}
      </div>

      {/* Main Activity Heading */}
      <div className="mb-3">
        <h3
          className={`font-serif-title text-lg sm:text-xl font-semibold leading-snug text-[#1F2421] ${
            item.completed ? 'line-through text-[#71717A]' : ''
          }`}
        >
          {item.mainActivity}
        </h3>
      </div>

      {/* Selectable Options Section */}
      {item.options && item.options.length > 1 && (
        <div className="mb-4 bg-[#FDFBF7] p-3 border border-[#E7E5E4]">
          <span className="block text-[10px] font-mono font-bold tracking-wider text-[#71717A] uppercase mb-2">
            Gợi ý lựa chọn — Chọn món / địa điểm ({item.options.length} lựa chọn):
          </span>

          <div className="flex flex-col space-y-1.5">
            {item.options.map((opt) => {
              const isSelected = opt.id === activeOption?.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onSelectOption && onSelectOption(item.id, opt.id)}
                  className={`text-left text-xs font-sans-body px-3 py-2 border transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#2D4A3E] text-white border-[#2D4A3E] font-semibold shadow-2xs'
                      : 'bg-white text-[#52525B] border-[#E7E5E4] hover:border-[#1F2421] hover:text-[#1F2421]'
                  }`}
                >
                  <span className="font-mono text-xs mr-2 font-bold">
                    {isSelected ? '•' : '◦'}
                  </span>
                  {opt.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Real Spot Image Preview */}
      {activeImage && (
        <div className="my-3 border border-[#E7E5E4] bg-[#FAF9F6] overflow-hidden">
          <img
            src={activeImage}
            alt={currentTitle}
            className="w-full h-44 sm:h-56 object-cover hover:scale-101 transition-transform duration-300"
            loading="lazy"
          />
          <div className="p-2 bg-[#FDFBF7] border-t border-[#F5F5F4] flex items-center justify-between text-[10px] font-mono text-[#71717A]">
            <span className="uppercase tracking-wider">Hình ảnh thực tế địa điểm</span>
            <span className="italic font-sans-body font-semibold text-[#1F2421]">{currentTitle}</span>
          </div>
        </div>
      )}

      {/* Address & Location Actions for Selected Option */}
      {currentAddress && (
        <div className="mb-3 pt-2 border-t border-dashed border-[#E7E5E4] text-xs font-mono text-[#71717A]">
          <div className="mb-2 break-words">
            <span className="text-[#A1A1AA] uppercase tracking-wider block text-[10px] mb-0.5">
              Địa chỉ:
            </span>
            <span className="text-[#27272A] font-sans-body text-xs italic">
              {currentAddress}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={getGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1 bg-[#F5F5F4] text-[#1F2421] border border-[#D4D4D8] hover:bg-[#1F2421] hover:text-white transition-colors duration-150"
            >
              {currentAddress.startsWith('http') ? 'Mở Google Maps' : 'Chỉ đường'}
            </a>

            {!currentAddress.startsWith('http') && (
              <button
                onClick={() => handleCopyAddress(currentAddress)}
                className="px-3 py-1 bg-white text-[#52525B] border border-[#E7E5E4] hover:border-[#1F2421] hover:text-[#1F2421] transition-colors duration-150 cursor-pointer"
              >
                {copied ? 'Đã sao chép' : 'Sao chép địa chỉ'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Note box for Selected Option */}
      {currentNote && (
        <div className="mb-3 bg-[#FAF7F2] p-2.5 border-l-2 border-[#2D4A3E] text-xs font-sans-body text-[#52525B] italic">
          <span className="font-mono text-[10px] text-[#2D4A3E] not-italic font-bold block uppercase mb-0.5">
            Lưu ý / Ghi chú:
          </span>
          {currentNote}
        </div>
      )}

      {/* Bottom Completion Checkbox */}
      <div className="pt-2 border-t border-[#F5F5F4] flex items-center justify-between">
        <label className="flex items-center space-x-2 text-xs font-mono text-[#52525B] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggleComplete(item.id)}
            className="w-4 h-4 rounded-none accent-[#2D4A3E] cursor-pointer"
          />
          <span className={item.completed ? 'text-[#2D4A3E] font-bold' : ''}>
            {item.completed ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
          </span>
        </label>

        {item.isBackup && (
          <span className="text-[10px] font-mono text-[#9C4129] uppercase border border-[#FDBA74] px-2 py-0.5 bg-[#FFF8F0]">
            Dự phòng
          </span>
        )}
      </div>

    </div>
  );
};

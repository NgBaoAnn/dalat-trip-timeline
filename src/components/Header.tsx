import React from 'react';
import type { TripSummaryStats } from '../types/timeline';

interface HeaderProps {
  stats: TripSummaryStats;
  onOpenNotes: () => void;
  onOpenUpload: () => void;
  onResetProgress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  onOpenNotes,
  onOpenUpload,
  onResetProgress,
}) => {
  const percentCompleted = stats.totalItems > 0
    ? Math.round((stats.completedItems / stats.totalItems) * 100)
    : 0;

  return (
    <header className="w-full bg-[#FDFBF7] border-b border-[#E7E5E4] pt-8 pb-6 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Main Title */}
        <h1 className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1F2421] mb-2 uppercase">
          ĐÀ LẠT & EM
        </h1>

        {/* Subtitle */}
        <p className="font-serif-sub italic text-lg sm:text-2xl text-[#52525B] mb-6">
          Hành trình 3 ngày 2 đêm — 17/8 đến 19/8
        </p>

        {/* Hairline Divider */}
        <div className="w-24 h-[1px] bg-[#2D4A3E] mx-auto mb-6 opacity-40"></div>

        {/* Summary Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-6 text-left">
          
          <div className="bg-white border border-[#E7E5E4] p-3 text-center">
            <span className="block text-[10px] font-mono tracking-widest text-[#71717A] uppercase mb-1">
              CHI PHÍ DỰ KIẾN
            </span>
            <span className="text-sm sm:text-base font-bold text-[#2D4A3E]">
              ~{stats.totalEstimatedCost.toLocaleString('vi-VN')}k / người
            </span>
          </div>

          <div className="bg-white border border-[#E7E5E4] p-3 text-center">
            <span className="block text-[10px] font-mono tracking-widest text-[#71717A] uppercase mb-1">
              TIẾN ĐỘ CHUYẾN ĐI
            </span>
            <span className="text-sm sm:text-base font-bold text-[#1F2421]">
              {stats.completedItems} / {stats.totalItems} ({percentCompleted}%)
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white border border-[#E7E5E4] p-3 text-center">
            <span className="block text-[10px] font-mono tracking-widest text-[#71717A] uppercase mb-1">
              ĐỊA ĐIỂM DỰ PHÒNG
            </span>
            <span className="text-sm sm:text-base font-bold text-[#9C4129]">
              {stats.backupCount} địa điểm
            </span>
          </div>

        </div>

        {/* Plain-text Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
          
          <button
            onClick={onOpenNotes}
            className="px-3.5 py-1.5 bg-white border border-[#1F2421] text-[#1F2421] hover:bg-[#1F2421] hover:text-white transition-colors duration-150 cursor-pointer"
          >
            Ghi chú chuyến đi
          </button>

          <button
            onClick={onOpenUpload}
            className="px-3.5 py-1.5 bg-white border border-[#71717A] text-[#71717A] hover:border-[#1F2421] hover:text-[#1F2421] transition-colors duration-150 cursor-pointer"
          >
            Nạp file Excel
          </button>

          <button
            onClick={onResetProgress}
            className="px-3.5 py-1.5 bg-white border border-[#E7E5E4] text-[#71717A] hover:text-[#9C4129] hover:border-[#9C4129] transition-colors duration-150 cursor-pointer"
          >
            Đặt lại tiến độ
          </button>

        </div>

      </div>
    </header>
  );
};

import React from 'react';
import type { TimelineItem } from '../types/timeline';
import { TimelineCard } from './TimelineCard';

interface TimelineStreamProps {
  items: TimelineItem[];
  selectedDay: string;
  onToggleComplete: (id: string) => void;
  onSelectOption?: (itemId: string, optionId: string) => void;
  onResetFilters: () => void;
}

export const TimelineStream: React.FC<TimelineStreamProps> = ({
  items,
  selectedDay,
  onToggleComplete,
  onSelectOption,
  onResetFilters,
}) => {
  const getDayTitle = () => {
    switch (selectedDay) {
      case 'day-1':
        return 'NGÀY 1 — THỨ HAI, 17/08/2026';
      case 'day-2':
        return 'NGÀY 2 — THỨ BA, 18/08/2026';
      case 'day-3':
        return 'NGÀY 3 — THỨ TƯ, 19/08/2026';
      case 'backup':
      default:
        return 'ĐỊA ĐIỂM DỰ PHÒNG & MÓN NGON TỰ DO';
    }
  };

  return (
    <main className="w-full py-8 px-2 sm:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Section Header Banner */}
        <div className="mb-8 border-b-2 border-[#1F2421] pb-3 flex flex-wrap items-baseline justify-between gap-2 px-2 sm:px-0">
          <h2 className="font-serif-title text-xl sm:text-2xl font-bold tracking-tight text-[#1F2421] uppercase">
            {getDayTitle()}
          </h2>
          <span className="text-xs font-mono text-[#71717A]">
            {items.length} hoạt động
          </span>
        </div>

        {/* Vertical Timeline Stream Layout */}
        {items.length > 0 ? (
          <div className="relative space-y-3">
            
            {/* Continuous Vertical Timeline Line behind dots */}
            <div className="absolute left-[54px] sm:left-[76px] top-6 bottom-6 w-[1px] bg-[#E7E5E4] z-0" />

            {items.map((item) => (
              <div key={item.id} className="relative flex items-start space-x-2 sm:space-x-4 z-10">
                
                {/* Left Side: Time Badge on Timeline */}
                <div className="w-[50px] sm:w-[68px] shrink-0 text-right pt-4">
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-[#1F2421] bg-[#F5F5F4] px-1.5 py-0.5 border border-[#E7E5E4] inline-block shadow-2xs">
                    {item.time}
                  </span>
                </div>

                {/* Center: Timeline Node Dot */}
                <div className="relative flex flex-col items-center shrink-0 pt-5">
                  <div
                    className={`w-3 h-3 border transition-colors duration-150 ${
                      item.completed
                        ? 'bg-[#2D4A3E] border-[#2D4A3E]'
                        : 'bg-[#FDFBF7] border-[#1F2421]'
                    }`}
                  />
                </div>

                {/* Right Side: Activity Card */}
                <div className="flex-1 min-w-0">
                  <TimelineCard
                    item={item}
                    onToggleComplete={onToggleComplete}
                    onSelectOption={onSelectOption}
                  />
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-[#E7E5E4] p-8 text-center my-8">
            <span className="block text-xs font-mono text-[#71717A] tracking-widest uppercase mb-2">
              Không có dữ liệu phù hợp
            </span>
            <p className="font-serif-sub italic text-lg text-[#52525B] mb-4">
              Chưa tìm thấy hoạt động nào phù hợp với bộ lọc hiện tại.
            </p>
            <button
              onClick={onResetFilters}
              className="px-4 py-2 bg-[#1F2421] text-white text-xs font-mono tracking-wider hover:bg-[#2D4A3E] transition-colors duration-150 cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

      </div>
    </main>
  );
};

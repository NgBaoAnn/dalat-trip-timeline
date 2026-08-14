import React from 'react';

interface DayTabsProps {
  selectedDay: string; // 'day-1' | 'day-2' | 'day-3' | 'backup' | 'table-food' | 'table-cafe' | 'table-free'
  onSelectDay: (day: string) => void;
  selectedCategory: string; // 'ALL' | CategoryKey
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  counts: {
    day1: number;
    day2: number;
    day3: number;
    backup: number;
    food: number;
    cafe: number;
    free: number;
  };
}

export const DayTabs: React.FC<DayTabsProps> = ({
  selectedDay,
  onSelectDay,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  counts,
}) => {
  const days = [
    { key: 'day-1', label: 'NGÀY 1', date: '17/8', count: counts.day1 },
    { key: 'day-2', label: 'NGÀY 2', date: '18/8', count: counts.day2 },
    { key: 'day-3', label: 'NGÀY 3', date: '19/8', count: counts.day3 },
    { key: 'backup', label: 'DỰ PHÒNG & TỰ DO', date: 'Backup', count: counts.backup },
  ];

  const curatedTables = [
    { key: 'table-food', label: 'Quán ăn', count: counts.food, color: 'hover:border-[#9C4129]' },
    { key: 'table-cafe', label: 'Quán cà phê', count: counts.cafe, color: 'hover:border-[#2D4A3E]' },
    { key: 'table-free', label: 'Check-in Free', count: counts.free, color: 'hover:border-[#0369A1]' },
  ];

  const categories: { key: string; label: string }[] = [
    { key: 'ALL', label: 'Tất cả' },
    { key: 'AM_THUC', label: 'Ẩm thực' },
    { key: 'CAFE', label: 'Cafe & Thư giãn' },
    { key: 'THAM_QUAN', label: 'Tham quan' },
    { key: 'DI_CHUYEN', label: 'Di chuyển' },
    { key: 'LUU_TRU', label: 'Lưu trú' },
  ];

  const isCuratedView = selectedDay.startsWith('table-');

  return (
    <div className="w-full bg-[#FDFBF7] sticky top-0 z-20 border-b border-[#E7E5E4] py-3 px-4 sm:px-8 backdrop-blur-md bg-opacity-95">
      <div className="max-w-4xl mx-auto space-y-3">
        
        {/* Global Search Input Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="TÌM KIẾM CHUNG: Nhập tên quán ăn, tiệm cà phê, điểm check-in free hoặc địa chỉ..."
            className="w-full pl-3 pr-24 py-2 bg-white border border-[#1F2421] text-xs font-sans-body text-[#1F2421] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#1F2421] shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1.5 px-2.5 py-1 bg-[#F5F5F4] text-[#1F2421] text-[10px] font-mono border border-[#D4D4D8] hover:bg-[#1F2421] hover:text-white transition-colors cursor-pointer"
            >
              Xóa tìm kiếm
            </button>
          )}
        </div>

        {/* Main Timeline Day Tabs */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto no-scrollbar pb-1">
          {days.map((d) => {
            const isActive = selectedDay === d.key;
            return (
              <button
                key={d.key}
                onClick={() => onSelectDay(d.key)}
                className={`flex-1 min-w-[110px] sm:min-w-[140px] py-2 px-2.5 text-center border transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#1F2421] text-white border-[#1F2421] shadow-xs'
                    : 'bg-white text-[#52525B] border-[#E7E5E4] hover:border-[#71717A] hover:text-[#1F2421]'
                }`}
              >
                <span className="block text-xs font-mono font-bold tracking-wider uppercase">
                  {d.label}
                </span>
                <span
                  className={`block text-[10px] font-mono mt-0.5 ${
                    isActive ? 'text-[#D4D4D8]' : 'text-[#71717A]'
                  }`}
                >
                  {d.date} ({d.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Curated Dedicated Tables Bar */}
        <div className="pt-1 border-t border-dashed border-[#E7E5E4] flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-[#71717A] uppercase shrink-0">
            Tra cứu bảng:
          </span>
          {curatedTables.map((t) => {
            const isActive = selectedDay === t.key;
            return (
              <button
                key={t.key}
                onClick={() => onSelectDay(t.key)}
                className={`text-[11px] font-mono whitespace-nowrap px-3 py-1.5 border transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#2D4A3E] text-white border-[#2D4A3E] font-bold shadow-2xs'
                    : `bg-white text-[#1F2421] border-[#D4D4D8] ${t.color}`
                }`}
              >
                {t.label} ({t.count})
              </button>
            );
          })}
        </div>

        {/* Secondary Category Filter (Only shown in Timeline views) */}
        {!isCuratedView && (
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1 border-t border-[#F5F5F4]">
            <span className="text-[10px] font-mono text-[#71717A] uppercase shrink-0">
              Lọc theo:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => onSelectCategory(cat.key)}
                  className={`text-[11px] font-mono whitespace-nowrap px-2.5 py-1 transition-colors duration-150 border cursor-pointer ${
                    isActive
                      ? 'bg-[#1F2421] text-white border-[#1F2421]'
                      : 'bg-white text-[#71717A] border-[#E7E5E4] hover:text-[#1F2421] hover:border-[#A1A1AA]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export type CategoryKey = 'AM_THUC' | 'CAFE' | 'THAM_QUAN' | 'DI_CHUYEN' | 'LUU_TRU';

export interface ActivityOption {
  id: string;
  name: string;
  address?: string | null;
  note?: string | null;
}

export interface TimelineItem {
  id: string;
  dayKey: string; // 'day-1' | 'day-2' | 'day-3' | 'backup'
  dayLabel: string; // 'NGÀY 1' | 'NGÀY 2' | 'NGÀY 3' | 'DỰ PHÒNG'
  dateStr: string; // '17/8' | '18/8' | '19/8' | 'Tự do'
  time: string; // '08h00', '12h40', etc.
  mainActivity: string; // 'Ăn sáng', 'Cà phê / check in'
  subActivity: string; // 'Bánh mì xíu mại 79'
  options: ActivityOption[]; // Array of candidate options
  selectedOptionId?: string; // Selected option ID
  address: string | null;
  price: number | null; // Expense in thousands
  note: string | null;
  category: CategoryKey;
  categoryLabel: string; // '[ ẨM THỰC ]'
  isBackup: boolean;
  completed: boolean;
}

export interface CuratedSpot {
  id: string;
  name: string;
  category: CategoryKey;
  dayLabel: string;
  dateStr: string;
  time: string;
  mainActivity: string;
  address: string | null;
  price: number | null;
  note: string | null;
  isFree: boolean;
}

export interface TripSummaryStats {
  totalItems: number;
  completedItems: number;
  totalEstimatedCost: number; // in thousands (k VNĐ)
  day1Count: number;
  day2Count: number;
  day3Count: number;
  backupCount: number;
  foodCount: number;
  cafeCount: number;
  freeCount: number;
}

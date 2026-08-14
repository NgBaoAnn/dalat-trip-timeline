import { useState, useEffect, useMemo } from 'react';
import type { TimelineItem, TripSummaryStats, CuratedSpot } from './types/timeline';
import { parseExcelBuffer, FALLBACK_TIMELINE_DATA } from './utils/excelParser';
import { Header } from './components/Header';
import { DayTabs } from './components/DayTabs';
import { TimelineStream } from './components/TimelineStream';
import { CuratedTableView } from './components/CuratedTableView';
import { NotesDrawer } from './components/NotesDrawer';
import { ExcelUploaderModal } from './components/ExcelUploaderModal';

const LOCAL_STORAGE_KEY = 'dalat_trip_completed_ids';
const OPTIONS_STORAGE_KEY = 'dalat_trip_selected_options_map';

export function App() {
  const [items, setItems] = useState<TimelineItem[]>(FALLBACK_TIMELINE_DATA);
  const [selectedDay, setSelectedDay] = useState<string>('day-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [selectedOptionsMap, setSelectedOptionsMap] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(OPTIONS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load /plan.xlsx on mount
  useEffect(() => {
    const fetchDefaultExcel = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/plan.xlsx');
        if (res.ok) {
          const buffer = await res.arrayBuffer();
          const parsed = parseExcelBuffer(buffer);
          if (parsed && parsed.length > 0) {
            setItems(parsed);
          }
        }
      } catch (err) {
        console.warn('Failed to load /plan.xlsx, using fallback dataset.', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDefaultExcel();
  }, []);

  // Sync completion status with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(completedIds)));
    } catch (e) {
      console.error('Failed to save completed state to localStorage', e);
    }
  }, [completedIds]);

  // Sync selected options with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(OPTIONS_STORAGE_KEY, JSON.stringify(selectedOptionsMap));
    } catch (e) {
      console.error('Failed to save selected options to localStorage', e);
    }
  }, [selectedOptionsMap]);

  // Toggle item completion
  const handleToggleComplete = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Select Option for an item
  const handleSelectOption = (itemId: string, optionId: string) => {
    setSelectedOptionsMap((prev) => ({
      ...prev,
      [itemId]: optionId,
    }));
  };

  // Reset completion progress & selections
  const handleResetProgress = () => {
    setCompletedIds(new Set());
    setSelectedOptionsMap({});
  };

  // Upload Custom File
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const buffer = e.target.result as ArrayBuffer;
        const parsed = parseExcelBuffer(buffer);
        if (parsed && parsed.length > 0) {
          setItems(parsed);
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Reload default
  const handleReloadDefault = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/plan.xlsx');
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        const parsed = parseExcelBuffer(buffer);
        setItems(parsed);
      } else {
        setItems(FALLBACK_TIMELINE_DATA);
      }
    } catch {
      setItems(FALLBACK_TIMELINE_DATA);
    } finally {
      setIsLoading(false);
    }
  };

  // Merge completed state & selected option IDs into items
  const itemsWithCompletion = useMemo(() => {
    return items.map((item) => {
      const selectedOptionId =
        selectedOptionsMap[item.id] ||
        item.selectedOptionId ||
        (item.options && item.options.length > 0 ? item.options[0].id : undefined);

      return {
        ...item,
        completed: completedIds.has(item.id),
        selectedOptionId,
      };
    });
  }, [items, completedIds, selectedOptionsMap]);

  // Extract Curated Tables (Quán ăn, Quán cà phê, Check in free)
  const { foodSpots, cafeSpots, freeSpots } = useMemo(() => {
    const food: CuratedSpot[] = [];
    const cafe: CuratedSpot[] = [];
    const free: CuratedSpot[] = [];

    itemsWithCompletion.forEach((item) => {
      if (item.options && item.options.length > 0) {
        item.options.forEach((opt) => {
          const name = opt.name || item.subActivity || item.mainActivity;
          const address = opt.address || item.address;
          const note = opt.note || item.note;
          const isFree =
            item.price === 0 ||
            /miễn phí|0k|free/i.test(note || '') ||
            /hồ xuân hương|đập tràn|hầm hoả xa|bức tường|cung đường|đồi chè|hòn bồ|tháp vinaphone|săn mây|đồi đa phú|cỏ mây|cỏ hồng|măng lin|cổ làng mơ/i.test(name);

          const spot: CuratedSpot = {
            id: `${item.id}-${opt.id}`,
            name,
            category: item.category,
            dayLabel: item.dayLabel,
            dateStr: item.dateStr,
            time: item.time,
            mainActivity: item.mainActivity,
            address,
            price: item.price,
            note,
            isFree,
          };

          if (
            item.category === 'AM_THUC' ||
            /ăn|lẩu|nướng|mì|phở|bánh|cháo|sữa|bắp|khoai|pizza|ramen|xíu mại|hàu|khổng lồ|gà/i.test(name)
          ) {
            food.push(spot);
          }
          if (
            item.category === 'CAFE' ||
            /cà phê|cafe|túi mơ to|hidden land|vùng ngoại ô|nhà của thông|linh lam|reo|cheo veo|waken|chênh vênh|góc của tùng/i.test(name)
          ) {
            cafe.push(spot);
          }
          if (isFree || item.price === 0) {
            free.push(spot);
          }
        });
      } else {
        const name = item.subActivity || item.mainActivity;
        const isFree =
          item.price === 0 ||
          /miễn phí|0k|free/i.test(item.note || '') ||
          /hồ xuân hương|đập tràn|hầm hoả xa|bức tường|cung đường|đồi chè|hòn bồ|tháp vinaphone|săn mây|đồi đa phú|cỏ mây|cỏ hồng|măng lin|cổ làng mơ/i.test(name);

        const spot: CuratedSpot = {
          id: item.id,
          name,
          category: item.category,
          dayLabel: item.dayLabel,
          dateStr: item.dateStr,
          time: item.time,
          mainActivity: item.mainActivity,
          address: item.address,
          price: item.price,
          note: item.note,
          isFree,
        };

        if (
          item.category === 'AM_THUC' ||
          /ăn|lẩu|nướng|mì|phở|bánh|cháo|sữa|bắp|khoai|pizza|ramen|xíu mại|hàu|khổng lồ|gà/i.test(name)
        ) {
          food.push(spot);
        }
        if (
          item.category === 'CAFE' ||
          /cà phê|cafe|túi mơ to|hidden land|vùng ngoại ô|nhà của thông|linh lam|reo|cheo veo|waken|chênh vênh|góc của tùng/i.test(name)
        ) {
          cafe.push(spot);
        }
        if (isFree || item.price === 0) {
          free.push(spot);
        }
      }
    });

    return { foodSpots: food, cafeSpots: cafe, freeSpots: free };
  }, [itemsWithCompletion]);

  // Summary statistics
  const stats: TripSummaryStats = useMemo(() => {
    const totalItems = itemsWithCompletion.length;
    const completedItems = itemsWithCompletion.filter((i) => i.completed).length;

    // Calculate total cost (in thousands) - main schedule only (matching Excel =SUM(F3:F77))
    const totalEstimatedCost = itemsWithCompletion.reduce((sum, item) => {
      if (item.isBackup || item.dayKey === 'backup') return sum;
      return sum + (item.price || 0);
    }, 0);

    const day1Count = itemsWithCompletion.filter((i) => i.dayKey === 'day-1').length;
    const day2Count = itemsWithCompletion.filter((i) => i.dayKey === 'day-2').length;
    const day3Count = itemsWithCompletion.filter((i) => i.dayKey === 'day-3').length;
    const backupCount = itemsWithCompletion.filter((i) => i.dayKey === 'backup').length;

    return {
      totalItems,
      completedItems,
      totalEstimatedCost,
      day1Count,
      day2Count,
      day3Count,
      backupCount,
      foodCount: foodSpots.length,
      cafeCount: cafeSpots.length,
      freeCount: freeSpots.length,
    };
  }, [itemsWithCompletion, foodSpots, cafeSpots, freeSpots]);

  // Filtered items based on active day and category
  const filteredItems = useMemo(() => {
    return itemsWithCompletion.filter((item) => {
      const matchDay = item.dayKey === selectedDay;
      const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      return matchDay && matchCat;
    });
  }, [itemsWithCompletion, selectedDay, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1F2421] flex flex-col font-sans-body antialiased">
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#1F2421] text-white py-1 px-4 text-center text-xs font-mono">
          Đang đọc dữ liệu file Excel...
        </div>
      )}

      {/* Hero Header */}
      <Header
        stats={stats}
        onOpenNotes={() => setIsNotesOpen(true)}
        onOpenUpload={() => setIsUploadOpen(true)}
        onResetProgress={handleResetProgress}
      />

      {/* Segmented Day Tabs & Curated Tables Navigation */}
      <DayTabs
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        counts={{
          day1: stats.day1Count,
          day2: stats.day2Count,
          day3: stats.day3Count,
          backup: stats.backupCount,
          food: stats.foodCount,
          cafe: stats.cafeCount,
          free: stats.freeCount,
        }}
      />

      {/* View Switcher: Main Timeline vs Curated Dedicated Tables */}
      <div className="flex-1">
        {selectedDay === 'table-food' ? (
          <CuratedTableView
            type="FOOD"
            spots={foodSpots}
            onBackToTimeline={() => setSelectedDay('day-1')}
          />
        ) : selectedDay === 'table-cafe' ? (
          <CuratedTableView
            type="CAFE"
            spots={cafeSpots}
            onBackToTimeline={() => setSelectedDay('day-1')}
          />
        ) : selectedDay === 'table-free' ? (
          <CuratedTableView
            type="FREE"
            spots={freeSpots}
            onBackToTimeline={() => setSelectedDay('day-1')}
          />
        ) : (
          <TimelineStream
            items={filteredItems}
            selectedDay={selectedDay}
            onToggleComplete={handleToggleComplete}
            onSelectOption={handleSelectOption}
            onResetFilters={() => setSelectedCategory('ALL')}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#FDFBF7] border-t border-[#E7E5E4] py-6 px-4 text-center text-xs font-mono text-[#71717A]">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-serif-sub italic text-sm text-[#52525B]">
            "Đà Lạt lãng mạn — Nơi mỗi khoảnh khắc đều trở thành kỷ niệm đẹp."
          </p>
          <p className="uppercase tracking-widest text-[10px]">
            Thiết kế dành riêng cho hai người — 17/8 đến 19/8
          </p>
        </div>
      </footer>

      {/* Slide-over Notes Drawer */}
      <NotesDrawer isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)} />

      {/* Excel Upload Modal */}
      <ExcelUploaderModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onFileUpload={handleFileUpload}
        onReloadDefault={handleReloadDefault}
      />

    </div>
  );
}

export default App;

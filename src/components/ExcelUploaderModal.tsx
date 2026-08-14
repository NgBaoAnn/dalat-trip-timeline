import React, { useRef } from 'react';

interface ExcelUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (file: File) => void;
  onReloadDefault: () => void;
}

export const ExcelUploaderModal: React.FC<ExcelUploaderModalProps> = ({
  isOpen,
  onClose,
  onFileUpload,
  onReloadDefault,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
      onClose();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2421]/50 backdrop-blur-xs">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#FDFBF7] border border-[#1F2421] p-6 shadow-2xl z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4] mb-4">
          <h3 className="font-serif-title text-xl font-bold text-[#1F2421]">
            NẠP LẠI DỮ LIỆU EXCEL
          </h3>
          <button
            onClick={onClose}
            className="px-2.5 py-1 bg-white border border-[#E7E5E4] text-[#1F2421] text-xs font-mono hover:bg-[#1F2421] hover:text-white transition-colors duration-150 cursor-pointer"
          >
            Đóng
          </button>
        </div>

        <p className="font-sans-body text-xs text-[#52525B] mb-4 leading-relaxed">
          Tải lên file Excel mới (định dạng <code className="font-mono bg-white border border-[#E7E5E4] px-1 py-0.5 text-[#1F2421]">.xlsx</code>) để cập nhật danh sách hoạt động, thời gian hoặc địa chỉ trực tiếp.
        </p>

        {/* Dropzone Area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="bg-white border-2 border-dashed border-[#D4D4D8] hover:border-[#1F2421] p-6 text-center cursor-pointer transition-colors duration-150 mb-4"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx, .xls"
            className="hidden"
          />
          <span className="block text-xs font-mono text-[#1F2421] font-bold uppercase tracking-wider mb-1">
            Kéo nạp file Excel vào đây
          </span>
          <span className="block text-[11px] font-sans-body text-[#71717A] italic">
            hoặc nhấp chuột để chọn file từ máy tính
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-2 pt-2 border-t border-[#E7E5E4]">
          <button
            onClick={() => {
              onReloadDefault();
              onClose();
            }}
            className="w-full py-2 bg-[#2D4A3E] text-white text-xs font-mono tracking-wider hover:bg-[#1F2421] transition-colors duration-150 cursor-pointer"
          >
            Khôi phục dữ liệu Excel mặc định
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 bg-white border border-[#E7E5E4] text-[#71717A] text-xs font-mono tracking-wider hover:text-[#1F2421] hover:border-[#1F2421] transition-colors duration-150 cursor-pointer"
          >
            Hủy bỏ
          </button>
        </div>

      </div>
    </div>
  );
};

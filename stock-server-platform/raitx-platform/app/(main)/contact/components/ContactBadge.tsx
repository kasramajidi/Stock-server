export default function ContactBadge() {
  return (
    <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm border border-gray-100">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#ff5538' }}></div>
        <span className="text-[10px] sm:text-xs text-gray-600 font-medium">راه‌های ارتباطی</span>
      </div>
    </div>
  );
}


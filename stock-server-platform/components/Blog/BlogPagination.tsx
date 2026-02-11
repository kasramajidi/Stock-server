type BlogPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  return (
    <div className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-white p-3 shadow-sm border border-gray-100">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="rounded-xl px-3 py-1 text-xs text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        قبلی
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => onPageChange(index)}
            className={`h-7 w-7 rounded-full text-xs transition ${
              index === currentPage
                ? "bg-[#17e2fe] text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="rounded-xl px-3 py-1 text-xs text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        بعدی
      </button>
    </div>
  );
}

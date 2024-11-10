import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { PaginationProps } from "../types";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrev = () => {
    onPageChange(Math.max(page - 1, 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(page + 1, totalPages));
  };

  const handlePageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50 flex items-center"
      >
        <FiArrowLeft className="mr-1" />
        Prev
      </button>
      <div className="flex items-center space-x-2">
        <span>Page</span>
        <select
          value={page.toString()}
          onChange={handlePageSelect}
          className="border rounded px-2 py-1 outline-none"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <option key={p} value={p.toString()}>
              {p}
            </option>
          ))}
        </select>
        <span>of {totalPages}</span>
      </div>
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50 flex items-center"
      >
        Next <FiArrowRight className="ml-1" />
      </button>
    </div>
  );
}

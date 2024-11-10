import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Rate } from "../types";
import useFetchRates from "../hooks/useFetchRates";
import Pagination from "../components/Pagination";

export default function Rates() {
  const storedSettings = JSON.parse(localStorage.getItem("settings") || "{}");

  const [page, setPage] = useState<number>(storedSettings.page || 1);
  const [pageSize, setPageSize] = useState<number>(
    storedSettings.pageSize || 10
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(
    storedSettings.sortOrder || null
  );

  const { rates, loading, highlightedRates, fetchRates } = useFetchRates({
    sortOrder,
  });

  useEffect(() => {
    const settings = { page, pageSize, sortOrder };
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [page, pageSize, sortOrder]);

  const getRateChangeClass = (rate: Rate) => {
    const change = highlightedRates[rate.id];
    if (change === "up") return "rate-up";
    if (change === "down") return "rate-down";
    return "";
  };

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
    setPage(1);
  };

  const totalPages = Math.ceil(rates.length / pageSize);
  const displayedRates = rates.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <Navbar onRefresh={fetchRates} />
      <div className="flex items-center gap-10 mt-2 mb-8">
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize">Show:</label>
          <select
            id="pageSize"
            value={pageSize.toString()}
            onChange={handlePageSizeChange}
            className="border rounded px-2 py-1 outline-none"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <button onClick={handleSortToggle}>
          Sort by {sortOrder === "asc" ? "🔼" : "🔽"}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-dvh -mt-60">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <ul>
            {displayedRates.map((rate) => (
              <li
                key={rate.id}
                className={`flex justify-between items-center border-b border-neutral-300 px-3 py-4 ${getRateChangeClass(
                  rate
                )}`}
              >
                <span>{rate.symbol}</span>
                <span>${parseFloat(rate.rateUsd).toFixed(18)}</span>
              </li>
            ))}
          </ul>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
}

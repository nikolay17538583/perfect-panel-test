import { Link, useLocation } from "react-router-dom";
import { FiDollarSign, FiRefreshCw } from "react-icons/fi";

export default function Footer() {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 w-full flex justify-around">
      <Link
        to="/rates"
        className={`flex items-center w-1/2 justify-center py-3 md:py-6 flex-col ${
          location.pathname === "/rates"
            ? "text-ppblue bg-white"
            : "text-gray-500 bg-neutral-200 border-t"
        }`}
      >
        <FiDollarSign size={18} />
        <p>Rates</p>
      </Link>
      <Link
        to="/convert"
        className={`flex items-center w-1/2 justify-center py-3 md:py-6 border-l border-neutral-300 flex-col ${
          location.pathname === "/convert"
            ? "text-ppblue bg-white"
            : "text-gray-500 bg-neutral-200 border-t"
        }`}
      >
        <FiRefreshCw size={18} />
        <p>Convert</p>
      </Link>
    </footer>
  );
}

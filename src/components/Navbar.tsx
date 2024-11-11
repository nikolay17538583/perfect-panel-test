// Navbar.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { FiRefreshCw, FiLogOut } from "react-icons/fi";
import { NavbarProps } from "../types";
import toast from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";

export default function Navbar({ onRefresh }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast("bye bye 👋");
  };

  const isConvertPage = location.pathname === "/convert";

  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 pt-10 md:pt-8 pb-4 border-b border-neutral-300 bg-white z-10 select-none">
      {!isConvertPage && (
        <button onClick={onRefresh}>
          <FiRefreshCw size={24} className="text-neutral-800 cursor-pointer" />
        </button>
      )}
      <h1 className="text-xl font-bold">
        {isConvertPage ? "Convert" : "Rates"}
      </h1>
      <button onClick={handleLogout}>
        <FiLogOut size={24} className="text-neutral-800 cursor-pointer" />
      </button>
    </nav>
  );
}

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onRefresh={() => {}} />
      <div className="mt-16 mb-32 p-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

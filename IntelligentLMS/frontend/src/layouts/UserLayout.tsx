import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getRole } from "../utils/auth";

const UserLayout = () => {
  // Trạng thái thu gọn: false là mở rộng, true là thu nhỏ
  const [isCollapsed, setIsCollapsed] = useState(false);
  const role = getRole();
  const canAccessAdminPanel = role === "admin" || role === "teacher";

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* Truyền biến và hàm vào Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto flex flex-col bg-gray-50/50">
          {canAccessAdminPanel && (
            <div className="px-4 pt-4">
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-slate-900 text-white hover:bg-slate-800"
              >
                Vào {role === "admin" ? "Admin" : "Teacher"} Panel
              </Link>
            </div>
          )}
          <div className="flex-1 p-4">
            <Outlet />
          </div>
          <Footer /> 
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
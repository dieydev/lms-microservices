import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfileResponse } from '../services/api';
import { getCurrentUserFromToken, isAuthenticated, logout } from '../utils/auth';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<UserProfileResponse | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      setUser(null);
      return;
    }

    const decoded = getCurrentUserFromToken();
    if (!decoded) {
      setUser(null);
      return;
    }

    // Map dữ liệu từ token sang UserProfileResponse để hiển thị
    setUser({
      id: decoded.id,
      email: decoded.email || '',
      fullName: decoded.fullName || 'User',
      role: decoded.role || 'Student',
      avatarUrl: undefined,
    });
  }, []);

  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <header className="h-16 bg-blue-600 flex items-center justify-between px-8 sticky top-0 z-50 shadow-lg shadow-blue-500/20">
      
      {/* SEARCH */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-blue-200 group-focus-within:text-white transition-colors">
            <span className="material-symbols-outlined text-xl">search</span>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2 bg-blue-700/40 rounded-xl text-sm text-white placeholder:text-blue-200 outline-none border border-blue-500/50 focus:bg-blue-700 focus:ring-4 focus:ring-white/10 transition-all"
            placeholder="Tìm kiếm bài học, tài liệu..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        
        {/* LOGIN / LOGOUT */}
        {!user ? (
          <Link 
            to="/auth/login" 
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 group"
          >
            <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">
              login
            </span>
            Đăng nhập
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-all"
          >
            Đăng xuất
          </button>
        )}

        {/* NOTIFICATION + DARK MODE */}
        <div className="flex items-center gap-1">
          <Link 
            to="/user/notifications" 
            className="relative p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-blue-600" />
          </Link>

          <button className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all">
            <span className="material-symbols-outlined text-[24px]">dark_mode</span>
          </button>
        </div>

        <div className="w-[1px] h-6 bg-white/20 mx-1" />

        {/* USER INFO */}
        {user && (
          <Link 
            to="/user/profile" 
            className="flex items-center gap-3 pl-2 group"
          >
            <div className="text-right hidden lg:block text-white">
              <p className="text-sm font-bold leading-none group-hover:text-blue-100 transition-colors">
                {user.fullName}
              </p>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mt-1">
                {user.role === "Student" ? "Học viên" : user.role}
              </p>
            </div>
            
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-blue-600 font-bold text-sm shadow-md group-hover:scale-105 transition-transform duration-300">
                {getInitials(user.fullName)}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-400 rounded-full border-2 border-blue-600 shadow-sm"></div>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
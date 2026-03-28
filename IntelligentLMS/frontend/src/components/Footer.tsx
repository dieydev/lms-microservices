import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Cột 1: Thông tin nền tảng */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <span className="material-symbols-outlined">school</span>
              </div>
              <span className="font-bold text-gray-800 text-lg">LMS Platform</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Nền tảng học tập thông minh giúp Diey làm chủ công nghệ.
            </p>
          </div>

          {/* Cột 2: Khóa học trọng tâm */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-5">Học tập</h4>
            <ul className="space-y-3 text-xs font-bold text-gray-400">
              <li><Link to="/user/courses" className="hover:text-blue-600 transition-colors">Lập trình Game Engine</Link></li>
              <li><Link to="/user/courses" className="hover:text-blue-600 transition-colors">Phân tích mã độc PE</Link></li>
              <li><Link to="/user/courses" className="hover:text-blue-600 transition-colors">Phát triển Flutter</Link></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ học viên */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-5">Hỗ trợ</h4>
            <ul className="space-y-3 text-xs font-bold text-gray-400">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Cộng đồng Dev</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Tài liệu API</a></li>
            </ul>
          </div>

          {/* Cột 4: Đăng ký bản tin */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-5">Bản tin</h4>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Email của bạn" 
                className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs w-full focus:ring-2 focus:ring-blue-100 outline-none" 
              />
              <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-all">
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bản quyền & Social */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            © 2026 Diey LMS. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors"><span className="material-symbols-outlined text-lg">language</span></a>
            <a href="#" className="hover:text-blue-600 transition-colors"><span className="material-symbols-outlined text-lg">terminal</span></a>
            <a href="#" className="hover:text-blue-600 transition-colors"><span className="material-symbols-outlined text-lg">hub</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { Outlet, Link, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-white dark:bg-background-dark">
      {/* Left Side: Visual Hero */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-center items-center bg-primary overflow-hidden p-12">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-xl text-center flex flex-col items-center text-white">
          <div className="mb-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
             <div className="w-full h-64 w-80 rounded-lg bg-gray-200 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-6xl">school</span>
             </div>
          </div>
          <h1 className="text-4xl xl:text-5xl font-black mb-6">Kiến tạo tương lai với lộ trình học thông minh</h1>
          <p className="text-white/80 text-lg">Hệ thống quản lý học tập tích hợp AI hiện đại giúp bạn tối ưu hóa thời gian học tập.</p>
        </div>
      </div>

      {/* Right Side: Auth Form Container */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-12 lg:p-20">
        <div className="w-full max-w-[440px]">
          <div className="flex items-center gap-3 mb-10">
            <div className="size-10 flex items-center justify-center bg-primary rounded-lg text-white">
              <span className="material-symbols-outlined">school</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight dark:text-white">LMS Portal</h2>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-[#dbe0e6] dark:border-gray-700 mb-8">
            <Link to="/" className={`flex-1 flex flex-col items-center pb-3 text-sm font-bold transition-colors ${location.pathname === '/' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}>
              ĐĂNG NHẬP
            </Link>
            <Link to="/register" className={`flex-1 flex flex-col items-center pb-3 text-sm font-bold transition-colors ${location.pathname === '/register' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}>
              ĐĂNG KÝ
            </Link>
          </div>

          <Outlet /> {/* Nơi hiện Login hoặc Register */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
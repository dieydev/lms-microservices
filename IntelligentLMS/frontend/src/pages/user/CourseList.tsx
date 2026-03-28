import { motion, Variants } from 'framer-motion';
import CourseCard from "../../components/CourseCard";

// Khung chuyển động cho danh sách
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const CourseList = () => {
  // Dữ liệu mẫu sát với chuyên ngành của Diey
  const courses = [
    { id: 'game-engine-01', title: "Phát triển Game Engine cơ bản với C++", price: "1.290.000đ", tag: "Game Dev", author: "Dev Diey" },
    { id: 'pe-static-02', title: "Phân tích đặc trưng tĩnh tập tin PE", price: "850.000đ", tag: "Security", author: "Admin Academy" },
    { id: 'flutter-dart-03', title: "Mastering Flutter & Dart Nâng cao", price: "2.450.000đ", tag: "Mobile", author: "Nguyễn Văn A" },
    { id: 'react-tail-04', title: "Thiết kế Web chuyên nghiệp với React & Tailwind", price: "1.290.000đ", tag: "Web Dev", author: "Lê Hồng Minh" },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-8 max-w-[1440px] mx-auto space-y-8"
    >
      {/* 1. Tiêu đề & Breadcrumb */}
      <div className="space-y-2">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Trang chủ / <span className="text-blue-600">Thư viện khóa học</span>
        </p>
        <h1 className="text-3xl font-black text-gray-800 tracking-tighter uppercase italic">Hệ thống bài giảng</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 2. Sidebar Bộ lọc - Đã "tút" lại cho student-style */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-800 text-sm mb-6 flex items-center gap-2 uppercase tracking-widest">
              <span className="material-symbols-outlined text-blue-600">tune</span> Lọc tìm kiếm
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Chủ đề chính</p>
                {['Lập trình Web', 'Game Engine', 'Cyber Security', 'Mobile App'].map(cat => (
                  <label key={cat} className="flex items-center gap-3 text-sm font-bold text-gray-600 cursor-pointer group">
                    <input type="checkbox" className="size-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="group-hover:text-blue-600 transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* 3. Khu vực chính: Grid Khóa học */}
        <div className="flex-1 space-y-6">
          {/* Thanh tìm kiếm & Sắp xếp */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">search</span>
              <input 
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all" 
                placeholder="Tìm tên khóa học hoặc giảng viên..." 
              />
            </div>
            <select aria-label="Sắp xếp" className="bg-white border border-gray-100 rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-widest text-gray-600 outline-none focus:ring-4 focus:ring-blue-100">
              <option>Mới nhất</option>
              <option>Đang hot</option>
            </select>
          </div>

          {/* Grid hiển thị khóa học với hiệu ứng bay lên */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <motion.div 
                key={course.id}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseList;
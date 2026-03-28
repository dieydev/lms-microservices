import { useState } from 'react';

const Notifications = () => {
  const [filter, setFilter] = useState('Tất cả');

  // Dữ liệu thông báo giả định dựa trên hoạt động của Diey
  const allNotifications = [
    {
      id: 1,
      title: "Bài tập mới: Phân tích PE File",
      desc: "Giảng viên vừa giao bài tập thực hành trích xuất đặc trưng tĩnh tập tin PE.",
      time: "10 phút trước",
      type: "assignment",
      isRead: false
    },
    {
      id: 2,
      title: "Gợi ý từ AI: Tài liệu C++ Game Engine",
      desc: "AI tìm thấy một bài báo mới về tối ưu hóa bộ nhớ cho Game Engine rất phù hợp với bạn.",
      time: "2 giờ trước",
      type: "ai",
      isRead: false
    },
    {
      id: 3,
      title: "Hoàn thành khóa học",
      desc: "Chúc mừng! Bạn đã hoàn thành 100% khóa học Lập trình Flutter & Dart cơ bản.",
      time: "1 ngày trước",
      type: "system",
      isRead: true
    },
    {
      id: 4,
      title: "Nhắc nhở Deadline",
      desc: "Đề tài 'Xây dựng chương trình phát hiện mã độc' cần nộp bản báo cáo tiến độ vào ngày mai.",
      time: "2 ngày trước",
      type: "warning",
      isRead: true
    },
  ];

  const categories = ['Tất cả', 'Chưa đọc', 'Học tập', 'Hệ thống'];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Header & Hành động nhanh */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Thông báo của bạn</h2>
          <p className="text-sm text-gray-400 mt-1">Bạn có 2 thông báo mới chưa đọc.</p>
        </div>
        <button className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">
          Đánh dấu tất cả đã đọc
        </button>
      </div>

      {/* 2. Bộ lọc (Tabs) */}
      <div className="flex gap-2 p-1 bg-gray-100 w-fit rounded-2xl">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === cat ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Danh sách thông báo */}
      <div className="space-y-3">
        {allNotifications.map((notif) => (
          <div 
            key={notif.id}
            className={`group p-5 rounded-3xl border transition-all cursor-pointer flex gap-5 items-start ${
              notif.isRead ? "bg-white border-gray-50 opacity-70" : "bg-white border-blue-100 shadow-sm shadow-blue-50"
            } hover:border-blue-200`}
          >
            {/* Icon theo loại thông báo */}
            <div className={`size-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              notif.type === 'assignment' ? 'bg-orange-50 text-orange-500' :
              notif.type === 'ai' ? 'bg-blue-50 text-blue-600' :
              notif.type === 'warning' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
            }`}>
              <span className="material-symbols-outlined">
                {notif.type === 'assignment' ? 'edit_note' :
                 notif.type === 'ai' ? 'auto_awesome' :
                 notif.type === 'warning' ? 'error' : 'check_circle'}
              </span>
            </div>

            {/* Nội dung */}
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <h4 className={`text-sm font-bold ${notif.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                  {notif.title}
                </h4>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{notif.time}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                {notif.desc}
              </p>
            </div>

            {/* Chấm xanh thông báo chưa đọc */}
            {!notif.isRead && (
              <div className="size-2 bg-blue-600 rounded-full mt-2 ring-4 ring-blue-50"></div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
        Xem các thông báo cũ hơn
      </button>
    </div>
  );
};

export default Notifications;
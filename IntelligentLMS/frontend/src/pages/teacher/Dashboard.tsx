import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseApi, CourseDto } from '../../services/api';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await courseApi.getMyCourses();
        setCourses(res.data ?? []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = useMemo(() => {
    const total = courses.length;
    const paid = courses.filter((c) => (c.price ?? 0) > 0).length;
    const free = total - paid;
    const avgPrice = paid > 0
      ? Math.round(courses.filter((c) => (c.price ?? 0) > 0).reduce((s, c) => s + (c.price ?? 0), 0) / paid)
      : 0;
    return { total, paid, free, avgPrice };
  }, [courses]);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Teacher Dashboard</h2>
          <p className="text-sm text-gray-500">
            {loading ? 'Đang tải dữ liệu thật...' : `Tổng cộng ${stats.total} khóa học trong hệ thống.`}
          </p>
        </div>
        <Link
          to="/admin/courses"
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700"
        >
          Quản lý khóa học
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Tổng khóa học</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Khóa trả phí</p>
          <p className="mt-2 text-3xl font-black text-emerald-600">{stats.paid}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Khóa miễn phí</p>
          <p className="mt-2 text-3xl font-black text-amber-600">{stats.free}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Giá TB khóa phí</p>
          <p className="mt-2 text-2xl font-black text-blue-600">{stats.avgPrice.toLocaleString('vi-VN')} đ</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-slate-900">Khóa học gần đây</h3>
          <span className="text-xs text-slate-500 font-bold">Dữ liệu thật từ Course API</span>
        </div>
        <div className="space-y-3">
          {courses.slice(0, 8).map((c) => (
            <div key={c.id} className="flex items-center justify-between border border-slate-200 rounded-xl p-3">
              <div className="min-w-0">
                <p className="font-bold text-slate-900 truncate">{c.title}</p>
                <p className="text-xs text-slate-500">{c.category} • {c.level}</p>
              </div>
              <span className="text-sm font-black text-slate-700">
                {(c.price ?? 0) > 0 ? `${(c.price ?? 0).toLocaleString('vi-VN')} đ` : 'Miễn phí'}
              </span>
            </div>
          ))}
          {!loading && courses.length === 0 && (
            <p className="text-sm text-slate-500">Chưa có khóa học nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

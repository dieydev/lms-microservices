import { useEffect, useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { userApi } from '../../services/api'; // Nối với Gateway

// --- Animation Variants ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

interface Teacher {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'table' | 'grid'>('table');

  // ─── Lấy dữ liệu từ Docker User-Service ───
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await userApi.getTeachers();
        setTeachers(response.data);
      } catch (err) {
        console.error("Lỗi kết nối Docker!", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const filtered = teachers.filter(t => 
    (t.fullName || '').toLowerCase().includes(search.toLowerCase()) || 
    (t.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: 'Tổng giảng viên', value: teachers.length, icon: 'school', color: '#3b82f6' },
    { label: 'Học viên', value: '—', icon: 'group', color: '#a855f7' },
    { label: 'Rating TB', value: '—', icon: 'star', color: '#f59e0b' },
    { label: 'Trạng thái', value: 'Auth OK', icon: 'hub', color: '#10b981' },
  ];

  if (loading) return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="size-10 border-4 border-purple-500 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white p-8 font-['Sora'] relative overflow-auto">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />

      <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-[10px] font-black tracking-[0.4em] text-purple-500 uppercase">System Administration</span>
            <h1 className="text-5xl font-black tracking-tighter mt-2">Đội ngũ <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Giảng viên</span></h1>
          </div>
          <button className="px-6 py-3 bg-purple-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-900/20">Thêm nhân sự mới</button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center gap-4">
              <div className="size-11 rounded-2xl flex items-center justify-center" style={{ background: `${s.color}20`, color: s.color }}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <div>
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500">search</span>
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-purple-500 transition-all text-sm"
              placeholder="Tìm theo tên, chuyên môn (Game Engine, PE File...)"
            />
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button onClick={() => setView('table')} className={`p-2 rounded-lg transition-all ${view === 'table' ? 'bg-purple-600' : 'text-gray-500'}`}><span className="material-symbols-outlined">table_rows</span></button>
            <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-purple-600' : 'text-gray-500'}`}><span className="material-symbols-outlined">grid_view</span></button>
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {view === 'table' ? (
            <motion.div key="t" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0 }} className="bg-white/[0.02] border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                    <th className="p-6">Giảng viên</th>
                    <th className="p-6">Email</th>
                    <th className="p-6 text-center">Role</th>
                    <th className="p-6">Hành động</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filtered.map((t, i) => (
                    <tr key={t.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                      <td className="p-6 flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-black">
                          {(t.fullName || t.email || 'T').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-gray-200">{t.fullName || 'Teacher'}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase">Teacher</p>
                        </div>
                      </td>
                      <td className="p-6">
                        <p className="font-bold text-purple-400">{t.email}</p>
                      </td>
                      <td className="p-6 text-center font-black tabular-nums">{t.role}</td>
                      <td className="p-6">
                        <div className="flex gap-2">
                          <button className="size-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-purple-600 transition-all"><span className="material-symbols-outlined text-sm">edit</span></button>
                          <button className="size-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-rose-600 transition-all"><span className="material-symbols-outlined text-sm">delete</span></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div key="g" variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtered.map(t => (
                <motion.div key={t.id} variants={fadeUp} className="p-6 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="size-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xl font-black shadow-lg shadow-purple-500/20">
                      {(t.fullName || t.email || 'T').charAt(0).toUpperCase()}
                    </div>
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[9px] font-black uppercase rounded-lg">Online</span>
                  </div>
                  <h3 className="font-black text-lg text-white">{t.fullName || 'Teacher'}</h3>
                  <p className="text-purple-400 text-xs font-bold mb-4 uppercase tracking-tighter">{t.email}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-white/5 rounded-2xl text-center"><p className="text-sm font-black">{t.role}</p><p className="text-[9px] text-gray-500 font-bold">Role</p></div>
                    <div className="p-3 bg-white/5 rounded-2xl text-center"><p className="text-sm font-black">—</p><p className="text-[9px] text-gray-500 font-bold">Rating</p></div>
                  </div>
                  <button className="w-full py-3 rounded-2xl bg-white/5 font-black text-[10px] uppercase tracking-[0.2em] group-hover:bg-purple-600 transition-all">Chi tiết hồ sơ</button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Teachers;
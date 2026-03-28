import { Outlet, Navigate, NavLink, Link } from 'react-router-dom';
import { getRole, isAuthenticated } from '../utils/auth';

const AdminLayout = () => {
  if (!isAuthenticated()) return <Navigate to="/auth/login" replace />;

  const role = getRole();
  const isAdmin = role === 'admin';
  const isTeacher = role === 'teacher';

  if (!isAdmin && !isTeacher) return <Navigate to="/user/dashboard" replace />;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">
          {isAdmin ? 'Admin Panel' : 'Teacher Panel'}
        </h1>
        <Link
          to="/user/dashboard"
          className="px-4 py-2 rounded-xl text-sm font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
        >
          Sang User
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <NavLink to="/admin/dashboard" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-bold ${isActive ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/courses" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-bold ${isActive ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
          Courses
        </NavLink>
        {isAdmin && (
          <>
            <NavLink to="/admin/users" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-bold ${isActive ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
              Users
            </NavLink>
            <NavLink to="/admin/teachers" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-bold ${isActive ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
              Teachers
            </NavLink>
            <NavLink to="/admin/monitor" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-bold ${isActive ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
              Monitor
            </NavLink>
          </>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default AdminLayout;

import { Outlet, Navigate } from 'react-router-dom';
import { getRole, isAuthenticated } from '../utils/auth';

const AdminLayout = () => {
  if (!isAuthenticated()) return <Navigate to="/auth/login" replace />;

  const role = getRole();
  const isAdmin = role === 'admin';
  const isTeacher = role === 'teacher';

  if (!isAdmin && !isTeacher) return <Navigate to="/user/dashboard" replace />;

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-background-dark">
      <h1 className="text-2xl font-bold mb-6">
        {isAdmin ? 'Admin Panel' : 'Teacher Panel'}
      </h1>
      <Outlet />
    </div>
  );
};

export default AdminLayout;

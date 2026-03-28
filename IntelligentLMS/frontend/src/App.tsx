import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import { getRole } from "./utils/auth";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Auth
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";

// User Pages
import Dashboard from "./pages/user/Dashboard";
import Courses from "./pages/user/Courses";
import LearningPath from "./pages/user/LearningPath";
import Achievements from "./pages/user/Achievements";
import Profile from "./pages/user/Profile";
import Notifications from "./pages/user/Notifications";
import LessonView from "./pages/user/LessonView";
import CourseDetail from "./pages/user/CourseDetail";
import PaymentResult from "./pages/user/PaymentResult";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import SystemMonitor from "./pages/admin/SystemMonitor";
import Teachers from "./pages/admin/Teachers";
import Users from "./pages/admin/Users";
import CoursesAdmin from "./pages/admin/Courses";
import TeacherDashboard from "./pages/teacher/Dashboard";

function RoleBasedDashboard() {
  const role = getRole();
  if (role === "teacher") return <TeacherDashboard />;
  return <AdminDashboard />;
}

function AdminOnly({ children }: { children: ReactElement }) {
  const role = getRole();
  if (role !== "admin") return <Navigate to="/admin/dashboard" replace />;
  return children;
}

function App() {
  return (
    <Routes>
      {/* 1. PUBLIC ROUTES */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />

      {/* 2. USER ROUTES */}
      <Route element={<UserLayout />}>
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/courses" element={<Courses />} />
        <Route path="/user/course/:id" element={<CourseDetail />} />
        <Route path="/user/learning-path" element={<LearningPath />} />
        <Route path="/user/achievements" element={<Achievements />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/notifications" element={<Notifications />} />
        <Route path="/user/lesson/:courseId" element={<LessonView />} />
      </Route>

      {/* 3. ADMIN ROUTES */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<RoleBasedDashboard />} />
        <Route path="/admin/monitor" element={<AdminOnly><SystemMonitor /></AdminOnly>} />
        <Route path="/admin/teachers" element={<AdminOnly><Teachers /></AdminOnly>} />
        <Route path="/admin/users" element={<AdminOnly><Users /></AdminOnly>} />
        <Route path="/admin/courses" element={<CoursesAdmin />} />
      </Route>

      {/* Payment result (sau khi VNPAY redirect) */}
      <Route path="/payment/result" element={<PaymentResult />} />

      {/* 4. DEFAULT REDIRECT */}
      <Route path="/" element={<Navigate to="/user/dashboard" />} />
      <Route path="/courses" element={<Navigate to="/user/courses" />} />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="p-20 text-center font-black text-gray-300">
            404 - KHÔNG TÌM THẤY TRANG
          </div>
        }
      />
    </Routes>
  );
}

export default App;
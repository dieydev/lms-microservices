import axios from 'axios';

// 1. Định nghĩa cấu trúc dữ liệu cho User (Dữ liệu từ User Service)
export interface UserProfileResponse {
  id: string;
  email: string;
  fullName: string;
  role: string;
  avatarUrl?: string;
}

export interface CourseDto {
  id: string;
  title: string;
  description: string;
  level: string;
  category: string;
  instructorId: string;
}

export interface LessonDto {
  id: string;
  courseId: string;
  title: string;
  content: string;
  order: number;
  contentUrl: string;
  contentType: string;
}

export interface CourseDetailDto extends CourseDto {
  lessons: LessonDto[];
}

// 2. Định nghĩa cấu trúc dữ liệu cho Progress (Dữ liệu từ Progress Service)
export interface CourseProgressResponse {
  id: string;
  userId: string;
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number; 
  updatedAt: string;
}

// Cổng của Gateway trong Docker của bạn
const BASE_URL = 'http://localhost:5000'; 

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor xử lý Token tự động
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- AUTH API ---
export const authApi = {
  login: (data: any) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
  googleLogin: (data: { idToken: string }) => api.post('/auth/google-login', data),
  forgotPassword: (data: { email: string }) => api.post('/auth/forgot-password', data),
  resetPassword: (data: { token: string; newPassword: string }) =>
    api.post('/auth/reset-password', data),
};

// --- USER API ---
export const userApi = {
  // Lấy danh sách user theo role từ Auth Service (qua Gateway)
  // Gateway: /auth/* -> /api/auth/*
  getTeachers: () => api.get(`/auth/users?role=Teacher`),
  
  /**
   * Lấy thông tin chi tiết người dùng qua Gateway
   * Gateway map: /users/{id} -> user service /api/users/{id}
   */
  getProfile: (userId: string) => api.get<UserProfileResponse>(`/users/${userId}`), 
};

// --- COURSE & PROGRESS API ---
export const courseApi = {
  // Gateway: /courses/* -> course service /api/courses/*
  getCourses: () => api.get<CourseDto[]>(`/courses`),

  // Course detail + lessons (endpoint bổ sung ở Course service)
  getCourseDetail: (courseId: string) => api.get<CourseDetailDto>(`/courses/${courseId}/detail`),

  getEnrollments: (userId: string) => api.get(`/api/course/enrollments/${userId}`),

  /**
   * Lấy tiến độ học tập từ Progress Service
   */
  getCourseProgress: async (userId: string, courseId: string): Promise<CourseProgressResponse> => {
    // Lưu ý: Giữ route này khớp với cấu hình YARP Gateway của bạn
    const response = await api.get<CourseProgressResponse>(
      `/progress/${userId}/${courseId}`
    );
    return response.data; 
  },

  updateLessonProgress: (data: { userId: string, courseId: string, lessonId: string, isCompleted: boolean }) =>
    api.post('/api/course/lesson-progress', data),
};
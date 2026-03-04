import api from '../services/axiosInstance';

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Lấy payload gốc từ JWT
const getTokenPayload = (): Record<string, any> | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};

// Lấy userId từ JWT token (cố gắng bắt nhiều kiểu key khác nhau)
export const getUserIdFromToken = (): string | null => {
  const payload = getTokenPayload();
  if (!payload) return null;

  // Ưu tiên các key phổ biến
  const candidateKeys = ['nameid', 'sub', 'userId', 'UserId', 'uid', 'id'];
  for (const key of candidateKeys) {
    if (payload[key]) return payload[key];
  }

  // Fallback: tìm value nào là GUID
  const guidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  for (const value of Object.values(payload)) {
    if (typeof value === 'string' && guidRegex.test(value)) {
      return value;
    }
  }

  return null;
};

// Lấy thông tin hiển thị user trực tiếp từ token
export const getCurrentUserFromToken = () => {
  const payload = getTokenPayload();
  const id = getUserIdFromToken();
  if (!payload || !id) return null;

  // Email và role chuẩn theo AuthService
  const email =
    payload.email ||
    payload.Email ||
    payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

  const role =
    payload.role ||
    payload.Role ||
    payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

  const fullName =
    payload.fullName ||
    payload.FullName ||
    payload.name ||
    payload.given_name;

  return {
    id,
    email: email as string | undefined,
    fullName: (fullName as string | undefined) || (email as string | undefined) || 'User',
    role: (role as string | undefined) || 'Student',
  };
};

// Lấy role chuẩn hóa (lowercase) phục vụ phân quyền
export const getRole = (): string | null => {
  const user = getCurrentUserFromToken();
  if (!user?.role) return null;
  return user.role.toLowerCase();
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    const { token, refreshToken } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);

    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};
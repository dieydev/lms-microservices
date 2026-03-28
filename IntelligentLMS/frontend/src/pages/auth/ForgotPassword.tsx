import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setMessage(null);
    setError(null);
    if (!email) {
      setError('Vui lòng nhập email.');
      return;
    }
    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setMessage('Đã gửi mã OTP tới email của bạn. Vui lòng kiểm tra hộp thư.');
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể gửi OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setMessage(null);
    setError(null);
    if (!otp || !newPassword || !confirmNewPassword) {
      setError('Vui lòng nhập đầy đủ OTP và mật khẩu mới.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    setLoading(true);
    try {
      await authApi.resetPassword({ email, otp, newPassword });
      setMessage('Đổi mật khẩu thành công. Bạn có thể đăng nhập với mật khẩu mới.');
      setTimeout(() => navigate('/auth/login'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể đặt lại mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#fafafa] font-['Sora']">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-7 space-y-5">
        <div className="text-center space-y-1">
          <h1 className="text-lg font-bold text-gray-900">Đặt lại mật khẩu</h1>
          <p className="text-xs text-gray-500">
            {step === 1
              ? 'Nhập email của bạn để nhận mã OTP đặt lại mật khẩu.'
              : 'Nhập mã OTP được gửi tới email và tạo mật khẩu mới.'}
          </p>
        </div>

        {error && <p className="text-xs text-rose-500">{error}</p>}
        {message && <p className="text-xs text-emerald-600">{message}</p>}

        {step === 1 && (
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full mt-2 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {loading ? 'Đang gửi...' : 'Gửi mã OTP'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Mã OTP
              </label>
              <input
                type="text"
                placeholder="Nhập mã 6 số"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Mật khẩu mới
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Xác nhận mật khẩu mới
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <button
              type="button"
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full mt-2 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate('/auth/login')}
          className="w-full text-xs text-gray-500 hover:text-gray-700 mt-2"
        >
          ← Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;


import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const message = searchParams.get('message') || '';
  const courseId = searchParams.get('courseId');

  const success = status === 'success';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[60vh] flex flex-col items-center justify-center px-4"
    >
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 shadow-xl p-8 text-center">
        {success ? (
          <>
            <div className="size-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-5xl text-emerald-600">check_circle</span>
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">Thanh toán thành công</h2>
            <p className="text-gray-500 mb-6">Bạn đã được ghi danh vào khóa học.</p>
            {courseId ? (
              <Link
                to={`/user/lesson/${courseId}`}
                className="inline-block w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-center hover:bg-blue-700 transition-colors"
              >
                VÀO HỌC NGAY
              </Link>
            ) : (
              <Link
                to="/user/courses"
                className="inline-block w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-center hover:bg-blue-700 transition-colors"
              >
                VỀ DANH SÁCH KHÓA HỌC
              </Link>
            )}
          </>
        ) : (
          <>
            <div className="size-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-5xl text-red-600">error</span>
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">Thanh toán thất bại</h2>
            <p className="text-gray-500 mb-6">{message || 'Đã xảy ra lỗi. Vui lòng thử lại.'}</p>
            <Link
              to="/user/courses"
              className="inline-block w-full py-4 bg-gray-800 text-white rounded-2xl font-black text-center hover:bg-gray-900 transition-colors"
            >
              VỀ DANH SÁCH KHÓA HỌC
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentResult;

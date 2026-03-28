import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Định nghĩa Props bao gồm cả 'id'
interface CourseCardProps {
  id: string; // Thêm id ở đây
  title: string;
  price: string;
  tag: string;
  author: string;
}

const CourseCard = ({ id, title, price, tag, author }: CourseCardProps) => {
  return (
    // Bọc toàn bộ Card hoặc nút bấm bằng thẻ Link
    <Link to={`/user/course/${id}`}> 
      <motion.div 
        whileHover={{ y: -8 }}
        className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
      >
        <div className="aspect-video bg-gray-100 rounded-2xl mb-4 overflow-hidden relative">
          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-all" />
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <span className="material-symbols-outlined text-5xl">image</span>
          </div>
        </div>

        <div className="space-y-3">
          <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase tracking-wider">
            {tag}
          </span>
          <h3 className="font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-400 font-medium">Giảng viên: {author}</p>
          
          <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
            <span className="text-sm font-black text-blue-600">{price}</span>
            <span className="material-symbols-outlined text-gray-300 group-hover:text-blue-600 transition-all">
              arrow_forward
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CourseCard;
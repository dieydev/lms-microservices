// src/components/CourseProgress.tsx
interface CourseProgressProps {
  userName: string;
  title: string;
  progress: number;
  nextLesson: string;
  imageUrl: string;
  status?: string;
}

const CourseProgress = ({
  userName,
  title,
  progress,
  nextLesson,
  imageUrl,
  status = 'Đang học',
}: CourseProgressProps) => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 tracking-tight">
        Chào mừng bạn trở lại, {userName}!
      </h2>
      <div className="bg-white  rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col md:flex-row group hover:shadow-lg transition-all duration-300">
        {/* Course Image */}
        <div
          className="md:w-1/3 h-48 md:h-auto bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />

        {/* Course Info */}
        <div className="flex-1 p-6 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded">
                {status}
              </span>
              <h3 className="text-2xl font-bold mt-1">{title}</h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{progress}%</p>
              <p className="text-xs text-gray-500">Tiến độ</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 mb-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Next Lesson & CTA */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bài tiếp theo:{' '}
              <span className="font-medium text-[#111418] dark:text-white">
                {nextLesson}
              </span>
            </p>
            <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 group shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transform hover:scale-105 active:scale-95">
              <span>Học tiếp</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                play_arrow
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseProgress;
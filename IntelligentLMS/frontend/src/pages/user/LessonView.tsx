import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { courseApi, CourseDetailDto } from '../../services/api';

const LessonView = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseDetailDto | null>(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (!courseId) return;
        const res = await courseApi.getCourseDetail(courseId);
        setCourse(res.data);
        setCurrentLesson(0);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId]);

  const lessons = course?.lessons || [];
  const lesson = lessons[currentLesson];

  const isYoutube = (url?: string) =>
    !!url && (url.includes('youtube.com') || url.includes('youtu.be'));

  const youtubeEmbedUrl = useMemo(() => {
    if (!lesson?.contentUrl || !isYoutube(lesson.contentUrl)) return null;
    // chấp nhận cả dạng embed hoặc watch?v=
    if (lesson.contentUrl.includes('/embed/')) return lesson.contentUrl;
    const m = lesson.contentUrl.match(/v=([^&]+)/);
    if (m?.[1]) return `https://www.youtube.com/embed/${m[1]}`;
    return lesson.contentUrl;
  }, [lesson?.contentUrl]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-white animate-in fade-in duration-500">
      
      {/* KHU VỰC BÊN TRÁI: Video & Nội dung */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Content */}
        <div className="aspect-video bg-black w-full shadow-lg relative flex items-center justify-center">
          {loading ? (
            <div className="text-white/70 text-sm font-bold">Đang tải...</div>
          ) : !lesson ? (
            <div className="text-white/70 text-sm font-bold">Chưa có bài học</div>
          ) : lesson.contentType?.toLowerCase() === 'video' && (youtubeEmbedUrl || lesson.contentUrl) ? (
            youtubeEmbedUrl ? (
              <iframe
                className="w-full h-full"
                src={youtubeEmbedUrl}
                title="Lesson Video"
                allowFullScreen
              />
            ) : (
              <video className="w-full h-full" controls src={lesson.contentUrl} />
            )
          ) : (
            <div className="p-8 text-white/90 max-w-4xl">
              <p className="text-lg font-black mb-2">{lesson.title}</p>
              <p className="text-sm text-white/70 whitespace-pre-wrap">{lesson.content}</p>
            </div>
          )}
        </div>

        <div className="p-8 max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                {lesson?.title || 'Bài học'}
              </h1>
              <p className="text-sm text-gray-400 mt-2">
                Khóa học: <span className="text-blue-600 font-bold">{course?.title || '—'}</span>
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-blue-100 text-blue-600 rounded-xl font-bold text-sm">
              <span className="material-symbols-outlined">bookmark</span> Lưu
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-100 mb-6">
            {['Tổng quan', 'Tài liệu'].map((tab, i) => (
              <button key={tab} className={`pb-4 text-sm font-bold ${i === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="text-gray-600 text-sm leading-relaxed space-y-4">
            <p>{course?.description || ''}</p>
            {lesson?.contentUrl && lesson.contentType?.toLowerCase() !== 'video' && (
              <a
                className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-4"
                href={lesson.contentUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-blue-600">description</span>
                <div className="flex-1 text-xs font-bold text-blue-900 truncate">{lesson.contentUrl}</div>
                <span className="bg-white text-blue-600 p-2 rounded-lg">
                  <span className="material-symbols-outlined">open_in_new</span>
                </span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* KHU VỰC BÊN PHẢI: Syllabus động */}
      <aside className="w-full lg:w-96 bg-gray-50 border-l border-gray-100 flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-white">
          <h3 className="font-bold text-gray-800">Nội dung học tập</h3>
          <p className="text-[10px] font-bold text-blue-600 mt-1 uppercase">
            Tiến độ: {lessons.length === 0 ? 0 : currentLesson + 1}/{lessons.length} bài học
          </p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
          {lessons.map((item, index) => (
            <div 
              key={index}
              onClick={() => setCurrentLesson(index)}
              className={`p-4 rounded-2xl flex items-center gap-4 transition-all cursor-pointer border ${
                index === currentLesson ? "bg-white border-blue-200 shadow-sm" : "bg-transparent hover:bg-white/50"
              }`}
            >
              <div className={`size-8 rounded-full flex items-center justify-center ${index === currentLesson ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                <span className="text-xs font-bold">{index + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-800">{item.title}</p>
                <p className="text-[10px] text-gray-400">{item.contentType || 'Lesson'}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dbeafe; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default LessonView;
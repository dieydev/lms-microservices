import { useEffect, useMemo, useState } from 'react';
import { courseApi, CourseDto, CourseProgressResponse } from '../../services/api';
import { getCurrentUserFromToken, isAuthenticated } from '../../utils/auth';

import RoadmapGraph from '../../components/RoadmapGraph';

type StepStatus = 'completed' | 'current' | 'locked';

interface LearningStep {
  course: CourseDto;
  progress: CourseProgressResponse | null;
  status: StepStatus;
}

const levelOrder = (level?: string | null) => {
  const l = (level || '').toLowerCase();
  if (l.includes('beginner')) return 1;
  if (l.includes('intermediate')) return 2;
  if (l.includes('advanced')) return 3;
  return 99;
};

const LearningPath = () => {
  const user = getCurrentUserFromToken();
  const [steps, setSteps] = useState<LearningStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        if (!isAuthenticated() || !user) {
          setSteps([]);
          return;
        }

        const coursesRes = await courseApi.getCourses();
        const courses = coursesRes.data ?? [];
        if (courses.length === 0) {
          setSteps([]);
          return;
        }

        const entries = await Promise.all(
          courses.map(async (c) => {
            const p = await courseApi.getCourseProgress(user.id, c.id);
            const pct = p.progressPercentage ?? 0;
            let status: StepStatus = 'locked';
            if (pct >= 100) status = 'completed';
            else if (pct > 0) status = 'current';

            return { course: c, progress: p, status };
          })
        );

        const ordered = entries.sort((a, b) => {
          const la = levelOrder(a.course.level);
          const lb = levelOrder(b.course.level);
          if (la !== lb) return la - lb;

          const weight = (s: StepStatus) =>
            s === 'completed' ? 0 : s === 'current' ? 1 : 2;
          const wa = weight(a.status);
          const wb = weight(b.status);
          if (wa !== wb) return wa - wb;

          return (a.course.title || '').localeCompare(b.course.title || '');
        });

        setSteps(ordered);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const hasAny = useMemo(() => steps.length > 0, [steps]);

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Lộ trình học của bạn</h2>
          <p className="text-sm text-gray-500 mt-1">
            Sắp xếp các khóa theo mức độ {`Beginner → Intermediate → Advanced`} và tiến độ hiện tại.
          </p>
        </div>
      </div>

      {!hasAny && !loading && (
        <div className="mt-6 p-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
          Hiện bạn chưa enroll khóa học nào. Hãy vào trang{' '}
          <span className="font-semibold text-blue-600">Khóa học</span> để bắt đầu một lộ trình mới.
        </div>
      )}

      {loading && (
        <div className="mt-6 p-6 rounded-2xl border border-gray-100 bg-white text-sm text-gray-500">
          Đang tải lộ trình...
        </div>
      )}

      {hasAny && (
        <div className="mt-6">
          {isMobile ? (
            <div className="relative space-y-8 ml-6 mt-4">
              {/* Đường kẻ dọc nối các node */}
              <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-blue-100" />

          {steps.map((step, idx) => {
            const pct = step.progress?.progressPercentage ?? 0;
            const icon =
              step.status === 'completed'
                ? 'check_circle'
                : step.status === 'current'
                ? 'play_circle'
                : 'lock';

            return (
              <div key={step.course.id} className="relative flex items-center gap-6 group">
                <div
                  className={`size-8 rounded-full z-10 flex items-center justify-center border-4 border-white shadow-sm ${
                    step.status === 'completed'
                      ? 'bg-blue-600 text-white'
                      : step.status === 'current'
                      ? 'bg-white text-blue-600 border-blue-600'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{icon}</span>
                </div>
                <div
                  className={`p-4 rounded-2xl border flex-1 transition-colors ${
                    step.status === 'current'
                      ? 'bg-blue-50 border-blue-200 shadow-blue-50'
                      : 'bg-white border-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p
                        className={`font-bold truncate ${
                          step.status === 'locked' ? 'text-gray-400' : 'text-gray-800'
                        }`}
                      >
                        {step.course.title}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                        {step.course.level || step.course.category || 'Course'}
                      </p>
                    </div>
                    <span className="text-[10px] font-black text-blue-600 tabular-nums">
                      {pct}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
            </div>
          ) : (
            <div className="w-full flex-1">
              <RoadmapGraph steps={steps} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default LearningPath;
// src/components/RecentAchievements.tsx
interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const achievements: Achievement[] = [
  {
    id: '1',
    icon: 'local_fire_department',
    title: '7 Ngày Liên Tiếp',
    description: 'Duy trì học tập mỗi ngày',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-500',
  },
  {
    id: '2',
    icon: 'history_edu',
    title: 'Hoàn thành Quiz 100%',
    description: 'React Hooks Advanced',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-500',
  },
];

const RecentAchievements = () => {
  return (
    <div className="bg-white  p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-gray-400">workspace_premium</span>
        Thành tích mới
      </h3>

      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex items-center gap-3 group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 -m-2 rounded-lg transition-all"
          >
            <div
              className={`size-10 rounded-full ${achievement.bgColor} flex items-center justify-center ${achievement.iconColor} group-hover:scale-110 transition-transform duration-200`}
            >
              <span className="material-symbols-outlined">{achievement.icon}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold group-hover:text-primary transition-colors">
                {achievement.title}
              </p>
              <p className="text-[10px] text-gray-500">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-primary dark:hover:border-primary transition-all">
        Xem tất cả thành tích
      </button>
    </div>
  );
};

export default RecentAchievements;
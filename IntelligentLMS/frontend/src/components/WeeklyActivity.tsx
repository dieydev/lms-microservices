// src/components/WeeklyActivity.tsx
interface DayActivity {
  day: string;
  percentage: number;
  active?: boolean;
}

const weekDays: DayActivity[] = [
  { day: 'T2', percentage: 40 },
  { day: 'T3', percentage: 65 },
  { day: 'T4', percentage: 85, active: true },
  { day: 'T5', percentage: 30 },
  { day: 'T6', percentage: 55 },
  { day: 'T7', percentage: 95 },
  { day: 'CN', percentage: 10 },
];

const WeeklyActivity = () => {
  return (
    <div className="bg-white  p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <h3 className="font-bold mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-gray-400">bar_chart</span>
        Hoạt động hàng tuần
      </h3>

      <div className="flex items-end justify-between h-40 gap-2 mb-4">
        {weekDays.map((day) => (
          <div key={day.day} className="flex flex-col items-center gap-2 flex-1 group">
            <div
              className={`w-full rounded-t-sm transition-all duration-300 cursor-pointer hover:opacity-80 ${
                day.active
                  ? 'bg-primary'
                  : day.percentage > 80
                  ? 'bg-primary/40'
                  : day.percentage < 20
                  ? 'bg-gray-100 dark:bg-gray-800'
                  : 'bg-primary/20'
              }`}
              style={{ height: `${day.percentage}%` }}
            />
            <span className={`text-[10px] transition-colors ${
              day.active ? 'text-primary font-semibold' : 'text-gray-500'
            }`}>
              {day.day}
            </span>
          </div>
        ))}
      </div>

      <div className="p-3 bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-gray-800/50 dark:to-blue-900/10 rounded-lg">
        <p className="text-xs text-center text-gray-600 dark:text-gray-400">
          Bạn đã học{' '}
          <span className="font-bold text-primary">12.5 giờ</span> tuần này,
          tăng{' '}
          <span className="text-green-500 font-bold">15%</span> so với tuần trước.
        </p>
      </div>
    </div>
  );
};

export default WeeklyActivity;
// src/components/AISuggestions.tsx
interface AISuggestion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const suggestions: AISuggestion[] = [
  {
    id: '1',
    title: 'Quản lý State với Redux Toolkit',
    description: 'Dựa trên tiến độ ReactJS của bạn',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Tối ưu hiệu năng React App',
    description: 'Mục tiêu: Cải thiện 30% tốc độ load',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  },
];

const AISuggestions = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-bold tracking-tight">Gợi ý từ AI</h2>

    <a
  href="#"
  className="text-primary text-sm font-medium hover:underline"
>
  Xem tất cả
</a>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-white p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex gap-4 group cursor-pointer hover:border-primary/50 hover:shadow-md transition-all duration-200"
          >
            <div
              className="size-20 rounded-lg bg-cover bg-center shrink-0 group-hover:scale-105 transition-transform duration-200"
              style={{ backgroundImage: `url('${suggestion.imageUrl}')` }}
            />
            <div className="flex flex-col justify-between py-1">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    auto_awesome
                  </span>
                  <span className="text-[10px] font-bold text-primary uppercase">
                    AI Đề xuất
                  </span>
                </div>
                <h4 className="font-bold text-sm group-hover:text-primary transition-colors">
                  {suggestion.title}
                </h4>
              </div>
              <p className="text-xs text-gray-500">{suggestion.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AISuggestions;
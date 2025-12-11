"use client";

export default function BlogSortTabs({ sort, setSort }) {
  const tabs = [
    { id: "newest", label: "Newest" },
    { id: "popular", label: "Popular" },
    { id: "title_asc", label: "A–Z" },
  ];

  return (
    <div className="flex gap-3 mt-6">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setSort(t.id)}
          className={`px-4 py-2 rounded-lg border dark:border-neutral-700 
            ${
              sort === t.id
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-neutral-800"
            }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

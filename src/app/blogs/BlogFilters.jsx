"use client";

export default function BlogFilters({ categories, tags, filters, setFilters }) {
  return (
    <div className="space-y-4 bg-white dark:bg-neutral-900 p-4 rounded-xl border dark:border-neutral-700">
      {/* Search */}
      <input
        type="text"
        placeholder="Search blogs..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="w-full border px-3 py-2 rounded-md dark:bg-neutral-800 dark:border-neutral-700"
      />

      {/* Category Filter */}
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        className="w-full border px-3 py-2 rounded-md dark:bg-neutral-800 dark:border-neutral-700"
      >
        <option value="">All Categories</option>
        {categories?.map((cat) => (
          <option key={cat.id} value={cat.attributes.slug}>
            {cat.attributes.name}
          </option>
        ))}
      </select>

      {/* Tag Filter */}
      <select
        value={filters.tag}
        onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
        className="w-full border px-3 py-2 rounded-md dark:bg-neutral-800 dark:border-neutral-700"
      >
        <option value="">All Tags</option>
        {tags?.map((tag) => (
          <option key={tag.id} value={tag.attributes.slug}>
            {tag.attributes.name}
          </option>
        ))}
      </select>

      {/* Sorting */}
      <select
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        className="w-full border px-3 py-2 rounded-md dark:bg-neutral-800 dark:border-neutral-700"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="title_asc">A → Z</option>
        <option value="title_desc">Z → A</option>
        <option value="popular">Most Popular</option>
      </select>
    </div>
  );
}
